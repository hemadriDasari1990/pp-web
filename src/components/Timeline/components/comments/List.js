import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Loader from '../../../Loader/components/Loader'
import * as postActions from '../../../Post/actions'
import { Map, fromJS } from 'immutable'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import getReaction from '../../../../util/getReaction'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import moment from 'moment'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import IconButton from '@material-ui/core/IconButton'
import getPastTime from '../../../../util/getPastTime'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ReplyIcon from '@material-ui/icons/Reply'
import likeIcon from '../../../../../assets/emojis/like.svg'
import CreateComment from './CreateComment'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import isReactedToComment from '../../../../util/isReactedToComment'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import renderUserNames from '../../../../util/renderUserNames'
import formateNumber from '../../../../util/formateNumber'
import MaterialLink from '@material-ui/core/Link'

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
      comments: this.props.comments,
    }
  }
  componentDidMount() {
    this.props.getComments(this.props.post._id).then(res => {
      this.setState({
        comments: res.data,
      })
    })
  }

  renderUserOrigin = provider => {
    let name = ''
    switch (provider.toLowerCase()) {
      case 'google.com':
        name = 'Google User'
        break
      case 'facebook.com':
        name = 'facebook.com'
        break
      default:
        break
    }
    return name
  }

  handleCommentMenu = () => {}

  createOrUpdateCommentReaction = async (userId, commentId, reaction) => {
    await this.props
      .createOrUpdateCommentReaction(userId, commentId, reaction)
      .then(async data => {
        await this.props.getComments(this.props.post._id).then(res => {
          this.setState({
            comments: res.data,
          })
        })
      })
  }

  render() {
    const { classes, commentsError, commentsLoading, user, post } = this.props
    console.log('comment list called')
    const { comments } = this.state
    return (
      <>
        <List dense={true}>
          <div className="row">
            {!commentsLoading && comments.length
              ? comments.map(c => (
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <ListItem
                      key={c._id}
                      alignItems="flex-start"
                      className="comment-list-item cursor"
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
                                    {c.message}
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
                                  <MaterialLink
                                    className="m-r-5"
                                    href="#"
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
                                      )
                                    }
                                  >
                                    {isReactedToComment(
                                      user._id,
                                      c.like_reactions,
                                    )
                                      ? 'Liked'
                                      : 'Like'}
                                  </MaterialLink>
                                </Tooltip>
                                <small> -</small>
                                <Tooltip title="Edit">
                                  <MaterialLink
                                    href="#"
                                    className="m-r-5 m-l-5"
                                  >
                                    Edit
                                  </MaterialLink>
                                </Tooltip>
                                <small> -</small>
                                <Tooltip title="Delete">
                                  <MaterialLink
                                    href="#"
                                    className="m-r-5 m-l-5"
                                  >
                                    Delete
                                  </MaterialLink>
                                </Tooltip>
                                <small> -</small>
                                <small className="grey-color m-r-5 m-l-5">
                                  {getPastTime(c.createdAt)}
                                </small>
                              </div>
                            </React.Fragment>
                          }
                        />
                      </Tooltip>
                    </ListItem>
                  </div>
                ))
              : null}
            {commentsLoading && !comments.length && <Loader />}
          </div>
        </List>
      </>
    )
  }
}

CommentsList.propTypes = {}

const mapStateToProps = state => {
  const comments = state.getIn(['Post', 'comments', 'success'], Map())
  const commentsLoading = state.getIn(['Post', 'comments', 'loading'], false)
  const commentsError = state.getIn(['Post', 'comments', 'errors'], Map())
  const user = state.getIn(['user', 'data'])
  return {
    comments,
    commentsLoading,
    commentsError,
    user,
  }
}

const actionsToProps = {
  getComments: postActions.getComments,
  createOrUpdateCommentReaction: postActions.createOrUpdateCommentReaction,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(CommentsList)),
)
