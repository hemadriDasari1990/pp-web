import React, { Component } from 'react'
import Home from './Home/components/Home'
import { connect } from 'react-redux'
import {
  BrowserRouter,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import Timeline from './Timeline/components/Timeline'
import * as actions from '../actions/index'
import Header from './Header/index'
import Footer from './Footer/components/Footer'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import firebase from '../firebase/index'
import theme from './theme'
import UserProfile from './UserProfile/components/Dashboard'
import Notifications from './Notifications/components/Notification'
import PageNotFound from './PageNotFound/components/index'
import About from './Footer/components/About'
import Feedback from './Footer/components/Feedback'
import Location from './Footer/components/Location'
import Developers from './Footer/components/developers'
import Careers from './Footer/components/careers'
import Reactions from './Reactions/components/Reactions'
import Preferences from './Post/components/Preferences'
import Pros from './Home/components/Pros'
import Cons from './Home/components/Cons'
import Advice from './Home/components/Advice'
import Signin from './Signin/components/Signin'
import Dashboard from './Dashboard/components/Dashboard'
import Button from '@material-ui/core/Button'
import PostDetails from './Timeline/components/PostDetails'
import Loader from './Loader/components/Loader'
import CustomizedSnackbars from './Snackbar/components/Snackbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      user: {},
      loading: false,
    }
  }

  async componentDidMount() {
    await new firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loading: true,
      })
      if (user) {
        this.props.getUser(user.providerData[0].uid).then(u => {
          if (u && u.data && u.data.user) {
            this.setState({
              authenticated: true,
              user: u.data.user,
            })
            this.props.storeUser(u.data.user)
            this.props.getUsers(u.data.user._id, '')
            this.props.history.push('/dashboard')
          } else {
            this.setState({
              authenticated: false,
            })
            this.props.storeUser(null)
            this.props.history.push('/')
          }
        })
      } else {
        this.setState({
          authenticated: false,
        })
      }
      this.setState({
        loading: false,
      })
    })
  }

  isAuthenticated = flag => {
    if (flag && this.state.user) {
      this.props.getUsers(this.state.user._id, '')
    }
    this.setState({
      authenticated: flag,
      loading: flag,
    })
  }

  componentWillUnMount() {
    this.unSubscribe()
  }

  handleSignin = () => {
    this.props.history.push('/signin')
  }

  render() {
    const { authenticated, user, loading } = this.state
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Header
            authenticated={authenticated}
            isAuthenticated={this.isAuthenticated}
          />
          <section className="home-background">
            <div className="auto-container">
              {!loading && (
                <Switch>
                  <Route path="/" exact component={Home} />
                  <PrivateRoute
                    authenticated={authenticated}
                    path="/incoming"
                    component={() => <Timeline />}
                  />
                  <PrivateRoute
                    authenticated={authenticated}
                    path="/dashboard"
                    component={() => <Dashboard />}
                  />
                  <PrivateRoute
                    authenticated={authenticated}
                    path="/outgoing"
                    component={() => <Timeline />}
                  />
                  <PrivateRoute
                    authenticated={authenticated}
                    path="/profile/:id"
                    component={() => <UserProfile />}
                  />
                  <PrivateRoute
                    authenticated={authenticated}
                    path="/notifications"
                    component={() => <Notifications user={user} />}
                  />
                  <PrivateRoute
                    authenticated={authenticated}
                    path="/post/:id/reactions"
                    component={() => <Reactions />}
                  />
                  <PrivateRoute
                    authenticated={authenticated}
                    path="/post/:id/details"
                    component={() => <PostDetails />}
                  />
                  <PrivateRoute
                    authenticated={authenticated}
                    path="/users"
                    component={() => <Timeline />}
                  />
                  <PrivateRoute
                    authenticated={authenticated}
                    path="/preferences"
                    component={() => <Preferences />}
                  />
                  <Route path="/about" component={About} />
                  <Route path="/feedback" component={Feedback} />
                  <Route path="/location" component={Location} />
                  <Route path="/developers" component={Developers} />
                  <Route path="/careers" component={Careers} />
                  <Route path="/pros" component={Pros} />
                  <Route path="/cons" component={Cons} />
                  <Route path="/advice" component={Advice} />
                  <Route path="/signin" component={Signin} />
                </Switch>
              )}
            </div>
          </section>
          {!authenticated && loading && <Loader />}
          {!authenticated && !loading && (
            <section className="primary-bg-color w-full relative">
              <div className="w-max-1200 w-full m-auto relative p-v-80 p-h-20 fl-justify-around fl-items-center fl-wrap">
                <div className="row">
                  <div className="col-lg-8 col-md-2 col-sm-2 col-xs-4">
                    <h2 className="w-color">Ready to get started?</h2>
                    <h4 className="w-color">
                      Login with social account and start sharing opinions.
                    </h4>
                  </div>
                  <div className="col-lg-4 col-md-2 col-sm-2 col-xs-4">
                    <Button
                      onClick={() => this.handleSignin()}
                      size="large"
                      color="primary"
                      className="mt-25"
                    >
                      login With Social Account
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}
          {authenticated && !loading && (
            <CustomizedSnackbars
              open={true}
              message={'Logged in succesfully'}
              status={'success'}
            />
          )}
          <Footer authenticated={authenticated} />
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      exact
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  storeUser: actions.storeUser,
  getUsers: actions.getUsers,
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(App))
