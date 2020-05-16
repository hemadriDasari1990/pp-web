import * as actions from '../../../actions/index'

import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import dashboardIcon from '../../../../assets/dashboard.svg'
import firebase from '../../../firebase'
import formateNumber from '../../../util/formateNumber'
import incomingIcon from '../../../../assets/incoming.svg'
import logoutIcon from '../../../../assets/logout.svg'
import outgoingIcon from '../../../../assets/outgoing.svg'
import preferencesIcon from '../../../../assets/preferences.svg'
import usersIcon from '../../../../assets/users.svg'
import { withStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import Zoom from '@material-ui/core/Zoom'

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
  }

  handleOutgoing = () => {
    this.props.toggleDrawer()
    this.props.history.push('/timeline/outgoing')
  }

  handleUsers = () => {
    this.props.toggleDrawer()
    this.props.history.push('/timeline/users')
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
                <Avatar className={classes.avatar} src={dashboardIcon} />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={2} onClick={() => this.handleIncoming()}>
              <ListItemIcon>
                <Avatar className={classes.avatar} src={incomingIcon} />
              </ListItemIcon>
              <ListItemText>Incoming</ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={3} onClick={() => this.handleOutgoing()}>
              <ListItemIcon>
                <Avatar className={classes.avatar} src={outgoingIcon} />
              </ListItemIcon>
              <ListItemText>Outgoing</ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={5} onClick={() => this.handleUsers()}>
              <ListItemIcon>
                <Avatar className={classes.avatar} src={usersIcon} />
              </ListItemIcon>
              <ListItemText>Users</ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={6} onClick={() => this.handlePreferences()}>
              <ListItemIcon>
                <Avatar className={classes.avatar1} src={preferencesIcon} />
              </ListItemIcon>
              <ListItemText>Preferences</ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={7} onClick={() => this.handleLogout()}>
              <ListItemIcon>
                <Avatar className={classes.avatar1} src={logoutIcon} />
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
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(DrawerComponent)),
)
