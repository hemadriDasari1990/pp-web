import * as actions from '../../../actions'
import * as timelineActions from '../../../../Timeline/actions'

import React, { Component } from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import CustomizedSnackbars from '../../../../Snackbar/components/Snackbar'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import GenericAction from './GenericActions/components/GenericAction'
import Grid from '@material-ui/core/Grid'
import ImagesPreview from './GenericActions/components/ImagesPreview'
import Loader from '../../../../Loader/components/Loader'
import { Map } from 'immutable'
import ResponsiveDialog from '../../../../Dialog/components/ResposiveDialog'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  input: {
    marginTop: 60,
    fontSize: 20,
    flex: 1,
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#050505',
      fontSize: 25,
    },
  },
  root: {
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

class Generic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      errorMessage: '',
      files: [],
      firebaseImagesData: [],
      loading: false,
      memeChecked: false,
      musicChecked: false,
    }
  }

  handleInput = event => {
    // const cursorPosition = event.target.selectionStart
    // const textBeforeCursorPosition = event.target.value.substring(0, cursorPosition)
    // const textAfterCursorPosition = event.target.value.substring(cursorPosition, event.target.value.length)
    // event.target.value = textBeforeCursorPosition + event.target.value + textAfterCursorPosition
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSave = async () => {
    this.setState({
      loading: true,
    })
    const { message, files, memeChecked, musicChecked } = this.state
    const { user } = this.props
    const data = {}
    data.postedTo = user._id
    data.postedBy = user._id
    data.message = message
    data.approved = true
    data.approvedBy = user._id
    data.type = memeChecked ? 'Meme' : musicChecked ? 'Music' : 'Generic'
    data.files = files
    await this.props.createPost(data).then(async res => {
      await this.props.getIncomingPosts(this.props.user._id, '')
      this.props.handleSelfPost()
      this.setState({
        errorMessage: '',
        loading: false,
      })
    })
  }

  handleClose = () => {
    this.props.handleSelfPost()
    this.setState({
      errorMessage: '',
      loading: false,
    })
  }

  getUserInput = message => {
    this.setState({
      message,
    })
  }

  getEmoji = emoji => {
    this.setState({
      message: this.state.message + emoji,
    })
  }

  getFiles = async base64Files => {
    this.setState({
      files: base64Files,
    })
  }

  deleteImage = index => {
    const filesArray = [...this.state.files]
    filesArray.splice(index, 1)
    this.setState({
      files: filesArray,
    })
  }

  showResponse = () => {
    const {
      classes,
      createPostLoading,
      createPostError,
      createPostSuccess,
      user,
    } = this.props
    return (
      <>
        {createPostSuccess && createPostSuccess.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={createPostSuccess.get('message')}
            status="success"
          />
        ) : null}
      </>
    )
  }

  handleMeme = e => {
    this.setState({
      memeChecked: e.target.checked,
      musicChecked: false,
    })
  }

  handleMusic = e => {
    this.setState({
      musicChecked: e.target.checked,
      memeChecked: false,
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
    const {
      message,
      errorMessage,
      files,
      loading,
      memeChecked,
      musicChecked,
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
        {!loading && (
          <>
            <TextField
              multiline
              name="message"
              placeholder={`What's on your mind, ${user ? user.userName : ''}?`}
              value={message}
              onChange={e => this.handleInput(e)}
              fullWidth
              className="cursor pl-2 search-box"
              InputProps={{
                disableUnderline: true,
                disableClear: true,
                classes: { input: classes['input'] },
              }}
              autoComplete="off"
              classes={{
                root: classes.root,
              }}
              rows={6}
              rowsMax={10}
            />
            <ImagesPreview files={files} deleteImage={this.deleteImage} />
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={memeChecked}
                    onChange={this.handleMeme}
                  />
                }
                label="Meme"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={musicChecked}
                    onChange={this.handleMusic}
                  />
                }
                label="Music"
                labelPlacement="start"
              />
            </Grid>
            <GenericAction getEmoji={this.getEmoji} getFiles={this.getFiles} />
            {this.showResponse()}
          </>
        )}
        {loading && <Loader />}
      </ResponsiveDialog>
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

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Generic)),
)
