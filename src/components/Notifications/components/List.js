import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Loader from '../../Loader/components/Loader'
import * as actions from '../actions'
import { Map, fromJS } from 'immutable'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import getReaction from '../../../util/getReaction'
import moment from 'moment'
import textingImage from '../../../../assets/notifications/texting.svg'
import Fab from '@material-ui/core/Fab'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import * as dashboardActions from '../../Timeline/actions'
import ReadIcon from '@material-ui/icons/DoneAll'
import getPastTime from '../../../util/getPastTime'
import Divider from '@material-ui/core/Divider'
const styles = {
  smallAvatar: {},
  customBadge: {
    top: '90%',
    width: 35,
    height: 35,
    backgroundColor: 'unset !important',
  },
}

class NotificationsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: 10,
    }
  }
  componentDidMount() {
    if (this.props.user) {
      this.props.getNotifications(
        this.props.user._id,
        this.props.type,
        this.state.limit,
      )
    }
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

  showMoreNotifications = () => {
    this.setState(
      {
        limit: parseInt(this.state.limit) + 10,
      },
      () => {
        this.props.getNotifications(
          this.props.user._id,
          this.props.type,
          parseInt(this.state.limit),
        )
      },
    )
  }

  renderMessage = (type, sender) => {
    if (!type || !sender) {
      return null
    }
    let message
    switch (type.toLowerCase()) {
      case 'like':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            reacted to your post
          </span>
        )
        break
      case 'dislike':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            reacted to your post
          </span>
        )
        break
      case 'thinking':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            reacted to your post
          </span>
        )
        break
      case 'perfect':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            reacted to your post
          </span>
        )
        break
      case 'love':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            reacted to your post
          </span>
        )
        break
      case 'wow':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            reacted to your post
          </span>
        )
        break
      case 'tounghout':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            reacted to your post
          </span>
        )
        break
      case 'profile-like':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            reacted to your profile
          </span>
        )
        break
      case 'profile-love':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            reacted to your profile
          </span>
        )
        break
      case 'follow':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            started following you
          </span>
        )
        break
      case 'post-created':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            Posted on your wall
          </span>
        )
        break
      case 'post-comment':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            commented on your post
          </span>
        )
        break
      case 'post-accept':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            accepted your post
          </span>
        )
        break
      case 'post-reject':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            rejected your post
          </span>
        )
        break
      case 'comment-like':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            liked your comment
          </span>
        )
        break
      default:
        break
    }
    return message
  }

  viewNotifications = async (notificationId, read, type, resourceId) => {
    if (!read) {
      await this.props.markRead(notificationId)
      await this.props.getNotificationsCount(this.props.user._id)
    }
    switch (type.toLowerCase()) {
      case 'like':
        this.viewPostDetails(resourceId)
        break
      case 'dislike':
        this.viewPostDetails(resourceId)
        break
      case 'thinking':
        this.viewPostDetails(resourceId)
        break
      case 'perfect':
        this.viewPostDetails(resourceId)
        break
      case 'love':
        this.viewPostDetails(resourceId)
        break
      case 'wow':
        this.viewPostDetails(resourceId)
        break
      case 'tounghout':
        this.viewPostDetails(resourceId)
        break
      case 'post-created':
        this.viewPostDetails(resourceId)
        break
      case 'post-comment':
        this.viewPostDetails(resourceId)
        break
      case 'post-accept':
        this.viewPostDetails(resourceId)
        break
      case 'post-reject':
        this.viewPostDetails(resourceId)
        break
      default:
        break
    }
  }

  viewPostDetails = postId => {
    this.props.history.push(`/post/${postId}/details`)
  }

  render() {
    const {
      classes,
      notifications,
      notificationsError,
      notificationsLoading,
      user,
      notificationsCount,
    } = this.props
    const { limit } = this.state
    return (
      <>
        <List className="mt-25">
          <div className="row">
            {!notificationsLoading && notifications && notifications.length
              ? notifications.map(n => (
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <Tooltip title="Mark Read" placement="bottom">
                      <ListItem
                        key={n._id}
                        alignItems="flex-start"
                        className="cursor mb-10 p-0 notification-item"
                        onClick={() =>
                          this.viewNotifications(
                            n._id,
                            n.read,
                            n.type,
                            n.resourceId,
                          )
                        }
                      >
                        <ListItemAvatar>
                          <Badge
                            classes={{ badge: classes.customBadge }}
                            overlap="circle"
                            badgeContent={
                              <img
                                className={classes.smallAvatar}
                                alt="NA"
                                src={getReaction(n.type)}
                              />
                            }
                          >
                            <Avatar
                              alt={n.sender.userName.substring(0, 1)}
                              src={n.sender.photoURL}
                            />
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          style={{ maxWidth: 500 }}
                          primary={
                            <Typography variant="h6">
                              {this.renderMessage(n.type, n.sender)}
                            </Typography>
                          }
                          secondary={getPastTime(n.updatedAt)}
                        />
                        <ListItemSecondaryAction>
                          <Tooltip title={n.read ? 'Read' : 'Un Read'}>
                            <ReadIcon
                              style={{ fill: n.read ? '#2a7fff' : '#3333' }}
                            />
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Tooltip>
                    <Divider />
                  </div>
                ))
              : null}
            {!notificationsLoading &&
              (!notifications || !notifications.length) && (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h2 className="text-center">No records found</h2>
                  <img src={textingImage} />
                </div>
              )}
            {notificationsLoading &&
              (!notifications || !notifications.length) && <Loader />}
          </div>
        </List>
        {notifications &&
        notifications.length &&
        notificationsCount &&
        limit < notificationsCount.total ? (
          <div className="text-center">
            <Button
              color="primary"
              className="mt-10"
              onClick={() => this.showMoreNotifications()}
            >
              Show More Notifications
            </Button>
          </div>
        ) : null}
      </>
    )
  }
}

NotificationsList.propTypes = {}

const mapStateToProps = state => {
  const notifications = state.getIn(['Notifications', 'success'])
  const notificationsLoading = state.getIn(['Notifications', 'loading'], false)
  const notificationsError = state.getIn(['Notifications', 'errors'])
  const user = state.getIn(['user', 'data'])
  const notificationsCount = state.getIn([
    'Timeline',
    'notifications',
    'count',
    'success',
  ])
  return {
    notifications,
    notificationsLoading,
    notificationsError,
    user,
    notificationsCount,
  }
}

const actionsToProps = {
  getNotifications: actions.getNotifications,
  markRead: actions.markRead,
  getNotificationsCount: dashboardActions.getNotificationsCount,
}

export default withRouter(
  connect(
    mapStateToProps,
    actionsToProps,
  )(withStyles(styles)(NotificationsList)),
)
