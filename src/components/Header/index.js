import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Menu from '@material-ui/core/Menu'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Map, List } from 'immutable'
import Avatar from '@material-ui/core/Avatar'
import * as actions from '../../actions/index'
import CustomizedSnackbars from '../Snackbar/components/Snackbar'
import Fab from '@material-ui/core/Fab'
import Search from './components/Search'
import firebase from '../../firebase'
import Notifications from './components/Notifications'
import * as dashboardActions from '../Timeline/actions'
import libIcon from '../../../assets/lib.svg'
import arrowIcon from '../../../assets/arrow.svg'
import preferencesIcon from '../../../assets/preferences.svg'
import notificationsIcon from '../../../assets/notifications.svg'
import logoutIcon from '../../../assets/logout.svg'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import formateNumber from '../../util/formateNumber'

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
  margin: {
    margin: theme.spacing.unit,
  },
  badge: {
    color: '#fff',
    backgroundColor: '#f30404',
  },
})

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showNotification: false,
      isMobileMenuOpen: false,
      mobileMoreAnchorEl: null,
      logout: false,
    }
    this.refreshTimeout = null
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.user
        ? this.props.getNotificationsCount(this.props.user._id)
        : null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user !== prevProps.user && this.props.user) {
      this.props.getNotificationsCount(this.props.user._id)
    }
  }

  openPreferencesForm = () => {
    this.setState({
      isMobileMenuOpen: false,
    })
    this.props.history.push(`/preferences`)
  }

  handleLogout = async () => {
    await new firebase.auth().signOut().then(async (user, error) => {
      if (!error) {
        await this.props.userLogout()
        this.setState({
          logout: true,
          isMobileMenuOpen: false,
        })
      }
    })
    this.refreshTimeout = setTimeout(() => {
      this.props.isAuthenticated(false)
      this.reset()
    }, 2000)
  }

  showNotifications = () => {
    this.setState({
      isMobileMenuOpen: false,
    })
    this.props.history.push({
      pathname: '/notifications',
      state: { user: this.props.user },
    })
  }

  reset = () => {
    this.setState({
      logout: false,
    })
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

  componentWillUnmount() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }

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
        onClose={() => this.handleMobileMenuClose()}
        onKeyDown={e => this.handleListKeyDown(e)}
      >
        <ListItem className="cursor" onClick={() => this.showNotifications()}>
          Notifications
        </ListItem>
        <ListItem className="cursor" onClick={() => this.openPreferencesForm()}>
          Preferences
        </ListItem>

        <ListItem className="cursor" onClick={() => this.handleLogout()}>
          Logout
        </ListItem>
      </Menu>
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

  handleSignin = () => {
    this.props.history.push('/signin')
  }

  render() {
    const {
      classes,
      authenticated,
      user,
      createUserSuccess,
      createUserErrors,
      notificationsCount,
    } = this.props
    const { showNotification, logout } = this.state
    const mobileMenuId = 'primary-search-account-menu-mobile'
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <div className="row">
              <Tooltip title="The Writenpost" aria-label="writenpost">
                <a href="/" style={{ cursor: 'pointer' }}>
                  <img src={libIcon} height={50} width={50} />
                </a>
              </Tooltip>
            </div>

            {authenticated && !logout ? (
              <div className="col-lg-4 m-l-18">
                <Search type="header" />
              </div>
            ) : null}
            <div className={classes.grow} />
            {user && authenticated ? (
              <div className={classes.sectionDesktop}>
                <Tooltip title={user.userName} aria-label="Add">
                  <div className="row">
                    <Avatar
                      aria-haspopup="true"
                      alt={user.userName}
                      src={user.photoURL}
                      className={classes.avatar}
                    />
                    <Typography variant="span" className="profile-title">
                      {user.userName.substring(0, 12) + '...'}
                    </Typography>
                  </div>
                </Tooltip>
                <Tooltip title="Notifications" aria-label="notification">
                  <Fab
                    size="small"
                    onClick={() => this.showNotifications()}
                    aria-label="Add"
                    className={classes.margin}
                    color="primary"
                  >
                    <Badge
                      showZero
                      badgeContent={
                        notificationsCount
                          ? formateNumber(notificationsCount.unReadCount)
                          : 0
                      }
                      classes={{ badge: classes.badge }}
                    >
                      <Avatar
                        style={{ width: 30, height: 30 }}
                        src={notificationsIcon}
                      />
                    </Badge>
                  </Fab>
                </Tooltip>
                <Tooltip title="Add Preferences" aria-label="preferences">
                  <Fab
                    color="inherit"
                    size="small"
                    onClick={() => this.openPreferencesForm()}
                    aria-label="preferences"
                    className={classes.margin}
                    color="primary"
                  >
                    <Avatar src={preferencesIcon} />
                  </Fab>
                </Tooltip>

                <Tooltip title="Logout" aria-label="logout">
                  <Fab
                    size="small"
                    onClick={() => this.handleLogout()}
                    aria-label="logout"
                    className={classes.margin}
                    color="primary"
                  >
                    <Avatar
                      style={{ width: 25, height: 25 }}
                      src={logoutIcon}
                    />
                  </Fab>
                </Tooltip>
              </div>
            ) : (
              <Fab
                onClick={() => this.handleSignin()}
                size="small"
                color="primary"
                aria-label="add"
                variant="extended"
              >
                Sign In <Avatar src={arrowIcon} className="b-s b-w-arrow" />
              </Fab>
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
            {logout && (
              <CustomizedSnackbars
                open={true}
                message={'Logged out succesfully'}
                status={'success'}
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
  const usersLoading = state.getIn(['user', 'all', 'loading'], false)
  const createUserSuccess = state.getIn(['user', 'create', 'success'], Map())
  const createUserloading = state.getIn(['user', 'create', 'loading'], false)
  const createUserErrors = state.getIn(['user', 'create', 'errors'], Map())
  const notificationsCount = state.getIn([
    'Timeline',
    'notifications',
    'count',
    'success',
  ])

  return {
    user,
    usersLoading,
    createUserSuccess,
    createUserloading,
    createUserErrors,
    notificationsCount,
  }
}

const actionsToProps = {
  userLogout: actions.userLogout,
  getIncomingPosts: dashboardActions.getIncomingPosts,
  getNotificationsCount: dashboardActions.getNotificationsCount,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Header)),
)
