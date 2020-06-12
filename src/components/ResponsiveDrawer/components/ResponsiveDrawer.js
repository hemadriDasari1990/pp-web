import * as actions from '../../../actions/index'
import * as dashboardActions from '../../Timeline/actions'

import React, { Component, Suspense, lazy } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import ArrowIcon from '@material-ui/icons/ArrowForward'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import DropDownIcon from '@material-ui/icons/ArrowDropDown'
import Fab from '@material-ui/core/Fab'
import FeedbackIcon from '@material-ui/icons/Feedback'
import Grid from '@material-ui/core/Grid'
import HelpIcon from '@material-ui/icons/Help'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import ListIcon from '@material-ui/icons/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import LogoIcon from '@material-ui/icons/PostAdd'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PreferencesIcon from '@material-ui/icons/Tune'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import firebase from '../../../firebase'
import formateNumber from '../../../util/formateNumber'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { withRouter } from 'react-router-dom'

const CustomizedSnackbars = lazy(() =>
  import('../../Snackbar/components/Snackbar'),
)

const DrawerRight = lazy(() => import('./DrawerRight'))
const DrawerComponent = lazy(() => import('../../Drawer/components/Drawer'))
const Routes = lazy(() => import('../../Routes'))
const Search = lazy(() => import('../../Search/components/Search'))

const drawerWidth = 110

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const styles = theme => ({
  avatar: {
    margin: 12,
  },
  mediumAvatar: {
    width: 110,
    height: 110,
    margin: 'auto',
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
  },
  appBar: {
    backgroundColor: '#5383ff !important',
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
    backgroundColor: '#f0f2f5',
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
    padding: '80px 0px 0px 0px !important', // equal to AppBar height + 16px
    // Set the max content width for each breakpoint
    // Content will be centered in the space to the right/left of drawer
    // [theme.breakpoints.up("lg")]: {
    //   maxWidth: theme.breakpoints.values.lg
    // }
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    overflowY: 'scroll',
    '-webkit-overflow-scrolling': 'touch',
    height: '100%',
    position: 'relative',
  }),
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  icon: {
    width: '1.3em',
    height: '1.3em',
  },
})

class ResponsiveDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      isResizing: false,
      lastDownX: 0,
      newWidth: {},
      logout: false,
      scrolling: false,
      scrollTop: 0,
      open: false,
      anchorEl: null,
      rightDrawerOpen: false,
      drawerType: '',
      profileInfo: false,
    }
    this.refreshTimeout = null
  }

  onScroll = e => {
    this.setState(prevState => ({
      scrollTop: e.target.documentElement.scrollTop,
      scrolling: e.target.documentElement.scrollTop > prevState.scrollTop,
    }))
  }

  shouldComponentUpdte(props, state) {
    return this.state.scrolling !== state.scrolling
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
    window.addEventListener('scroll', this.onScroll)
    document.addEventListener('mousemove', e => this.handleMousemove(e))
    document.addEventListener('mouseup', e => this.handleMouseup(e))
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
    window.addEventListener('scroll', this.onScroll)
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }
  }

  handleSignin = () => {
    this.props.history.push('/signin')
  }

  showNotifications = () => {
    // this.props.history.push('/notifications')
    this.setState({
      drawerType: 'notifications',
      rightDrawerOpen: !this.state.rightDrawerOpen,
    })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  viewProfile = () => {
    this.props.user
      ? this.props.history.push(`/profile/${this.props.user._id}`)
      : null
    this.handleAccountMenu()
  }

  viewFeedback = () => {
    this.props.user ? this.props.history.push(`/feedback`) : null
    this.handleAccountMenu()
  }

  viewPreferences = () => {
    this.props.user ? this.props.history.push(`/preferences`) : null
    this.handleAccountMenu()
  }

  handleLogout = async () => {
    await this.props.updateUser(this.props.user._id, {
      lastActiveTime: Date.now(),
    })
    this.handleDrawerToggle()
    await new firebase.auth().signOut().then(async (user, error) => {
      if (!error) {
        await this.props.userLogout()
        this.setState({
          logout: true,
        })
        this.handleDrawerToggle()
        this.props.history.push('/')
      }
    })
    this.handleAccountMenu()
  }

  openProfileInfo = () => {
    this.setState({
      drawerType: 'profile-info',
      rightDrawerOpen: !this.state.rightDrawerOpen,
    })
  }

  renderAccountMenu = () => {
    const { user, classes } = this.props
    return (
      <Menu
        className="mt-5"
        id="account-menu"
        open={this.state.open}
        onClose={this.handleClose}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        getContentAnchorEl={null}
        TransitionComponent={Zoom}
      >
        <div className="text-center mt-3">
          <Zoom in={open} timeout={2000}>
            <Avatar
              alt={user.userName}
              src={user.photoURL}
              className={classes.mediumAvatar}
            />
          </Zoom>
          <h6 className="mt-3 mb-2">{user.userName}</h6>
          <span
            onClick={() => this.viewProfile()}
            className="cursor text-black-50"
          >
            See your profile
          </span>
        </div>
        <Divider />
        <ListItem
          className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item"
          onClick={() => this.viewFeedback()}
        >
          <ListItemAvatar>
            <IconButton>
              <FeedbackIcon />
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            primary={<b>Give feedback</b>}
            secondary="Help Us improve the new Writenpost"
          />
        </ListItem>
        <ListItem
          className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item"
          onClick={() => this.viewPreferences()}
        >
          <ListItemAvatar>
            <IconButton>
              <PreferencesIcon />
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            primary={<b>Preferences</b>}
            secondary="Set your preferences"
          />
        </ListItem>
        <Divider />
        <ListItem
          className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item"
          onClick={() => this.handleLogout()}
        >
          <ListItemAvatar>
            <IconButton>
              <LogoutIcon />
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            primary={<b>Log Out</b>}
            secondary="You'll be logged out"
          />
        </ListItem>
      </Menu>
    )
  }

  handleAccountMenu = () => {
    this.setState({ open: !this.state.open, anchorEl: event.currentTarget })
  }

  refreshDashboard = () => {
    this.props.history.push('/')
  }

  handleRightDrawerClose = () => {
    this.setState({
      rightDrawerOpen: false,
    })
  }

  openHelp = () => {
    this.setState({
      drawerType: 'help',
      rightDrawerOpen: !this.state.rightDrawerOpen,
    })
  }

  render() {
    const {
      classes,
      authenticated,
      user,
      notificationsCount,
      container,
      theme,
      loading,
    } = this.props
    const {
      showNotification,
      logout,
      isMobileMenuOpen,
      scrolling,
      open,
      anchorEl,
      rightDrawerOpen,
      drawerType,
      profileInfo,
    } = this.state
    const mobileMenuId = 'primary-search-account-menu-mobile'
    return (
      <Suspense fallback={<Loader />}>
        <Container fixed className="pl-0 pr-0">
          <div className={classes.root}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                {authenticated && (
                  <IconButton
                    aria-label="open drawer"
                    onClick={() => this.handleDrawerToggle()}
                    className={classes.navIconHide}
                  >
                    <MenuIcon color="secondary" />
                  </IconButton>
                )}
                <Tooltip
                  className={classes.sectionDesktop}
                  title="The Writenpost"
                  aria-label="writenpost"
                >
                  <IconButton
                    className="mr-2"
                    onClick={() => this.refreshDashboard()}
                  >
                    <LogoIcon color="secondary" className={classes.icon} />
                  </IconButton>
                </Tooltip>
                {authenticated && (
                  <Grid lg={3} className={classes.sectionDesktop}>
                    <Search type="header" id="profile-drop-down" />
                  </Grid>
                )}

                <div className={classes.grow} />
                {user && authenticated ? (
                  <div className="row">
                    <Tooltip title="Notifications" aria-label="notification">
                      <IconButton
                        onClick={() => this.showNotifications()}
                        aria-label="Add"
                        color="default"
                        className={classes.margin}
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
                          <NotificationsIcon
                            color="secondary"
                            className={classes.icon}
                          />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Help" aria-label="help">
                      <IconButton
                        onClick={() => this.openHelp()}
                        aria-label="Add"
                        color="default"
                        className={classes.margin}
                      >
                        <ContactSupportIcon
                          color="secondary"
                          className={classes.icon}
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={user.userName} aria-label={user.userName}>
                      <IconButton aria-label="Add" color="default" size="small">
                        <Avatar
                          aria-label="Add"
                          aria-controls="account-menu"
                          aria-haspopup="true"
                          aria-haspopup="true"
                          alt={user.userName}
                          src={user.photoURL}
                          className={classes.avatar}
                          onClick={() => this.handleAccountMenu()}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Profile Info" aria-label="profile-info">
                      <IconButton
                        onClick={() => this.openProfileInfo()}
                        aria-label="Add"
                        color="default"
                        className={classes.margin}
                      >
                        <ListIcon color="secondary" className={classes.icon} />
                      </IconButton>
                    </Tooltip>
                    {this.renderAccountMenu()}
                  </div>
                ) : (
                  <Button
                    onClick={() => this.handleSignin()}
                    size="small"
                    aria-label="add"
                    variant="outlinedSecondary"
                  >
                    Sign In <ArrowIcon color="secondary" />
                  </Button>
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
                {rightDrawerOpen && (
                  <DrawerRight
                    open={rightDrawerOpen}
                    type={drawerType}
                    handleDrawerClose={this.handleRightDrawerClose}
                  />
                )}
                <Hidden mdUp>
                  <Drawer
                    containerstyle={{ transform: 'none' }}
                    variant="temporary"
                    anchor="left"
                    open={this.state.mobileOpen}
                    onClose={() => this.handleDrawerToggle()}
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
                    <DrawerComponent
                      toggleDrawer={() => this.handleDrawerToggle()}
                    />
                  </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Drawer
                    containerstyle={{ transform: 'none' }}
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
            <Toolbar disableGutters={true} />
            <main className={classes.appContent}>
              <Routes authenticated={authenticated} />
            </main>
            <ScrollTop {...this.props}>
              <Fab color="primary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollTop>
          </div>
        </Container>
      </Suspense>
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
  const notificationsCount = state.getIn([
    'Timeline',
    'notifications',
    'count',
    'success',
  ])

  return {
    user,
    usersLoading,
    notificationsCount,
  }
}

const actionsToProps = {
  userLogout: actions.userLogout,
  updateUser: actions.updateUser,
  getIncomingPosts: dashboardActions.getIncomingPosts,
  getNotificationsCount: dashboardActions.getNotificationsCount,
}

export default withRouter(
  connect(
    mapStateToProps,
    actionsToProps,
  )(withStyles(styles)(ResponsiveDrawer)),
)

function ScrollTop(props) {
  const { children, window } = props
  const classes = useStyles()
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    )

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  )
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}
