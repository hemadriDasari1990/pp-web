import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import Tooltip from '@material-ui/core/Tooltip'
import Google from '../Social/components/Google'
import Facebook from '../Social/components/Facebook'
import Linkedin from '../Social/components/Linkedin'
import Twitter from '../Social/components/Twitter'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import { Map, List, fromJS } from 'immutable'
import Avatar from '@material-ui/core/Avatar'
import * as actions from '../../actions/index'
import CustomizedSnackbars from '../Snackbar/components/Snackbar'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Post from '../Post/components/Post'
import Preferences from '../Post/components/Preferences'
import ResposiveDialog from '../Dialog/components/ResposiveDialog'
import Search from './components/Search'
import Logout from '../Logout/components/Logout'
import PowerOff from '@material-ui/icons/PowerSettingsNew'
import Adjust from '@material-ui/icons/Adjust'
import TripOrigin from '@material-ui/icons/TripOrigin'
import firebase from '../../firebase'
import Notifications from './components/Notifications'
import * as userProfileActions from '../UserProfile/actions'
import logo from '../../../assets/peoples-post1.png'

const styles = theme => ({
  avatar: {
    margin: 10,
  },
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    marginRight: 5,
  },
  margin: {
    margin: theme.spacing.unit,
    backgroundColor: '#616b8f',
  },
  search: {
    marginLeft: 40,
  },
  badge: {
    color: '#fff',
  },
})

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPost: false,
      showPreferences: false,
      showNotification: false,
      notifications: 0,
      isMobileMenuOpen: false,
      mobileMoreAnchorEl: null,
      isMobileMenuOpen: false,
    }
  }

  async componentDidMount() {
    if (this.props.authenticated) {
      this.props.getUsers()
    }
  }

  async componentWillReceiveProps(nextProps) {
    this.props.user
      ? await this.props.getPostsByUser(this.props.user.uid).then(async res => {
          this.setState({
            notifications: await res.data.filter(
              post => !post.approved && !post.rejected,
            ).length,
          })
        })
      : null
  }

  openPostForm = () => {
    this.setState({
      showPost: !this.state.showPost,
      isMobileMenuOpen: false,
    })
  }

  openPreferencesForm = () => {
    this.setState({
      showPreferences: !this.state.showPreferences,
      isMobileMenuOpen: false,
    })
  }

  handleLogout = async () => {
    await new firebase.auth().signOut().then(async (user, error) => {
      await this.props.userLogout()
    })
    this.setState({
      isMobileMenuOpen: false,
    })
    this.props.history.push('/')
  }

  showNotifications = () => {
    // this.setState({
    //   showNotification: !this.state.showNotification
    // });
    this.setState({
      isMobileMenuOpen: false,
    })
    this.props.history.push({
      pathname: '/notifications',
      state: { user: this.props.user },
    })
    // window.location.reload();
  }

  refresh = () => {
    this.props.history.push('/')
  }

  createPost = newPost => {}

  renderMobileMenu = () => {
    const mobileMenuId = 'primary-search-account-menu-mobile'
    return (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={this.state.isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem></MenuItem>
        <MenuItem onClick={() => this.openPostForm()}>
          <AddIcon color="secondary" /> Create Post
        </MenuItem>
        <MenuItem onClick={() => this.showNotifications()}>
          <Badge
            showZero
            badgeContent={
              this.state.notifications ? this.state.notifications : 0
            }
          >
            <NotificationsIcon color="secondary" />
          </Badge>
          Notifications
        </MenuItem>
        <MenuItem onClick={() => this.openPreferencesForm()}>
          <Adjust color="secondary" />
          Preferences
        </MenuItem>

        <MenuItem onClick={() => this.handleLogout()}>
          <PowerOff color="secondary" />
          Logout
        </MenuItem>
      </Menu>
    )
  }

  handleMobileMenuClose = () => {
    this.setState({
      mobileMoreAnchorEl: null,
    })
  }

  handleMobileMenuOpen = event => {
    this.setState({
      mobileMoreAnchorEl: event.currentTarget,
      isMobileMenuOpen: !this.state.isMobileMenuOpen,
    })
  }

  render() {
    const {
      classes,
      authenticated,
      user,
      users,
      createUserSuccess,
      createUserErrors,
    } = this.props
    const {
      showPost,
      showPreferences,
      showNotification,
      notifications,
    } = this.state
    const mobileMenuId = 'primary-search-account-menu-mobile'
    return (
      <div className={classes.root}>
        <AppBar style={{ backgroundColor: '#ffffff' }} position="fixed">
          <Toolbar>
            <a href="/">
              <img src={logo} height="60" width="60" />
            </a>

            {user && users && users.size && (
              <div className={classes.search}>
                <Search
                  users={users}
                  profile={true}
                  post={true}
                  createPost={this.createPost}
                />
              </div>
            )}
            <div className={classes.grow} />
            {user && authenticated ? (
              <div className={classes.sectionDesktop}>
                <Tooltip title="Create Post" aria-label="create">
                  <Fab
                    size="small"
                    onClick={() => this.openPostForm()}
                    aria-label="Add"
                    className={classes.margin}
                  >
                    <AddIcon color="secondary" />
                  </Fab>
                </Tooltip>
                <Tooltip title="Notifications" aria-label="notification">
                  <Fab
                    size="small"
                    onClick={() => this.showNotifications()}
                    aria-label="Add"
                    className={classes.margin}
                  >
                    <Badge
                      showZero
                      badgeContent={notifications ? notifications : 0}
                    >
                      <NotificationsIcon color="secondary" />
                    </Badge>
                  </Fab>
                </Tooltip>
                <Tooltip title="Add Preferences" aria-label="preferences">
                  <Fab
                    size="small"
                    onClick={() => this.openPreferencesForm()}
                    aria-label="preferences"
                    className={classes.margin}
                  >
                    <Adjust color="secondary" />
                  </Fab>
                </Tooltip>
                <Tooltip title={user.displayName} aria-label="Add">
                  <Avatar
                    aria-haspopup="true"
                    alt="Avatar not available"
                    src={user.photoURL}
                    className={classes.avatar}
                    onClick={this.handleProfileMenuOpen}
                  />
                </Tooltip>
                <Tooltip title="Logout" aria-label="logout">
                  <Fab
                    size="small"
                    onClick={() => this.handleLogout()}
                    aria-label="logout"
                    className={classes.margin}
                  >
                    <PowerOff color="secondary" />
                  </Fab>
                </Tooltip>
                {/*<IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                >
                  <AccountCircle />
                </IconButton>*/}
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-5 col-md-2 col-sm-4 col-xs-6">
                  <Google />
                </div>
                <div className="col-lg-5 col-md-2 col-sm-4 col-xs-6">
                  <Facebook />
                </div>
              </div>
            )}
            {user && authenticated && (
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={e => this.handleMobileMenuOpen(e)}
                  color="inherit"
                >
                  <MoreIcon color="primary" />
                </IconButton>
              </div>
            )}
            {showNotification && <Notifications openMenu={showNotification} />}
            {showPost && (
              <Post
                users={users}
                user={user}
                openPostForm={this.openPostForm}
              />
            )}
            {showPreferences && (
              <Preferences
                openPreferencesForm={this.openPreferencesForm}
                user={user}
              />
            )}
            {createUserSuccess &&
              createUserSuccess.size > 0 &&
              createUserSuccess.get('message') && (
                <CustomizedSnackbars
                  open={true}
                  message={createUserSuccess.get('message')}
                  status={'success'}
                />
              )}
            {createUserErrors &&
              createUserErrors.size > 0 &&
              createUserErrors.get('message') && (
                <CustomizedSnackbars
                  open={true}
                  message={createUserErrors.get('message')}
                  status={'error'}
                />
              )}
          </Toolbar>
        </AppBar>
        {this.renderMobileMenu()}
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const users = state.getIn(['user', 'all', 'success'], Map())
  const usersLoading = state.getIn(['user', 'all', 'loading'], false)
  const createUserSuccess = state.getIn(['user', 'create', 'success'], Map())
  const createUserloading = state.getIn(['user', 'create', 'loading'], false)
  const createUserErrors = state.getIn(['user', 'create', 'errors'], Map())
  return {
    user,
    users,
    usersLoading,
    createUserSuccess,
    createUserloading,
    createUserErrors,
  }
}

const actionsToProps = {
  getUsers: actions.getUsers,
  userLogout: actions.userLogout,
  getPostsByUser: userProfileActions.getPostsByUser,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Header)),
)
