import * as actions from '../../../actions'

import React, { Component } from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import CustomizedSnackbars from '../../../../Snackbar/components/Snackbar'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import Loader from '../../../../Loader/components/Loader'
import { Map } from 'immutable'
import ResponsiveDialog from '../../../../Dialog/components/ResposiveDialog'
import Search from '../../../../Search/components/Search'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Opinion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pros: '',
      cons: '',
      advice: '',
      selectedUser: undefined,
      preferences: undefined,
      errorMessage: '',
      isAnonymous: false,
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSave = async () => {
    const { pros, cons, advice, preferences, selectedUser } = this.state
    const { user } = this.props
    if (!pros || !cons || !advice || !selectedUser) {
      this.setState({
        errorMessage: 'Please enter your comments as per user preferences',
      })
    } else {
      const data = {}
      data.postedTo = selectedUser._id
      data.postedBy = user._id
      data.pros = pros
      data.cons = cons
      data.advice = advice
      data.isAnonymous = this.state.isAnonymous
      data.type = 'Opinion'
      await this.props.createPost(data).then(async res => {
        this.setState({
          errorMessage: '',
          pros: '',
          cons: '',
          advice: '',
          preferences: '',
        })
        setTimeout(() => {
          this.handleClose()
        }, 2000)
      })
    }
  }

  getSelectedUser = async user => {
    if (!user) {
      return
    }
    await this.props.getUserPreferences(user._id).then(res => {
      this.setState({
        preferences: res.data.pref,
      })
    })
    this.setState({
      selectedUser: user,
    })
  }

  handleClose = () => {
    this.props.handleOpinionAction()
    this.setState({
      errorMessage: '',
    })
  }

  handleAnnonymous = e => {
    this.setState({
      isAnonymous: event.target.checked,
    })
  }

  render() {
    const {
      classes,
      createPostLoading,
      createPostError,
      createPostSuccess,
      user,
      users,
    } = this.props
    const {
      pros,
      cons,
      advice,
      preferences,
      selectedUser,
      errorMessage,
      isAnonymous,
    } = this.state
    return (
      <ResponsiveDialog
        title="Create Post"
        createButtonName="Post"
        cancellButtonName="Cancel"
        open={true}
        handleSave={this.handleSave}
        handleClose={this.handleClose}
      >
        {!createPostLoading && (
          <>
            <h5>Write something that matters to people.</h5>
            <Grid lg={12}>
              <Search
                type="post"
                id="profile-drop-down"
                getSelectedUser={this.getSelectedUser}
              />
            </Grid>
            {selectedUser && preferences && (
              <>
                <h4>{selectedUser.userName} preferences</h4>
                <p>Please post your comments as per user preferences</p>
                <FormControlLabel
                  control={
                    preferences.pros == 'yes' ? (
                      <Checkbox color="primary" checked={true} />
                    ) : (
                      <Checkbox color="primary" indeterminate />
                    )
                  }
                  label="Pros"
                />
                <FormControlLabel
                  control={
                    preferences.cons == 'yes' ? (
                      <Checkbox color="primary" checked={true} />
                    ) : (
                      <Checkbox color="primary" indeterminate />
                    )
                  }
                  label="Cons"
                />
                <FormControlLabel
                  control={
                    preferences.advice == 'yes' ? (
                      <Checkbox color="primary" checked={true} />
                    ) : (
                      <Checkbox color="primary" indeterminate />
                    )
                  }
                  label="Advice"
                />
              </>
            )}
            {selectedUser && !preferences && (
              <h5>
                {selectedUser.userName} don't have preferences updated. Please
                feel free to provide your opinions
              </h5>
            )}
            <TextField
              required={preferences && preferences.pros == 'yes' ? true : false}
              name="pros"
              label="Pros"
              placeholder="Write something pros"
              defaultValue=""
              value={pros}
              onChange={e => this.handleInput(e)}
              autoFocus
              margin="dense"
              fullWidth
              multiline
              rows={2}
              rowsMax={10}
            />
            <br />
            <TextField
              name="cons"
              label="Cons"
              placeholder="Write something Cons"
              defaultValue=""
              value={cons}
              onChange={e => this.handleInput(e)}
              margin="dense"
              fullWidth
              multiline
              rows={2}
              rowsMax={10}
            />
            <br />
            <TextField
              name="advice"
              label="Advice"
              defaultValue=""
              placeholder="Write something Advice"
              value={advice}
              onChange={e => this.handleInput(e)}
              margin="dense"
              fullWidth
              multiline
              rows={2}
              rowsMax={10}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={isAnonymous}
                    onChange={e => this.handleAnnonymous(e)}
                    value={false}
                  />
                }
                label="Post as Anonymous"
              />
            </FormGroup>
          </>
        )}
        {createPostLoading ? <Loader /> : null}
        {/* <Fab
          variant="extended"
          color="primary"
          size="small"
          onClick={() => this.handleSave()}
        >
          Create
        </Fab>
        <Fab
          variant="extended"
          color="primary"
          size="small"
          onClick={() => this.handleClose()}
        >
          Cancel
        </Fab> */}
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
      </ResponsiveDialog>
    )
  }
}

Opinion.propTypes = {}

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
  const users = state.getIn(['user', 'all', 'success'], Map())
  const userPreferences = state.getIn(['Post', 'preferences', 'get'])
  return {
    createPostLoading,
    createPostError,
    createPostSuccess,
    user,
    users,
    userPreferences,
  }
}

const actionsToProps = {
  createPost: actions.createPost,
  getUserPreferences: actions.getUserPreferences,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Opinion))
