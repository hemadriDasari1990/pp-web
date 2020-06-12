import * as actions from '../../../../../actions'
import * as timelineActions from '../../../../../../Timeline/actions'

import React, { Component } from 'react'

import AudiotrackIcon from '@material-ui/icons/Audiotrack'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CustomizedSnackbars from '../../../../../../Snackbar/components/Snackbar'
import EmojiMart from './EmojiMart'
import IconButton from '@material-ui/core/IconButton'
import { Map } from 'immutable'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import PhotoIcon from '@material-ui/icons/AddPhotoAlternate'
// import PhotoIcon from '@material-ui/icons/InsertPhoto';
import SmileIcon from '@material-ui/icons/InsertEmoticon'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import VideocamIcon from '@material-ui/icons/Videocam'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  input: {
    flex: 1,
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#050505',
      fontSize: 15,
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
  fileUpload: {
    display: 'none',
  },
})

class GenericAction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEmojiPicker: false,
      mainState: 'initial', // initial, search, gallery, uploaded
      imageUploaded: 0,
      selectedFiles: null,
      errorMessage: undefined,
      base64Files: [],
    }
  }

  showEmojiPicker = () => {
    this.setState({
      showEmojiPicker: !this.state.showEmojiPicker,
    })
  }

  checkMimeType = event => {
    let errorMessage = undefined
    //getting file object
    let files = event.target.files
    //define message container
    let err = []
    // list allow mime type
    const types = ['image/png', 'image/jpeg', 'image/gif']
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container
        err[x] = files[x].type + ' is not a supported format\n'
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      // toast.error(err[z])
      errorMessage = err[z]
      event.target.value = null
    }
    this.setState({
      errorMessage,
    })
    return true
  }

  maxSelectFile = event => {
    let files = event.target.files
    if (files.length > 10) {
      const msg = 'Only 10 images can be uploaded at a time'
      event.target.value = null
      //    toast.warn(msg)
      this.setState({
        errorMessage: msg,
      })
      return false
    }
    return true
  }
  checkFileSize = event => {
    let errorMessage = undefined
    let files = event.target.files
    let size = 2000000
    let err = []
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + 'is too large, please pick a smaller file\n'
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      errorMessage = err[z]
      event.target.value = null
    }
    this.setState({
      errorMessage,
    })
    return true
  }

  handleFileUpload = event => {
    event.preventDefault()
    var filesObject = event.target.files
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      const files = Object.keys(filesObject).map(key => filesObject[key])
      this.getBase64Files(files)
      this.setState(
        {
          mainState: 'uploaded',
          imageUploaded: 1,
        },
        () => {},
      )
    }
    event.target.value = ''
  }

  getBase64Files = async files => {
    if (!files) {
      return
    }
    const { user } = this.props
    files.forEach(async (file, index) => {
      const base64File = this.pFileReader(file)

      // const config = {
      //   file: file,
      //   maxSize: 500
      // };
      // const resizedImage = await this.resizeImage(config)
      // console.log("upload resized image", resizedImage)

      base64File.then(f => {
        // console.log("buffer....", this.b64toBlob(f, file.type, 512))
        const obj = {
          buffer: f,
          name: user
            ? user.userName.charAt(0).toLowerCase() + '-' + index
            : 'image-' + index,
          type: file.type,
        }
        this.setState(
          prevState => ({
            base64Files: [...prevState.base64Files, obj],
          }),
          () => {
            if (files.length === index + 1) {
              this.props.getFiles(this.state.base64Files)
            }
          },
        )
      })
    })
  }

  // b64toBlob = (b64Data, fileType, sliceSize = 512) => {
  //   fileType = fileType || '';
  //   const byteCharacters = window.atop(b64Data);
  //   const byteArrays = [];
  //   for(let offset = 0; offset < byteCharacters.length; offset += sliceSize){
  //     const slice = byteCharacters.slice(offset, offset + sliceSize);
  //     let byteNumbers = new Array(slice.length);
  //     for(let i=0; i<slice.length; i++){
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }
  //     const byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }

  //   const blob = new Blob(byteArrays, { type: fileType });
  //   return blob;
  // }

  pFileReader = file => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result)
      }
      reader.readAsDataURL(file)
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
    const { message, errorMessage, showEmojiPicker } = this.state
    return (
      <Card>
        <CardHeader
          action={
            <>
              <input
                accept="image/*"
                className={classes.fileUpload}
                id="file-upload"
                multiple
                type="file"
                onChange={this.handleFileUpload}
              />
              <label htmlFor="file-upload">
                <Tooltip title="Upload Photos">
                  <IconButton component="span" aria-label="file-upload">
                    <PhotoIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </label>
              <Tooltip title="Add Smiles">
                <IconButton
                  aria-label="emoji-mart"
                  id="emoji-mart"
                  onClick={() => this.showEmojiPicker()}
                >
                  <SmileIcon className="smiley" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Upload Audio">
                <IconButton aria-label="upload-audio" id="upload-audio">
                  <AudiotrackIcon className="audio" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Upload Video">
                <IconButton aria-label="upload-video" id="upload-video">
                  <VideocamIcon className="video" />
                </IconButton>
              </Tooltip>
              {showEmojiPicker && (
                <EmojiMart
                  id="emoji-mart"
                  showEmojiPicker={this.showEmojiPicker}
                  getEmoji={this.props.getEmoji}
                />
              )}
              <Tooltip title="More">
                <IconButton aria-label="settings">
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
            </>
          }
          title={
            <Typography component="span" variant="h4" color="textPrimary">
              Add to your post
            </Typography>
          }
        />
        {errorMessage ? (
          <CustomizedSnackbars
            open={true}
            message={errorMessage}
            status="error"
          />
        ) : null}
      </Card>
    )
  }
}

GenericAction.propTypes = {}

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
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(GenericAction)),
)
