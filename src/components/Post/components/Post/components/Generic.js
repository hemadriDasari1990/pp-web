import * as actions from '../../../actions'
import * as timelineActions from '../../../../Timeline/actions'

import React, { Component } from 'react'

import CustomizedSnackbars from '../../../../Snackbar/components/Snackbar'
import Fab from '@material-ui/core/Fab'
import Loader from '../../../../Loader/components/Loader'
import { Map } from 'immutable'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Generic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      errorMessage: '',
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSave = async () => {
    const { message } = this.state
    const { user } = this.props
    if (!message) {
      this.setState({
        errorMessage: 'Please enter your comments as per user preferences',
      })
    } else {
      const data = {}
      data.postedTo = user._id
      data.postedBy = user._id
      data.message = message
      data.approved = true
      data.approvedBy = user._id
      data.type = 'Generic'
      await this.props.createPost(data).then(async res => {
        await this.props.getIncomingPosts(this.props.user._id, '')
        this.props.handleSelfPost()
        this.setState({
          errorMessage: '',
        })
      })
    }
  }

  handleClose = () => {
    this.props.handleSelfPost()
    this.setState({
      errorMessage: '',
    })
  }

  render() {
    const {
      classes,
      createPostLoading,
      createPostError,
      createPostSuccess,
      user,
    } = this.props
    const { message, errorMessage } = this.state
    return (
      <div>
        <TextField
          multiline
          rows={2}
          rowsMax={4}
          required={true}
          name="message"
          label="Whats on your mind?"
          value={message}
          onChange={e => this.handleInput(e)}
          fullWidth
          margin="normal"
          className="mt-25 mb-25"
        />
        {createPostLoading ? <Loader /> : null}
        <Fab
          variant="extended"
          color="primary"
          size="small"
          onClick={() => this.handleSave()}
        >
          Save
        </Fab>
        <Fab
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => this.handleClose()}
        >
          Cancel
        </Fab>
        {createPostSuccess && createPostSuccess.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={createPostSuccess.get('message')}
            status="success"
          />
        ) : null}
        {errorMessage ? (
          <CustomizedSnackbars
            open={true}
            message={errorMessage}
            status="error"
          />
        ) : null}
      </div>
    )
  }
}

Generic.propTypes = {}

// export default withStyles(styles)(Post);

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const createPostLoading = state.getIn(
    ['Post', 'post', 'create', 'loading'],
    false,
  )
  const createPostError = state.getIn(
    ['Post', 'post', 'create', 'errors'],
    Map(),
  )
  const createPostSuccess = state.getIn(
    ['Post', 'post', 'create', 'success'],
    Map(),
  )
  return {
    createPostLoading,
    createPostError,
    createPostSuccess,
    user,
  }
}

const actionsToProps = {
  createPost: actions.createPost,
  getUserPreferences: actions.getUserPreferences,
  getIncomingPosts: timelineActions.getIncomingPosts,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Generic))
