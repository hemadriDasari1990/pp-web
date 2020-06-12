import * as actions from '../actions'
import * as dashboardActions from '../../Timeline/actions'

import { Link, withRouter } from 'react-router-dom'
import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import Divider from '@material-ui/core/Divider'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import Menu from '@material-ui/core/Menu'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import NotifyIcon from '@material-ui/icons/AddAlertOutlined'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import ViewIcon from '@material-ui/icons/VisibilitySharp'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import getPastTime from '../../../util/getPastTime'
import getProvider from '../../../util/getProvider'
import getReaction from '../../../util/getReaction'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  smallAvatar: {
    width: 23,
    height: 23,
  },
  customBadge: {
    top: '90%',
    width: 35,
    height: 35,
    backgroundColor: 'unset !important',
  },
  statusIndicator: {
    width: 11,
    height: 11,
  },
}

class NotificationsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: 0,
      notifications: [],
      showSnackbar: false,
    }
    this.snackbarTimer = null
  }
  componentDidMount() {
    if (this.props.user) {
      this.props
        .getNotifications(
          this.props.user._id,
          this.props.type,
          this.state.limit,
        )
        .then(res => {
          this.setState({
            notifications: res.data,
          })
        })
    }
  }

  showMoreNotifications = async () => {
    const limit = parseInt(this.state.limit) + 10
    await this.props
      .getNotifications(this.props.user._id, this.props.type, limit)
      .then(res => {
        const notifications = [...this.state.notifications, ...res.data]
        this.setState({
          notifications,
          limit,
        })
      })
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
            {getProvider(sender.providerId)} reacted to your post
          </span>
        )
        break
      case 'dislike':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} reacted to your post
          </span>
        )
        break
      case 'thinking':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} reacted to your post
          </span>
        )
        break
      case 'perfect':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} reacted to your post
          </span>
        )
        break
      case 'love':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} reacted to your post
          </span>
        )
        break
      case 'wow':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} reacted to your post
          </span>
        )
        break
      case 'tounghout':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} reacted to your post
          </span>
        )
        break
      case 'profile-like':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} reacted to your profile
          </span>
        )
        break
      case 'profile-love':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} reacted to your profile
          </span>
        )
        break
      case 'follow':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} started following you
          </span>
        )
        break
      case 'post-created':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} Posted on your wall
          </span>
        )
        break
      case 'post-comment':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} commented on your post
          </span>
        )
        break
      case 'post-accept':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} accepted your post
          </span>
        )
        break
      case 'post-reject':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} rejected your post
          </span>
        )
        break
      case 'comment-like':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} liked your comment
          </span>
        )
        break
      case 'opinion':
        message = (
          <span>
            <Link className="hyperlink" to={`/profile/${sender._id}`}>
              {sender.userName}
            </Link>{' '}
            {getProvider(sender.providerId)} Asked for your opinion
          </span>
        )
        break
      default:
        break
    }
    return message
  }

  viewNotifications = async index => {
    const notification = this.state.notifications[index]
    if (!notification.read) {
      await this.props.markRead(notification._id).then(res => {
        const notifications = this.state.notifications
        const n = this.state.notifications[index]
        n.read = true
        notifications[index] = n
        this.props.updatenotificationsCount(n, 'mark_read')
        this.setState({
          notifications,
        })
      })
    }
    switch (notification.type.toLowerCase()) {
      case 'like':
        this.props.viewPostDetails(notification)
        break
      case 'dislike':
        this.props.viewPostDetails(notification)
        break
      case 'thinking':
        this.props.viewPostDetails(notification)
        break
      case 'perfect':
        this.props.viewPostDetails(notification)
        break
      case 'love':
        this.props.viewPostDetails(notification)
        break
      case 'wow':
        this.props.viewPostDetails(notification)
        break
      case 'tounghout':
        this.props.viewPostDetails(notification)
        break
      case 'post-created':
        this.props.viewPostDetails(notification)
        break
      case 'post-comment':
        this.props.viewPostDetails(notification)
        break
      case 'post-accept':
        this.props.viewPostDetails(notification)
        break
      case 'post-reject':
        this.props.viewPostDetails(notification)
        break
      default:
        break
    }
  }

  isShowMore = () => {
    let showLoadMore = false
    const { notifications } = this.state
    const { notificationsCount, type } = this.props
    switch (type.toLowerCase()) {
      case 'all':
        showLoadMore =
          notifications.length !== notificationsCount.total &&
          notificationsCount.total > 10
            ? true
            : false
        break
      case 'read':
        showLoadMore =
          notifications.length !== notificationsCount.readCount &&
          notificationsCount.readCount > 10
            ? true
            : false
        break
      case 'unread':
        showLoadMore =
          notifications.length !== notificationsCount.unReadCount &&
          notificationsCount.unReadCount > 10
            ? true
            : false
        break
      default:
        break
    }
    return showLoadMore
  }

  renderListItemClass = notification => {
    return 'cursor mb-10 p-0 w-us notification-item'
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleMenuItem = async (type, notification) => {
    switch (type.toLowerCase()) {
      case 'delete':
        await this.deleteNotification(notification)
        break
      default:
        break
    }
  }

  deleteNotification = async notification => {
    await this.props.deleteNotification(notification._id).then(res => {
      this.props.updatenotificationsCount(notification, 'delete')
      const notifications = this.state.notifications.filter(
        item => item.id !== notification._id,
      )
      this.setState({
        open: false,
        notifications,
        showSnackbar: true,
      })
      this.resetShowSnackbar()
    })
  }

  resetShowSnackbar = () => {
    this.snackbarTimer = setTimeout(() => {
      this.setState({
        showSnackbar: !this.state.showSnackbar,
      })
    }, 3000)
  }

  componentWillUnmount() {
    this.snackbarTimer ? clearTimeout(this.snackbarTimer) : null
  }

  renderMenu = (notification, index) => {
    return (
      <Menu
        id={notification._id}
        open={this.state.open}
        onClose={() => this.handleClose()}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        getContentAnchorEl={null}
        TransitionComponent={Zoom}
        key={notification._id}
      >
        <ListItem
          className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item"
          onClick={() => this.handleMenuItem('delete', notification)}
          key={1}
        >
          <ListItemAvatar style={{ minWidth: 35 }}>
            <DeleteOutlineIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>Delete Notification</b>}
            secondary="Delete this notification"
          />
        </ListItem>
        <ListItem key={2} className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item">
          <ListItemAvatar style={{ minWidth: 35 }}>
            <CancelPresentationIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>Turn Off</b>}
            secondary="Stop seeing notification like this"
          />
        </ListItem>
        {notification.type === 'opinion' && (
          <ListItem
            key={3}
            className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item"
            onClick={() => this.props.notifyRequestor(notification)}
          >
            <ListItemAvatar style={{ minWidth: 35 }}>
              <NotifyIcon />
            </ListItemAvatar>
            <ListItemText
              primary={<b>Notify Requestor</b>}
              secondary="Send your acknowledgement"
            />
          </ListItem>
        )}
        <ListItem
          key={4}
          className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item"
          onClick={() => this.viewNotifications(index)}
        >
          <ListItemAvatar style={{ minWidth: 35 }}>
            <ViewIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>View Post</b>}
            secondary="See what you have received"
          />
        </ListItem>
      </Menu>
    )
  }

  handleMenu = event => {
    this.setState({ open: !this.state.open, anchorEl: event.currentTarget })
  }

  render() {
    const {
      classes,
      notificationsError,
      notificationsLoading,
      user,
      type,
      deleteNotification,
      deleteNotificationLoading,
      deleteNotificationError,
      notificationsCount,
    } = this.props
    const { limit, notifications, open, anchorEl, showSnackbar } = this.state
    return (
      <React.Fragment>
        {/* <ClickAwayListener onClickAway={this.props.handleDrawerClose}> */}
        <List className="mt-25">
          <Grid container className="of-h">
            {!notificationsLoading && notifications && notifications.length ? (
              notifications.map((n, index) => (
                <Grid
                  key={n._id}
                  item
                  lg={12}
                  md={12}
                  xs={12}
                  sm={12}
                  className="middle-content"
                >
                  <Tooltip title="Mark Read" placement="bottom">
                    <ListItem
                      alignItems="flex-start"
                      className={this.renderListItemClass(n)}
                      onClick={() => this.viewNotifications(index)}
                    >
                      <ListItemAvatar>
                        <Badge
                          classes={{ badge: classes.customBadge }}
                          overlap="circle"
                          badgeContent={
                            <Zoom in={true} timeout={2000}>
                              <Avatar
                                className={classes.smallAvatar}
                                alt={n.sender ? n.sender.userName : ''}
                                style={{
                                  backgroundColor:
                                    n.type.toLowerCase() === 'love' ||
                                    n.type.toLowerCase() === 'profile-love'
                                      ? '#ff0016c7'
                                      : '',
                                }}
                              >
                                {getReaction(n ? n.type : '')}
                              </Avatar>
                            </Zoom>
                          }
                        >
                          <Zoom in={true} timeout={2000}>
                            <Avatar
                              alt={n.sender.userName.substring(0, 1)}
                              src={n.sender.photoURL}
                            />
                          </Zoom>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <span>{this.renderMessage(n.type, n.sender)}</span>
                        }
                        secondary={
                          <>
                            {getPastTime(n.createdAt)}{' '}
                            <Tooltip title={n.read ? 'Read' : 'Un Read'}>
                              <Zoom in={true} timeout={2000}>
                                <IconButton
                                  aria-label="settings"
                                  onClick={this.handleMenu}
                                  style={{ color: n.read ? '#61c516' : '' }}
                                  size="small"
                                >
                                  <FiberManualRecordIcon
                                    className={classes.statusIndicator}
                                  />
                                </IconButton>
                              </Zoom>
                            </Tooltip>
                          </>
                        }
                      />
                      <ListItemSecondaryAction className="r-0">
                        <Tooltip title="Actions">
                          <IconButton
                            aria-label="settings"
                            onClick={this.handleMenu}
                            color="primary"
                            className="mt-minus-18"
                          >
                            <MoreHorizIcon />
                          </IconButton>
                        </Tooltip>
                        {this.renderMenu(n, index)}
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Tooltip>
                  <Divider />
                </Grid>
              ))
            ) : (
              <h5 className="text-center">No Notifications Found</h5>
            )}
            {notificationsLoading && <Loader />}
          </Grid>
        </List>
        {this.isShowMore() ? (
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
        {!deleteNotificationLoading && deleteNotification && (
          <CustomizedSnackbars
            open={showSnackbar}
            message="Notification deleted successfully"
            status="success"
          />
        )}
        {!deleteNotificationLoading && deleteNotificationError && (
          <CustomizedSnackbars
            open={showSnackbar}
            message="Cannot remove notification. Please try again"
            status="success"
          />
        )}
        {/* </ClickAwayListener> */}
      </React.Fragment>
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
  const deleteNotification = state.getIn(['Notifications', 'delete', 'success'])
  const deleteNotificationLoading = state.getIn(
    ['Notifications', 'delete', 'loading'],
    false,
  )
  const deleteNotificationError = state.getIn([
    'Notifications',
    'delete',
    'errors',
  ])
  return {
    notifications,
    notificationsLoading,
    notificationsError,
    user,
    notificationsCount,
    deleteNotification,
    deleteNotificationLoading,
    deleteNotificationError,
  }
}

const actionsToProps = {
  getNotifications: actions.getNotifications,
  markRead: actions.markRead,
  getNotificationsCount: dashboardActions.getNotificationsCount,
  deleteNotification: actions.deleteNotification,
}

export default withRouter(
  connect(
    mapStateToProps,
    actionsToProps,
  )(withStyles(styles)(NotificationsList)),
)
