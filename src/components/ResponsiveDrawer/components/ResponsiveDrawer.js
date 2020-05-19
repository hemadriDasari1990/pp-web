import * as actions from '../../../actions/index'
import * as dashboardActions from '../../Timeline/actions'

import React, { Component, Suspense, lazy } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import DropDownIcon from '@material-ui/icons/ArrowDropDown'
import Fab from '@material-ui/core/Fab'
import FeedbackIcon from '@material-ui/icons/Feedback'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import List from '@material-ui/core/List'
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
import arrowIcon from '../../../../assets/arrow.svg'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { withRouter } from 'react-router-dom'

const CustomizedSnackbars = lazy(() =>
  import('../../Snackbar/components/Snackbar'),
)
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
      anchorEl: undefined,
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
    this.props.history.push('/notifications')
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  renderAccountMenu = () => {
    const { user, classes } = this.props
    return (
      <Menu
        style={{ marginTop: 45 }}
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
        <ListItem className="cursor pt-0 pb-0 pl-2 pr-2 menu-item">
          <ListItemAvatar>
            <Fab
              size="small"
              aria-label="Add"
              className={classes.margin}
              color="secondary"
            >
              <Avatar
                aria-haspopup="true"
                alt={user.userName}
                src={user.photoURL}
              />
            </Fab>
          </ListItemAvatar>
          <ListItemText
            primary={user.userName}
            secondary={
              <React.Fragment>
                <Typography
                  component="p"
                  variant="body2"
                  color="textPrimary"
                  className="menu-item-text"
                >
                  See your profile
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider />
        <ListItem className="cursor pt-0 pb-0 pl-2 pr-2 menu-item">
          <ListItemAvatar>
            <FeedbackIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Give feedback"
            secondary={
              <React.Fragment>
                <Typography
                  component="p"
                  variant="body2"
                  color="textPrimary"
                  className="menu-item-text"
                >
                  Help Us improve the new Writenpost
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem className="cursor pt-0 pb-0 pl-2 pr-2 menu-item">
          <ListItemAvatar>
            <PreferencesIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Preferences"
            secondary={
              <React.Fragment>
                <Typography
                  component="p"
                  variant="body2"
                  color="textPrimary"
                  className="menu-item-text"
                >
                  Set your preferences
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider />
        <ListItem className="cursor pt-0 pb-0 pl-2 pr-2 menu-item">
          <ListItemAvatar>
            <LogoutIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Log Out"
            secondary={
              <React.Fragment>
                <Typography
                  component="p"
                  variant="body2"
                  color="textPrimary"
                  className="menu-item-text"
                >
                  You'll be logged out
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </Menu>
    )
  }

  showAccountMenu = () => {
    this.setState({ open: !this.state.open, anchorEl: event.currentTarget })
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
    } = this.state
    const mobileMenuId = 'primary-search-account-menu-mobile'
    return (
      <Suspense fallback={<Loader />}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar className={classes.appBar}>
            <Toolbar>
              {authenticated && (
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  onClick={() => this.handleDrawerToggle()}
                  className={classes.navIconHide}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Tooltip title="The Writenpost" aria-label="writenpost">
                <a href="/" className="cursor">
                  <Avatar>
                    <LogoIcon color="secondary" />
                  </Avatar>
                </a>
              </Tooltip>
              <Grid lg={2} className="ml-2">
                <Search type="header" />
              </Grid>
              <div className={classes.grow} />
              {user && authenticated ? (
                <div className="row">
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
                          {user.userName.substring(0, 15) + '...'}
                        </Typography>
                      </div>
                    </Tooltip>
                  </div>
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
                        <NotificationsIcon color="secondary" />
                      </Badge>
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Account" aria-label="account">
                    <Fab
                      aria-controls="account-menu"
                      aria-haspopup="true"
                      size="small"
                      onClick={() => this.showAccountMenu()}
                      aria-label="Add"
                      className={classes.margin}
                      color="primary"
                    >
                      <DropDownIcon color="secondary" />
                    </Fab>
                  </Tooltip>
                  {this.renderAccountMenu()}
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
          <Toolbar id="back-to-top-anchor" />
          <main className={classes.appContent}>
            <Routes authenticated={authenticated} />
          </main>
          <ScrollTop {...this.props}>
            <Fab color="primary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </div>
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
