import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { withStyles } from '@material-ui/core/styles'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MenuIcon from '@material-ui/icons/Menu'
import Tooltip from '@material-ui/core/Tooltip'
import Google from '../Social/components/Google'
import Facebook from '../Social/components/Facebook'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Map } from 'immutable'
import Avatar from '@material-ui/core/Avatar'
import * as actions from '../../actions/index'
import CustomizedSnackbars from '../Snackbar/components/Snackbar'
import Fab from '@material-ui/core/Fab'
import Search from './components/Search'
import PowerOff from '@material-ui/icons/PowerSettingsNew'
import Adjust from '@material-ui/icons/Adjust'
import firebase from '../../firebase'
import Notifications from './components/Notifications'
import * as dashboardActions from '../Dashboard/actions'
import libIcon from '../../../assets/lib.svg'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

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
    backgroundColor: '#2a7fff',
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
      showNotification: false,
      isMobileMenuOpen: false,
      mobileMoreAnchorEl: null,
      notifications: 0,
      logout: false,
    }
  }

  async componentDidMount() {
    if (this.props.user) {
      await this.props.getUsers()
      this.props.user
        ? await this.props
            .getNotificationsCount(this.props.user._id)
            .then(res => {
              this.setState({
                notifications: res.data.count,
              })
            })
        : null
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      await this.props.getUsers()
      this.props.user
        ? await this.props
            .getNotificationsCount(this.props.user._id)
            .then(res => {
              this.setState({
                notifications: res.data.count,
              })
            })
        : null
    }
  }

  openPreferencesForm = () => {
    this.setState({
      isMobileMenuOpen: false,
    })
    this.props.history.push(`${this.props.user.uid}/preferences`)
  }

  handleLogout = async () => {
    await new firebase.auth().signOut().then(async (user, error) => {
      await this.props.userLogout()
      this.setState({
        logout: true,
      })
    })
    this.setState({
      isMobileMenuOpen: false,
    })
    this.refresh()
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

  handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault()
      this.setState({
        isMobileMenuOpen: false,
      })
    }
  }

  renderMobileMenu = () => {
    const mobileMenuId = 'primary-search-account-menu-mobile'
    return (
      <ClickAwayListener onClickAway={this.handleMobileMenuClose}>
        <Menu
          anchorEl={this.state.mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.isMobileMenuOpen}
          onClose={this.handleMobileMenuClose}
          onKeyDown={this.handleListKeyDown}
        >
          <MenuItem onClick={() => this.showNotifications()}>
            Notifications
          </MenuItem>
          <MenuItem onClick={() => this.openPreferencesForm()}>
            Preferences
          </MenuItem>

          <MenuItem onClick={() => this.handleLogout()}>Logout</MenuItem>
        </Menu>
      </ClickAwayListener>
    )
  }

  handleMobileMenuClose = () => {
    this.setState({
      mobileMoreAnchorEl: null,
      isMobileMenuOpen: false,
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
    const { showNotification, notifications, logout } = this.state
    const mobileMenuId = 'primary-search-account-menu-mobile'
    return (
      <div className={classes.root}>
        <AppBar style={{ backgroundColor: '#ffffff' }} position="fixed">
          <Toolbar>
            <div className="row">
              <Tooltip title="The Writenpost" aria-label="writenpost">
                <a href="/" style={{ cursor: 'pointer' }}>
                  <img src={libIcon} height={50} width={50} />
                </a>
              </Tooltip>
            </div>

            {users && users.size && authenticated && !logout ? (
              <div className={classes.search}>
                <Search
                  users={users}
                  profile={true}
                  post={true}
                  createPost={this.createPost}
                />
              </div>
            ) : null}
            <div className={classes.grow} />
            {user && authenticated ? (
              <div className={classes.sectionDesktop}>
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
                <Tooltip title={user.userName} aria-label="Add">
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
              </div>
            ) : (
              <div className="row">
                <div style={{ marginRight: 10 }}>
                  <Google isAuthenticated={this.props.isAuthenticated} />
                </div>
                <div style={{ marginRight: 10 }}>
                  <Facebook isAuthenticated={this.props.isAuthenticated} />
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
                  <MenuIcon color="primary" fontSize="large" />
                </IconButton>
              </div>
            )}
            {showNotification && <Notifications openMenu={showNotification} />}
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
            {this.renderMobileMenu()}
          </Toolbar>
        </AppBar>
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
  // const notifications = state.getIn(['`Dashboard`', 'notifications', 'çount', 'success'], Map())

  return {
    user,
    users,
    usersLoading,
    createUserSuccess,
    createUserloading,
    createUserErrors,
    // notifications: notifications.size > 0 ? notifications.count : 0
  }
}

const actionsToProps = {
  getUsers: actions.getUsers,
  userLogout: actions.userLogout,
  getPostsByUser: dashboardActions.getPostsByUser,
  getNotificationsCount: dashboardActions.getNotificationsCount,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Header)),
)
