import * as actions from '../../../actions/index'
import * as dashboardActions from '../../Timeline/actions'

import { List, Map } from 'immutable'

import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import CssBaseline from '@material-ui/core/CssBaseline'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import Drawer from '@material-ui/core/Drawer'
import DrawerComponent from '../../Drawer/components/Drawer'
import Fab from '@material-ui/core/Fab'
import Footer from '../../Footer/components/Footer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PropTypes from 'prop-types'
import React from 'react'
import Routes from '../../Routes'
import Search from '../../Search/components/Search'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import arrowIcon from '../../../../assets/arrow.svg'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import libIcon from '../../../../assets/lib.svg'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 110

const styles = theme => ({
  avatar: {
    margin: 10,
  },
  root: {
    flexGrow: 1,
    height: 'auto',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
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
    marginTop: 15,
    marginRight: 10,
  },
  appBar: {
    position: 'fixed',
    // marginLeft: drawerWidth,
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      width: '100%',
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    height: 50,
    width: 50,
  },
  //   toolbar: theme.mixins.toolbar,
  drawerPaper: {
    position: 'fixed !important',
    width: drawerWidth,
    overflow: 'auto',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      overflow: 'auto',
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  dragger: {
    width: '5px',
    cursor: 'ew-resize',
    padding: '4px 0 0',
    borderTop: '1px solid #ddd',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: '100',
  },
  appContent: theme.mixins.gutters({
    flex: '1 1 100%', // https://github.com/philipwalton/flexbugs#flexbug-17
    maxWidth: '100%', // https://github.com/philipwalton/flexbugs#flexbug-17
    padding: '80px 0px 0px 0px', // equal to AppBar height + 16px
    // Set the max content width for each breakpoint
    // Content will be centered in the space to the right/left of drawer
    // [theme.breakpoints.up("lg")]: {
    //   maxWidth: theme.breakpoints.values.lg
    // }
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
  }),
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
})

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      isResizing: false,
      lastDownX: 0,
      newWidth: {},
      logout: false,
    }
    this.refreshTimeout = null
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  handleMousedown = e => {
    this.setState({ isResizing: true, lastDownX: e.clientX })
  }

  handleMousemove = e => {
    // we don't want to do anything if we aren't resizing.
    if (!this.state.isResizing) {
      return
    }

    const offsetRight =
      document.body.offsetWidth - (e.clientX - document.body.offsetLeft)
    const minWidth = 50
    const maxWidth = 600
    if (offsetRight > minWidth && offsetRight < maxWidth) {
      this.setState({ newWidth: { width: offsetRight } })
    }
  }

  handleMouseup = e => {
    this.setState({ isResizing: false })
  }

  componentDidMount() {
    document.addEventListener('mousemove', e => this.handleMousemove(e))
    document.addEventListener('mouseup', e => this.handleMouseup(e))
    if (this.props.user) {
      this.props.user
        ? this.props.getNotificationsCount(this.props.user._id)
        : null
    }
  }

  // componentDidMount() {
  //   if (this.props.user) {
  //     this.props.user
  //       ? this.props.getNotificationsCount(this.props.user._id)
  //       : null
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user !== prevProps.user && this.props.user) {
      this.props.getNotificationsCount(this.props.user._id)
    }
  }

  // handleLogout = async () => {
  //   await new firebase.auth().signOut().then(async (user, error) => {
  //     if (!error) {
  //       await this.props.userLogout()
  //       this.setState({
  //         logout: true,
  //         isMobileMenuOpen: false,
  //       })
  //     }
  //   })
  //   this.refreshTimeout = setTimeout(() => {
  //     this.props.isAuthenticated(false)
  //     this.reset()
  //   }, 2000)
  // }

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

  handleSignin = () => {
    this.props.history.push('/signin')
  }

  showNotifications = () => {
    this.props.history.push('/notifications')
  }

  render() {
    const {
      classes,
      authenticated,
      user,
      createUserSuccess,
      createUserErrors,
      notificationsCount,
      container,
      theme,
    } = this.props
    const { showNotification, logout, isMobileMenuOpen } = this.state
    const mobileMenuId = 'primary-search-account-menu-mobile'
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={classes.appBar}>
          <Toolbar>
            {authenticated && (
              <IconButton
                color="primary"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Tooltip title="The Writenpost" aria-label="writenpost">
              <a href="/" className="cursor">
                <img src={libIcon} height={50} width={50} />
              </a>
            </Tooltip>
            <div className="col align-selft-start">
              <Search type="header" />
            </div>
            <div className={classes.grow} />
            {user && authenticated ? (
              <div className="row">
                <div className={classes.sectionDesktop}>
                  {/* <Tooltip title={user.userName} aria-label="Add">
                  <div className="row">
                    <Avatar
                      aria-haspopup="true"
                      alt={user.userName}
                      src={user.photoURL}
                      className={classes.avatar}
                    />
                    <Typography variant="span" className="profile-title">
                      {user.userName.substring(0, 15) + '...'}
                    </Typography>
                  </div>
                </Tooltip> */}
                </div>
                <Tooltip title="Notifications" aria-label="notification">
                  <Badge
                    showZero
                    badgeContent={
                      notificationsCount
                        ? formateNumber(notificationsCount.unReadCount)
                        : 0
                    }
                    classes={{ badge: classes.badge }}
                  >
                    <NotificationsIcon
                      className="cursor"
                      style={{ fontSize: 35, marginTop: 15, marginRight: 10 }}
                      onClick={() => this.showNotifications()}
                      color="primary"
                    />
                  </Badge>
                </Tooltip>
                <Tooltip title={user.userName} aria-label="Add">
                  <Avatar
                    aria-haspopup="true"
                    alt={user.userName}
                    src={user.photoURL}
                    className={classes.avatar}
                  />
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
            {/* {user && authenticated && (
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
            )} */}
            {/* {showNotification && <Notifications openMenu={showNotification} />} */}
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
          </Toolbar>
        </AppBar>
        {authenticated && (
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden mdUp>
              <Drawer
                containerStyle={{ transform: 'none' }}
                variant="temporary"
                anchor="left"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                PaperProps={{ style: this.state.newWidth }}
              >
                <div
                  id="dragger"
                  onMouseDown={event => {
                    this.handleMousedown(event)
                  }}
                  className={classes.dragger}
                />
                <DrawerComponent toggleDrawer={this.handleDrawerToggle} />
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                containerStyle={{ transform: 'none' }}
                variant="permanent"
                open
                anchor={'left'}
                classes={{
                  paper: classes.drawerPaper,
                }}
                PaperProps={{ style: this.state.newWidth }}
              >
                <div
                  id="dragger"
                  onMouseDown={event => {
                    this.handleMousedown(event)
                  }}
                  className={classes.dragger}
                />
                <DrawerComponent toggleDrawer={this.handleDrawerToggle} />
              </Drawer>
            </Hidden>
          </nav>
        )}
        <main className={classes.appContent}>
          <section className="body-container" style={{ minHeight: '100vh' }}>
            <Routes authenticated={authenticated} />
          </section>
          <section className="body-section">
            <Footer authenticated={authenticated} />
          </section>
        </main>
      </div>
    )
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.any,
  theme: PropTypes.object.isRequired,
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
  connect(
    mapStateToProps,
    actionsToProps,
  )(withStyles(styles)(ResponsiveDrawer)),
)
