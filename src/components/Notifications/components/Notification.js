import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { Map, fromJS } from 'immutable'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import formateNumber from '../../../util/formateNumber'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import * as dashboardActions from '../../Timeline/actions'
import textingImage from '../../../../assets/notifications/texting.svg'
import NotificationsList from './List'
import * as actions from '../actions'

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
      value: 1,
      type: 'all',
    }
  }

  async componentDidMount() {
    if (this.props.user) {
      await this.props.getNotificationsCount(this.props.user._id)
      await this.props.getNotifications(
        this.props.user._id,
        this.state.type,
        10,
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

  handleChange = async (index, type) => {
    this.setState({
      value: index,
      type,
    })
    // this.props.user ? await this.props.getNotifications(this.props.user._id, type): null;
  }

  getStyle(isActive) {
    const { classes } = this.props
    return isActive
      ? {
          color: '#fff',
          background:
            'linear-gradient(45deg, #2a7fff 1%, #00ff43 80%, #2a7fff 96%, #37ff2a 100%) 0% 0% / 150% 150%',
        }
      : {}
  }

  render() {
    const { classes, notificationsCount, user } = this.props
    const { value, type } = this.state
    return (
      <React.Fragment>
        <h2 className="text-center">Notifications</h2>
        {notificationsCount && notificationsCount.total > 0 ? (
          <>
            <AppBar position="static">
              <Tabs
                textColor="primary"
                value={value}
                aria-label="scrollable prevent tabs example"
                fullWidth={true}
                centered
              >
                <Tab
                  onClick={() => this.handleChange(1, 'all')}
                  style={this.getStyle(value === 1)}
                  value={value}
                  label={'All ' + formateNumber(notificationsCount.total)}
                  aria-label="phone"
                  className="text-capitalize"
                />
                <Tab
                  onClick={() => this.handleChange(2, 'read')}
                  style={this.getStyle(value === 2)}
                  value={value}
                  label={'Read ' + formateNumber(notificationsCount.readCount)}
                  aria-label="phone"
                  className="text-capitalize"
                />
                <Tab
                  onClick={() => this.handleChange(3, 'unread')}
                  style={this.getStyle(value === 3)}
                  value={value}
                  label={
                    'Un Read ' + formateNumber(notificationsCount.unReadCount)
                  }
                  aria-label="favorite"
                  className="text-capitalize"
                />
              </Tabs>
            </AppBar>
            <TabPanel className="mt-10" value={value} index={1}>
              <NotificationsList type={type} />
            </TabPanel>
            <TabPanel className="mt-10" value={value} index={2}>
              <NotificationsList type={type} />
            </TabPanel>
            <TabPanel className="mt-10" value={value} index={3}>
              <NotificationsList type={type} />
            </TabPanel>
          </>
        ) : (
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h2 className="text-center">No records found</h2>
            <img src={textingImage} />
          </div>
        )}
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
  return {
    notificationsCount,
    user,
  }
}

const actionsToProps = {
  getNotificationsCount: dashboardActions.getNotificationsCount,
  getNotifications: actions.getNotifications,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Notifications)),
)
