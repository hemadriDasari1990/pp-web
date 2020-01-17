import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Search from '../../Header/components/Search'
import * as actions from '../actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Fab from '@material-ui/core/Fab'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      positive: '',
      negative: '',
      advice: '',
      open: true,
      newPost: {},
      preferences: undefined,
      errorMessage: '',
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClose = () => {
    this.setState({
      open: !this.state.open,
    })
    this.props.openPostForm()
  }

  handleSave = async () => {
    const { positive, negative, advice, preferences } = this.state
    if (!positive || !negative || !advice) {
      this.setState({
        errorMessage: 'Please enter your comments as per user preferences',
      })
    } else {
      const data = this.state.newPost
      data.positive = positive
      data.negative = negative
      data.advice = advice
      await this.props.createPost(data).then(res => {
        this.setState({
          open: !this.state.open,
          errorMessage: '',
        })
      })
    }
    this.props.openPostForm()
  }

  createPost = async newPost => {
    if (!newPost) {
      return
    }
    await this.props.getUserPreferences(newPost.postedTo).then(res => {
      this.setState({
        preferences: res.data.pref[0],
      })
    })
    this.setState({
      newPost,
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
      positive,
      negative,
      advice,
      open,
      preferences,
      newPost,
      errorMessage,
    } = this.state
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={() => this.handleClose()}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Create New Post
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Write something that matters to whom you are writing to.
            </DialogContentText>
            <Search
              users={users}
              profile={false}
              post={true}
              createPost={this.createPost}
            />
            {preferences && (
              <>
                <h4>{newPost.postedByName} preferences</h4>
                <p>Please post your comments as per user preferences</p>
                <FormControlLabel
                  control={
                    preferences.positive == 'yes' ? (
                      <Checkbox checked={true} />
                    ) : (
                      <Checkbox indeterminate />
                    )
                  }
                  label="Positive"
                />
                <FormControlLabel
                  control={
                    preferences.negative == 'yes' ? (
                      <Checkbox checked={true} />
                    ) : (
                      <Checkbox indeterminate />
                    )
                  }
                  label="Negative"
                />
                <FormControlLabel
                  control={
                    preferences.advice == 'yes' ? (
                      <Checkbox checked={true} />
                    ) : (
                      <Checkbox indeterminate />
                    )
                  }
                  label="Advice"
                />
              </>
            )}
            <TextField
              required={
                preferences && preferences.positive == 'yes' ? true : false
              }
              id="standard-required"
              name="positive"
              label="Positive"
              placeholder="Write something positive"
              defaultValue=""
              value={positive}
              onChange={e => this.handleInput(e)}
              autoFocus
              margin="dense"
              fullWidth
            />
            <br />
            <TextField
              required={
                preferences && preferences.negative == 'yes' ? true : false
              }
              id="standard-required"
              name="negative"
              label="Negative"
              placeholder="Write something Negative"
              defaultValue=""
              value={negative}
              onChange={e => this.handleInput(e)}
              margin="dense"
              fullWidth
            />
            <br />
            <TextField
              required={
                preferences && preferences.advice == 'yes' ? true : false
              }
              id="standard-required"
              name="advice"
              label="Advice"
              defaultValue=""
              placeholder="Write something Advice"
              value={advice}
              onChange={e => this.handleInput(e)}
              margin="dense"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Fab
              variant="extended"
              color="primary"
              size="small"
              onClick={() => this.handleSave()}
            >
              Create
            </Fab>
            <Fab
              variant="extended"
              color="secondary"
              size="small"
              onClick={() => this.handleClose()}
            >
              Cancel
            </Fab>
          </DialogActions>
        </Dialog>
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
      </React.Fragment>
    )
  }
}

Post.propTypes = {}

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
  const userPreferences = state.getIn(['Post', 'preferences', 'get'])
  return {
    createPostLoading,
    createPostError,
    createPostSuccess,
    user,
    userPreferences,
  }
}

const actionsToProps = {
  createPost: actions.createPost,
  getUserPreferences: actions.getUserPreferences,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Post))
