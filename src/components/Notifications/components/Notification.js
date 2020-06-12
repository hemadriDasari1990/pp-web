import * as actions from '../actions'
import * as dashboardActions from '../../Timeline/actions'

import React, { Component, Suspense, lazy } from 'react'

import BackIcon from '@material-ui/icons/ArrowBack'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ListSubheader from '@material-ui/core/ListSubheader'
import Loader from '../../Loader/components/Loader'
import PropTypes from 'prop-types'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import textingImage from '../../../../assets/notifications/texting.svg'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const NotificationsList = lazy(() => import('./List'))
const NotifyReason = lazy(() => import('./NotifyReason'))
const PostDetails = lazy(() => import('./PostDetails'))

const styles = {
  default_tab: {
    color: '#68C222',
    width: '33.3%',
    backgroundColor: '#FFFFFF',
    fontSize: 15,
  },
  active_tab: {
    color: 'red',
    width: '33.3%',
    backgroundColor: '#FFFFFF',
    fontSize: 15,
  },
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="subtitle1"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      type: 'all',
      notificationsCount: this.props.notificationsCount,
      page: 1,
      notification: null,
      // limit: 0,
      // notifications: []
    }
  }

  async componentDidMount() {
    if (this.props.user) {
      await this.props.getNotificationsCount(this.props.user._id).then(res => {
        this.setState({
          notificationsCount: res.data,
        })
      })
    }
  }

  getNotificationsCountText = (type, count) => {
    return (
      <>
        <span className="tab-title">
          {type}&nbsp;<b> {formateNumber(count)}</b>
        </span>
      </>
    )
  }

  handleChange = async (index, type) => {
    this.setState({
      value: index,
      type,
    })
  }

  updatenotificationsCount = (notification, type) => {
    const notificationsCount = this.state.notificationsCount
    switch (type.toLowerCase()) {
      case 'mark_read':
        notificationsCount.readCount += 1
        notificationsCount.unReadCount -= 1
        break
      case 'delete':
        if (notification.read) {
          notificationsCount.readCount -= 1
        }
        if (!notification.read) {
          notificationsCount.unReadCount -= 1
        }
        notificationsCount.total -= 1
        break
      default:
        break
    }
    this.setState({
      notificationsCount,
    })
  }

  notifyRequestor = notification => {
    this.setState({
      page: 2,
      notification,
    })
  }

  viewPostDetails = notification => {
    this.setState({
      page: 3,
      notification,
    })
  }

  goBack = () => {
    this.setState({
      page: 1,
    })
  }

  render() {
    const {
      classes,
      notificationsCountLoading,
      user,
      notificationsCountError,
    } = this.props
    const {
      value,
      type,
      notifications,
      notificationsCount,
      page,
      notification,
    } = this.state
    console.log('postDetails', page)
    return (
      <Suspense fallback={<div />}>
        {page === 2 && (
          <>
            <Grid container spacing={1}>
              <Grid item lg={2} xs={12}>
                <IconButton onClick={() => this.goBack()} color="primary">
                  <BackIcon />
                </IconButton>
              </Grid>
              <Grid item lg={10} xs={12}>
                <ListSubheader component="div" id="nested-list-subheader">
                  Notify <b>{notification.sender.userName}</b> with reason
                </ListSubheader>
              </Grid>
            </Grid>
            <NotifyReason />
          </>
        )}
        {page === 1 && (
          <>
            <h4 className="mt-4 mb-4 text-center">
              Hey, {user ? user.userName + '!' : ''}
            </h4>
            {!notificationsCountLoading &&
              notificationsCount &&
              notificationsCount.total > 0 && (
                <>
                  <Tabs
                    textColor="primary"
                    value={value}
                    aria-label="scrollable prevent tabs example"
                    indicatorColor="primary"
                    centered
                  >
                    <Tab
                      onClick={() => this.handleChange(0, 'all')}
                      value={0}
                      label={this.getNotificationsCountText(
                        'All',
                        formateNumber(notificationsCount.total),
                      )}
                      aria-label="phone"
                      className="text-capitalize"
                    />
                    <Tab
                      onClick={() => this.handleChange(1, 'read')}
                      value={1}
                      label={this.getNotificationsCountText(
                        'Read',
                        formateNumber(notificationsCount.readCount),
                      )}
                      aria-label="phone"
                      className="text-capitalize"
                    />
                    <Tab
                      onClick={() => this.handleChange(2, 'unread')}
                      value={2}
                      label={this.getNotificationsCountText(
                        'Un Read',
                        formateNumber(notificationsCount.unReadCount),
                      )}
                      aria-label="favorite"
                      className="text-capitalize"
                    />
                  </Tabs>
                  <TabPanel className="mt-10" value={value} index={0}>
                    <NotificationsList
                      type={type}
                      updatenotificationsCount={this.updatenotificationsCount}
                      notifyRequestor={this.notifyRequestor}
                      viewPostDetails={this.viewPostDetails}
                    />
                  </TabPanel>
                  <TabPanel className="mt-10" value={value} index={1}>
                    <NotificationsList
                      type={type}
                      updatenotificationsCount={this.updatenotificationsCount}
                      notifyRequestor={this.notifyRequestor}
                      viewPostDetails={this.viewPostDetails}
                    />
                  </TabPanel>
                  <TabPanel className="mt-10" value={value} index={2}>
                    <NotificationsList
                      type={type}
                      updatenotificationsCount={this.updatenotificationsCount}
                      notifyRequestor={this.notifyRequestor}
                      viewPostDetails={this.viewPostDetails}
                    />
                  </TabPanel>
                </>
              )}
            {!notificationsCountLoading &&
              notificationsCount &&
              !notificationsCount.total && (
                <div className="text-center col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <img src={textingImage} />
                </div>
              )}
            {notificationsCountLoading && <Loader />}
          </>
        )}
        {page === 3 && (
          <>
            <PostDetails notification={notification} goBack={this.goBack} />
          </>
        )}
      </Suspense>
    )
  }
}

Notifications.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const notificationsCount = state.getIn([
    'Timeline',
    'notifications',
    'count',
    'success',
  ])
  const notificationsCountLoading = state.getIn([
    'Timeline',
    'notifications',
    'count',
    'loading',
  ])
  const notificationsCountError = state.getIn([
    'Timeline',
    'notifications',
    'count',
    'error',
  ])
  return {
    notificationsCount,
    notificationsCountLoading,
    user,
    notificationsCountError,
  }
}

const actionsToProps = {
  getNotificationsCount: dashboardActions.getNotificationsCount,
  getNotifications: actions.getNotifications,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Notifications)),
)
