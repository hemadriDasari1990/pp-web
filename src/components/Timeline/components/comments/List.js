import * as postActions from '../../../Post/actions'

import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../../Loader/components/Loader'
import { Map } from 'immutable'
import MaterialLink from '@material-ui/core/Link'
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import formateNumber from '../../../../util/formateNumber'
import getPastTime from '../../../../util/getPastTime'
import isReactedToComment from '../../../../util/isReactedToComment'
import renderUserNames from '../../../../util/renderUserNames'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  smallAvatar: {
    width: 15,
    height: 15,
  },
  customBadge: {
    backgroundColor: 'unset !important',
  },
  inline: {
    display: 'inline',
  },
  alignText: {
    wordBreak: 'break-word',
    display: 'inline-block',
  },
  itemAvatar: {
    minWidth: 35,
  },
  userAvatar: {
    width: 30,
    height: 30,
  },
}

class CommentsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      limit: 2,
      comment: '',
      edit: false,
      commentId: null,
      totalComments: props.totalComments,
    }
  }
  componentDidMount() {
    const { limit } = this.state
    this.props.getComments(this.props.postId, limit).then(res => {
      this.setState({
        comments: res.data,
      })
    })
  }

  handleCommentMenu = () => {}

  createOrUpdateCommentReaction = async (
    userId,
    commentId,
    reaction,
    index,
  ) => {
    await this.props
      .createOrUpdateCommentReaction(userId, commentId, reaction)
      .then(res => {
        const comments = [...this.state.comments]
        if (!res.data.reaction) {
          const likeReactions = comments[index].like_reactions.filter(
            lr => lr.reactedBy._id !== userId,
          )
          comments[index].like_reactions = likeReactions
          comments[index].likesCount = --comments[index].likesCount
        } else {
          comments[index].likesCount = ++comments[index].likesCount
          res.data.reaction.reactedBy = this.props.user
          comments[index].like_reactions.unshift(res.data.reaction)
          comments[index].reactions.unshift(res.data.reaction)
        }
        this.setState({
          comments,
        })
      })
  }

  handleComment = e => {
    e.preventDefault()
    this.setState({
      comment: e.target.value,
    })
  }

  editComment = (commentId, comment) => {
    this.setState({
      edit: !this.state.edit,
      commentId,
      comment,
    })
  }

  updateComment = async (event, commentId, index) => {
    const { comment } = this.state
    await this.props.updateComment(commentId, comment).then(res => {
      const comments = [...this.state.comments]
      comments[index].message = comment
      this.setState({
        comments,
        edit: false,
        commentId: null,
      })
    })
  }

  showMoreComments = async () => {
    const limit = parseInt(this.state.limit) + 10
    const offset = this.state.limit
    await this.props.getComments(this.props.postId, limit, offset).then(res => {
      const comments = [...this.state.comments, ...res.data]
      this.setState({
        comments,
        limit,
      })
    })
  }

  isShowMore = () => {
    let showLoadMore = false
    return showLoadMore
  }

  handleCancel = commentId => {
    this.setState({
      edit: false,
    })
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   return nextState.comments != this.state.comments && this.state.commentId !== nextState.commentId;
  // }

  deleteComment = commentId => {
    this.props.deleteComment(this.props.postId, commentId).then(res => {
      let comments = [...this.state.comments]
      const index = comments.findIndex(c => c._id === commentId)
      comments = comments.splice(1, index)
      const totalComments = --this.state.totalComments
      this.setState({
        comments,
        totalComments,
      })
    })
  }

  render() {
    const { classes, commentsError, commentsLoading, user, postId } = this.props
    const { comments, edit, comment, commentId, totalComments } = this.state
    return (
      <>
        <List dense={true}>
          <Grid>
            {comments && comments.length
              ? comments.map((c, index) => (
                  <Grid key={c._id} lg={12} md={12} sm={12} xs={12}>
                    <ListItem
                      alignItems="flex-start"
                      className="comment-list-item cursor w-us"
                    >
                      <ListItemAvatar className={classes.itemAvatar}>
                        <Badge
                          classes={{ badge: classes.customBadge }}
                          overlap="circle"
                        >
                          <Avatar
                            alt={c.commentedBy.userName.substring(0, 1)}
                            src={c.commentedBy.photoURL}
                            className={classes.userAvatar}
                          />
                        </Badge>
                      </ListItemAvatar>

                      {edit && commentId === c._id ? (
                        <>
                          <ListItemText
                            primary={
                              <>
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
                                    fullWidth
                                    required
                                  />
                                </Zoom>
                              </>
                            }
                            secondary={
                              <React.Fragment>
                                <div className="comment-actions comment-actions1">
                                  {comment && commentId === c._id ? (
                                    <Tooltip title="Update">
                                      <small
                                        style={{ fontWeight: 'bold' }}
                                        className="m-r-5 m-l-5"
                                        onClick={e =>
                                          this.updateComment(e, c._id, index)
                                        }
                                      >
                                        Update
                                      </small>
                                    </Tooltip>
                                  ) : null}
                                  <small> -</small>
                                  <Tooltip title="Cancel">
                                    <small
                                      style={{ fontWeight: 'bold' }}
                                      className="m-r-5 m-l-5"
                                      onClick={() => this.handleCancel(c._id)}
                                    >
                                      Cancel
                                    </small>
                                  </Tooltip>
                                </div>
                              </React.Fragment>
                            }
                          />
                        </>
                      ) : (
                        <Tooltip title={c.commentedBy.userName} placement="top">
                          <ListItemText
                            primary={
                              <React.Fragment>
                                <div className="comment-group">
                                  <div className="comment-text">
                                    <div className="list-item-secondary-text">
                                      <Link
                                        className="hyperlink"
                                        to={`/profile/${c.commentedBy._id}`}
                                      >
                                        {user && user._id === c.commentedBy._id
                                          ? 'You '
                                          : c.commentedBy.userName + ' '}
                                      </Link>{' '}
                                      <small>{c.message}</small>
                                    </div>
                                    {c.likesCount > 0 && (
                                      <div className="comment-reaction-list">
                                        <Tooltip
                                          title={renderUserNames(c.reactions)}
                                          placement="bottom"
                                        >
                                          <Link
                                            to={`/post/comments/${c._id}/reactions`}
                                            className="row comment-reactions-view"
                                          >
                                            <Avatar
                                              className={classes.smallAvatar}
                                              alt="Image Not Available"
                                            >
                                              <LikeIcon className="comment-avatar-reaction-icon comment-avatar-reaction" />
                                            </Avatar>
                                            <span className="cursor actions-text v-align-middle grey-color reaction-text">
                                              {formateNumber(c.likesCount)}
                                            </span>
                                          </Link>
                                        </Tooltip>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </React.Fragment>
                            }
                            secondary={
                              <React.Fragment>
                                <div className="comment-actions comment-actions1">
                                  <Tooltip title="Like">
                                    <small
                                      className="m-r-5"
                                      style={{
                                        fontWeight: isReactedToComment(
                                          user._id,
                                          c.like_reactions,
                                        )
                                          ? 'bold'
                                          : 'normal',
                                      }}
                                      onClick={() =>
                                        this.createOrUpdateCommentReaction(
                                          user._id,
                                          c._id,
                                          'like',
                                          index,
                                        )
                                      }
                                    >
                                      {isReactedToComment(
                                        user._id,
                                        c.like_reactions,
                                      )
                                        ? 'Liked'
                                        : 'Like'}
                                    </small>
                                  </Tooltip>
                                  {!edit &&
                                  user &&
                                  user._id === c.commentedBy._id ? (
                                    <>
                                      <small> -</small>
                                      <Tooltip title="Edit">
                                        <small
                                          className="m-r-5 m-l-5"
                                          onClick={() =>
                                            this.editComment(c._id, c.message)
                                          }
                                        >
                                          Edit
                                        </small>
                                      </Tooltip>
                                      <small> -</small>
                                      <Tooltip title="Delete">
                                        <small
                                          href="#"
                                          className="m-r-5 m-l-5"
                                          onClick={() =>
                                            this.deleteComment(c._id)
                                          }
                                        >
                                          Delete
                                        </small>
                                      </Tooltip>
                                    </>
                                  ) : null}
                                  <small> -</small>
                                  <small className="grey-color m-r-5 m-l-5">
                                    {getPastTime(c.createdAt)}
                                  </small>
                                </div>
                              </React.Fragment>
                            }
                          />
                        </Tooltip>
                      )}
                    </ListItem>
                  </Grid>
                ))
              : null}
          </Grid>
          {comments.length && comments.length < totalComments ? (
            <div className="text-center">
              <Button
                color="primary"
                className="mt-10"
                onClick={() => this.showMoreComments()}
              >
                Show More Comments
              </Button>
            </div>
          ) : null}
        </List>
      </>
    )
  }
}

CommentsList.propTypes = {}

const mapStateToProps = state => {
  // const comments = state.getIn(['Post', 'comments', 'success'], Map())
  const commentsLoading = state.getIn(['Post', 'comments', 'loading'], false)
  const commentsError = state.getIn(['Post', 'comments', 'errors'], Map())
  const user = state.getIn(['user', 'data'])
  return {
    // comments,
    commentsLoading,
    commentsError,
    user,
  }
}

const actionsToProps = {
  getComments: postActions.getComments,
  createOrUpdateCommentReaction: postActions.createOrUpdateCommentReaction,
  updateComment: postActions.updateComment,
  deleteComment: postActions.deleteComment,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(CommentsList)),
)
