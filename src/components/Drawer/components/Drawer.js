import * as actions from '../../../actions/index'
import * as userProfileActions from '../../UserProfile/actions'

import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import DashboardIcon from '@material-ui/icons/LineStyle'
import DownIcon from '@material-ui/icons/GetApp'
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'
import IconButton from '@material-ui/core/IconButton'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LogoIcon from '@material-ui/icons/PostAdd'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import MyNetworkIcon from '@material-ui/icons/SupervisedUserCircleOutlined'
import PersonIcon from '@material-ui/icons/Person'
import PreferencesIcon from '@material-ui/icons/Tune'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import UpIcon from '@material-ui/icons/Publish'
import UsersIcon from '@material-ui/icons/PermIdentity'
import WorldIcon from '@material-ui/icons/Public'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import firebase from '../../../firebase'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const color = '#5383ff'
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
    // this.props.toggleDrawer()
    await new firebase.auth().signOut().then(async (user, error) => {
      if (!error) {
        await this.props.userLogout()
        this.setState({
          logout: true,
        })
        // this.props.toggleDrawer()
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

  handleFeed = () => {
    this.props.toggleDrawer()
    this.props.history.push('/timeline/feed')
    this.props.saveActionState('feed')
  }

  handleMemes = () => {
    this.props.toggleDrawer()
    this.props.history.push('/timeline/meme')
    this.props.saveActionState('meme')
  }

  handleMyNetwork = () => {
    this.props.toggleDrawer()
    this.props.history.push('/mynetwork')
    this.props.saveActionState('mynetwork')
  }

  closeNavBar = () => {
    this.props.toggleDrawer()
  }

  handleCountries = () => {
    this.props.toggleDrawer()
    this.props.history.push('/countries')
    this.props.saveActionState('countries')
  }

  render() {
    const { classes, notificationsCount } = this.props
    const { logout } = this.state

    return (
      <>
        <List>
          <div className="pt-2 pb-2">
            <Zoom in={true} timeout={2000}>
              <IconButton onClick={() => this.handleDashboard()}>
                <LogoIcon color="primary" />
              </IconButton>
            </Zoom>
            <Zoom in={true} timeout={2000}>
              <IconButton onClick={() => this.closeNavBar()}>
                <MenuOpenIcon color="primary" />
              </IconButton>
            </Zoom>
          </div>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={1} onClick={() => this.handleDashboard()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <DashboardIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText secondary={<b>Dashboard</b>}></ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={2} onClick={() => this.handleFeed()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <DynamicFeedIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText secondary={<b>Feed</b>}></ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={3} onClick={() => this.handleIncoming()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <DownIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText secondary={<b>Incoming</b>}></ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={4} onClick={() => this.handleOutgoing()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <UpIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText secondary={<b>Outgoing</b>}></ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={5} onClick={() => this.handleMemes()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <InsertEmoticonIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText secondary={<b>Memes</b>}></ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={5} onClick={() => this.handleMyNetwork()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <MyNetworkIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText secondary={<b>My N/W</b>}></ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={6} onClick={() => this.handleCountries()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <WorldIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText secondary={<b>Countries</b>}></ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={7} onClick={() => this.handleUsers()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <PersonIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText secondary={<b>Users</b>}></ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={8} onClick={() => this.handlePreferences()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <PreferencesIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText secondary={<b>Preferences</b>}></ListItemText>
            </ListItem>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <ListItem button key={9} onClick={() => this.handleLogout()}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>
                  <LogoutIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText secondary={<b>Signout</b>}></ListItemText>
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
