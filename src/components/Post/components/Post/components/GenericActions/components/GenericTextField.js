import * as actions from '../../../../../actions'
import * as timelineActions from '../../../../../../Timeline/actions'

import React, { Component } from 'react'

import { Map } from 'immutable'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  input: {
    fontSize: 20,
    flex: 1,
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#050505',
      fontSize: 25,
    },
  },
  root: {
    marginTop: 8,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    color: '#606770',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
})

class GenericTextField extends Component {
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
    this.props.getUserInput(event.target.value)
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
      <TextField
        name="message"
        placeholder={`What's on your mind, ${user ? user.userName : ''}?`}
        value={message}
        onChange={e => this.handleInput(e)}
        fullWidth
        className="cursor h-36 pl-2 search-box"
        InputProps={{
          disableUnderline: true,
          disableClear: true,
          classes: { input: classes['input'] },
        }}
        autoComplete="off"
        classes={{
          root: classes.root,
        }}
      />
    )
  }
}

GenericTextField.propTypes = {}

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

export default withRouter(
  connect(
    mapStateToProps,
    actionsToProps,
  )(withStyles(styles)(GenericTextField)),
)
