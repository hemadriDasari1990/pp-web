import * as postActions from '../../../Post/actions'

import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../../Loader/components/Loader'
import { Map } from 'immutable'
import MaterialLink from '@material-ui/core/Link'
import Tooltip from '@material-ui/core/Tooltip'
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

  handleCommentMenu = () => {}

  createOrUpdateCommentReaction = async (
    userId,
    commentId,
    reaction,
    index,
  ) => {
    await this.props
      .createOrUpdateCommentReaction(userId, commentId, reaction)
      .then(async res => {
        const comments = [...this.state.comments]
        const comment = comments[index]
        if (!res.data.reaction) {
          const likeReactions = comment.like_reactions.filter(
            lr => lr.reactedBy._id !== userId,
          )
          comment.like_reactions = likeReactions
          comment.likesCount = --comment.likesCount
        } else {
          comment.likesCount = ++comment.likesCount
          comment.like_reactions.push(res.data.reaction)
        }
        comments[index] = comment
        this.setState(
          {
            comments,
          },
          () => {},
        )
      })
  }

  render() {
    const { classes, commentsError, commentsLoading, user, post } = this.props
    const { comments } = this.state
    return (
      <>
        <List dense={true}>
          <div className="row">
            {!commentsLoading && comments.length
              ? comments.map((c, index) => (
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
