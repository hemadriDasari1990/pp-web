import * as actions from '../actions'
import * as dashboardActions from '../../Timeline/actions'

import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Loader from '../../Loader/components/Loader'
import NotificationsList from './List'
import PropTypes from 'prop-types'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import textingImage from '../../../../assets/notifications/texting.svg'
import { withStyles } from '@material-ui/core/styles'

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

//   function a11yProps(index) {
//     return {
//       id: `scrollable-prevent-tab-${index}`,
//       'aria-controls': `scrollable-prevent-tabpanel-${index}`,
//     };
//   }

class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      type: 'all',
      notificationsCount: this.props.notificationsCount,
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
      // await this.props.getNotifications(
      //   this.props.user._id,
      //   this.state.type,
      //   this.state.limit,
      // ).then(res => {
      //   this.setState({
      //     notifications: res.data
      //   });
      // })
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

  getNotificationsCountText = (type, count) => {
    return (
      <>
        <span>{type}&nbsp;</span> <b> {formateNumber(count)}</b>
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

  render() {
    const {
      classes,
      notificationsCountLoading,
      user,
      notificationsCountError,
    } = this.props
    const { value, type, notifications, notificationsCount } = this.state
    return (
      <React.Fragment>
        <h2 className="text-center">Notifications</h2>
        {!notificationsCountLoading &&
          notificationsCount &&
          notificationsCount.total > 0 && (
            <>
              <Tabs
                textColor="primary"
                value={value}
                aria-label="scrollable prevent tabs example"
                fullWidth={true}
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
                />
              </TabPanel>
              <TabPanel className="mt-10" value={value} index={1}>
                <NotificationsList
                  type={type}
                  updatenotificationsCount={this.updatenotificationsCount}
                />
              </TabPanel>
              <TabPanel className="mt-10" value={value} index={2}>
                <NotificationsList
                  type={type}
                  updatenotificationsCount={this.updatenotificationsCount}
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
      </React.Fragment>
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
