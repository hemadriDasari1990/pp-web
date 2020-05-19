import * as actions from '../../../actions/index'
import * as userProfileActions from '../../UserProfile/actions'

import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import DashboardIcon from '@material-ui/icons/LineStyle'
import DownIcon from '@material-ui/icons/GetApp'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import PreferencesIcon from '@material-ui/icons/Tune'
import PropTypes from 'prop-types'
import UpIcon from '@material-ui/icons/Publish'
import UsersIcon from '@material-ui/icons/PermIdentity'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import firebase from '../../../firebase'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const color = '#2a7fff'
const styles = {
  avatar: {
    width: 30,
    height: 30,
  },
  avatar1: {
    width: 30,
    height: 30,
    backgroundColor: color,
  },
  badge: {
    color: '#fff',
    backgroundColor: '#f30404',
  },
}

class DrawerComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logout: false,
    }
  }

  // componentDidMount(){
  //   this.props.user
  //     ? this.props.getNotificationsCount(this.props.user._id)
  //     : null
  // }

  handleIncoming = () => {
    this.props.toggleDrawer()
    this.props.history.push('/timeline/incoming')
    this.props.saveActionState('incoming')
  }

  handleOutgoing = () => {
    this.props.toggleDrawer()
    this.props.history.push('/timeline/outgoing')
    this.props.saveActionState('outgoing')
  }

  handleUsers = () => {
    this.props.toggleDrawer()
    this.props.history.push('/timeline/users')
    this.props.saveActionState('users')
  }

  handleDashboard = () => {
    this.props.toggleDrawer()
    this.props.history.push('/dashboard')
  }

  handleNotifications = () => {
    this.props.toggleDrawer()
    this.props.history.push('/notifications')
  }

  handlePreferences = () => {
    this.props.toggleDrawer()
    this.props.history.push('/preferences')
  }

  handleLogout = async () => {
    await this.props.updateUser(this.props.user._id, {
      lastActiveTime: Date.now(),
    })
    this.props.toggleDrawer()
    await new firebase.auth().signOut().then(async (user, error) => {
      if (!error) {
        await this.props.userLogout()
        this.setState({
          logout: true,
        })
        this.props.toggleDrawer()
        this.props.history.push('/')
      }
    })
    // this.refreshTimeout = setTimeout(() => {
    //   this.reset()
    // }, 2000)
  }

  reset = () => {
    this.setState({
      logout: false,
    })
  }

  componentWillUnmount() {
    this.refreshTimeout ? clearTimeout(this.refreshTimeout) : null
  }

  render() {
    const { classes, notificationsCount } = this.props
    const { logout } = this.state

    return (
      <>
        <List>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={1} onClick={() => this.handleDashboard()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <DashboardIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={2} onClick={() => this.handleIncoming()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <DownIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText>Incoming</ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={3} onClick={() => this.handleOutgoing()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <UpIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText>Outgoing</ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={5} onClick={() => this.handleUsers()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <UsersIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText>Users</ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={6} onClick={() => this.handlePreferences()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <PreferencesIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText>Preferences</ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={7} onClick={() => this.handleLogout()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <LogoutIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText>Signout</ListItemText>
            </ListItem>
          </Zoom>
        </List>
        <CustomizedSnackbars
          open={logout}
          message={'Logged out succesfully'}
          status={'success'}
        />
      </>
    )
  }
}

DrawerComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const notificationsCount = state.getIn([
    'Timeline',
    'notifications',
    'count',
    'success',
  ])
  return {
    user,
    notificationsCount,
  }
}

const actionsToProps = {
  userLogout: actions.userLogout,
  updateUser: actions.updateUser,
  saveActionState: userProfileActions.saveActionState,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(DrawerComponent)),
)
