import * as actions from '../actions/index'

import React, { Component, Suspense, lazy } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Loader from './Loader/components/Loader'
import { Map } from 'immutable'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import firebase from '../firebase/index'
import theme from './theme'
import { withStyles } from '@material-ui/core/styles'

const CustomizedSnackbars = lazy(() => import('./Snackbar/components/Snackbar'))
const ResponsiveDrawer = lazy(() =>
  import('./ResponsiveDrawer/components/ResponsiveDrawer'),
)
const About = lazy(() => import('./Footer/components/About'))
const Advice = lazy(() => import('./Home/components/Advice'))
const Careers = lazy(() => import('./Footer/components/careers'))
const Cons = lazy(() => import('./Home/components/Cons'))
const Developers = lazy(() => import('./Footer/components/developers'))
const Feedback = lazy(() => import('./Footer/components/Feedback'))
const Home = lazy(() => import('./Home/components/Home'))
const Location = lazy(() => import('./Footer/components/Location'))
const PageNotFound = lazy(() => import('./PageNotFound/components/index'))
const Pros = lazy(() => import('./Home/components/Pros'))
const Signin = lazy(() => import('./Signin/components/Signin'))
const Footer = lazy(() => import('./Footer/components/Footer'))

const styles = theme => ({})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isDisconnected: false,
      showSnackbar: false,
      error: false,
    }
  }

  async componentDidMount() {
    try {
      // this.getGeoLocation()
      await this.whenUserLevesThePage()
      await this.handleConnectionChange()
      await window.addEventListener('online', this.handleConnectionChange)
      await window.addEventListener('offline', this.handleConnectionChange)
      await new firebase.auth().onAuthStateChanged(async (user, err) => {
        if (user) {
          await this.props
            .getUser(user.providerData[0].uid)
            .then(async u => {
              if (u && u.data && u.data.user) {
                await this.props.updateUser(u.data.user._id, {
                  lastActiveTime: Date.now(),
                })
                await this.props.storeUser(u.data.user)
                await this.props.getUsers(u.data.user._id, '')
                this.setState({
                  showSnackbar: !this.state.showSnackbar,
                  error: false,
                  loading: false,
                })
                this.timer = setTimeout(() => {
                  this.props.history.push('/dashboard')
                }, 1000)
              } else {
                this.props.storeUser(null)
                this.props.history.push('/')
              }
            })
            .catch(err => {
              this.setState({
                loading: false,
                error: !this.state.error,
                showSnackbar: !this.state.showSnackbar,
              })
            })
        }
        if (err) {
          this.setState({
            loading: false,
            error: !this.state.error,
            showSnackbar: !this.state.showSnackbar,
          })
        }
      })
      this.setState({
        loading: false,
      })
    } catch (err) {
      this.setState({
        loading: false,
        error: !this.state.error,
        showSnackbar: !this.state.showSnackbar,
      })
    }
  }

  getGeoLocation = () => {
    // if (window.navigator.geolocation) {
    //   console.log("test123", navigator.geolocation.getCurrentPosition())
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     console.log("test", position.coords.latitude, position.coords.longitude)
    //   })
    // }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.user != props.user) {
  //     return {
  //       user: props.user,
  //     }
  //   }
  //   return null;
  // }

  whenUserLevesThePage() {
    window.onbeforeunload = async () => {
      await this.props.updateUser(this.props.user._id, {
        lastActiveTime: Date.now(),
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleConnectionChange)
    window.removeEventListener('offline', this.handleConnectionChange)
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline'
    if (condition === 'online') {
      this.setState({ isDisconnected: false }, () => {})
    } else {
      this.setState({ isDisconnected: true })
    }
  }

  render() {
    const { loading, isDisconnected, showSnackbar, error } = this.state
    const {
      user,
      classes,
      createOrUpdateUserSuccess,
      createOrUpdateUserLoading,
      createOrUpdateUserErrors,
    } = this.props
    const authenticated = user ? true : false
    console.log('App Called')
    return (
      <React.Fragment>
        <Suspense fallback={<Loader />}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Container fixed className="pl-0 pr-0 body-content">
              {isDisconnected && (
                <CustomizedSnackbars
                  open={true}
                  message="You are not connected to the internet"
                  status="warning"
                />
              )}
              {!error &&
                createOrUpdateUserSuccess &&
                createOrUpdateUserSuccess.size > 0 &&
                createOrUpdateUserSuccess.get('message') && (
                  <CustomizedSnackbars
                    open={showSnackbar}
                    message={createOrUpdateUserSuccess.get('message')}
                    status={'success'}
                  />
                )}
              {!error &&
                createOrUpdateUserErrors &&
                createOrUpdateUserErrors.size > 0 &&
                createOrUpdateUserErrors.get('message') && (
                  <CustomizedSnackbars
                    open={showSnackbar}
                    message={createOrUpdateUserErrors.get('message')}
                    status={'error'}
                  />
                )}
              {error && (
                <CustomizedSnackbars
                  open={showSnackbar}
                  message="A network error (such as timeout, interrupted connection or unreachable host) has occurred. Please try again"
                  status={'error'}
                />
              )}
              <ResponsiveDrawer
                loading={loading}
                authenticated={authenticated}
                theme={{ direction: 'rtl' }}
              />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/feedback" component={Feedback} />
                <Route path="/location" component={Location} />
                <Route path="/developers" component={Developers} />
                <Route path="/careers" component={Careers} />
                <Route path="/pros" component={Pros} />
                <Route path="/cons" component={Cons} />
                <Route path="/advice" component={Advice} />
                <Route path="/signin" component={Signin} />
                {/* <Route path="*" component={PageNotFound} /> */}
              </Switch>
            </Container>
            {!authenticated && (
              <section className="body-section">
                <Footer authenticated={authenticated} />
              </section>
            )}
          </MuiThemeProvider>
        </Suspense>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const createOrUpdateUserSuccess = state.getIn(
    ['user', 'create-or-update', 'success'],
    Map(),
  )
  const createOrUpdateUserLoading = state.getIn(
    ['user', 'create-or-update', 'loading'],
    false,
  )
  const createOrUpdateUserErrors = state.getIn(
    ['user', 'create-or-update', 'errors'],
    Map(),
  )
  return {
    user,
    createOrUpdateUserSuccess,
    createOrUpdateUserLoading,
    createOrUpdateUserErrors,
  }
}

const actionsToProps = {
  storeUser: actions.storeUser,
  getUsers: actions.getUsers,
  getUser: actions.getUser,
  updateUser: actions.updateUser,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(App)),
)
