import * as actions from '../../actions'
import * as postActions from '../../../Post/actions'

import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  button: {
    borderRadius: 20,
  },
}

class CreateComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: '',
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    // this.props.getIncomingPosts(this.props.user._id)
  }

  createComment = async (e, post, postId) => {
    // Prevent the default behaviour of form submit
    e.preventDefault()
    const data = {
      postId: postId,
      commentedBy: this.props.user._id,
      message: this.state.comment,
    }
    await this.props.createComment(postId, data).then(async res => {
      this.props.hideComment(postId)
      await this.props.getCommentsCount(postId)
      if (res.data && res.data.comment) {
        res.data.comment.commentedBy = this.props.user
        res.data.comment.likes = 0
        res.data.comment.likesCount = 0
        res.data.comment.reactionsCount = 0
        res.data.comment.reactions = []
        res.data.comment.reactedBy = null
      }
      this.props.getNewComment(res.data.comment)
      // await this.props.getComments(postId)
    })
  }

  handleComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  render() {
    const { classes, showCommentInput, post, user } = this.props
    const { comment } = this.state
    return (
      <>
        {showCommentInput && (
          <Grid container spacing={1} alignItems="flex-start">
            <Grid item>
              <Slide
                direction="right"
                in={true}
                timeout={1500}
                mountOnEnter
                unmountOnExit
              >
                <Avatar
                  size="small"
                  src={post.postedBy.photoURL}
                  className="m-l-10"
                />
              </Slide>
            </Grid>
            <Grid lg={comment ? 9 : 10} md={comment ? 9 : 10} item>
              <Zoom in={true} timeout={2000}>
                <TextField
                  className="m-0"
                  key="comment"
                  margin="normal"
                  type="string"
                  size="small"
                  variant="outlined"
                  label="Write a comment"
                  placeholder="Type here"
                  value={comment}
                  multiline
                  onChange={e => this.handleComment(e)}
                  rowsMax={Infinity}
                  fullWidth
                  required
                />
              </Zoom>
            </Grid>
            {comment ? (
              <Grid lg={1} md={1} item>
                <Zoom in={comment ? true : false} timeout={2000}>
                  <Button
                    onClick={e => this.createComment(e, post, post._id)}
                    variant="outlined"
                    size="medium"
                    color="primary"
                    className={classes.button}
                  >
                    Save
                  </Button>
                </Zoom>
              </Grid>
            ) : null}
          </Grid>
        )}
      </>
    )
  }
}

CreateComment.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  createComment: actions.createComment,
  getCommentsCount: postActions.getCommentsCount,
  getComments: postActions.getComments,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(CreateComment)),
)
