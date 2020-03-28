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
// import { askForPermissionToReceiveNotifications } from '../firebase/push-notification';
import Notifications from './Notifications/components/Notification'
import PageNotFound from './PageNotFound/components/index'
import About from './Footer/components/About'
import Feedback from './Footer/components/Feedback'
import Location from './Footer/components/Location'
import Developers from './Footer/components/developers'
import Careers from './Footer/components/careers'
import ReactionsList from './Reactions/components/List'
import SharesList from './Shares/components/List'
import Preferences from './Post/components/Preferences'
import Pros from './Home/components/Pros'
import Cons from './Home/components/Cons'
import Advice from './Home/components/Advice'
import Signin from './Signin/components/Signin'
import DrawerComponent from './Drawer/components/Drawer'
import Dashboard from './Dashboard/components/Dashboard'
import Incoming from './Timeline/components/Incoming'
import Outgoing from './Timeline/components/Outgoing'
import Users from './Users/components/Users'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      user: {},
    }
  }

  async componentDidMount() {
    await new firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        await this.props.getUser(user.providerData[0].uid).then(async u => {
          if (u && u.data && u.data.user) {
            this.setState({
              authenticated: true,
              user: u.data.user,
            })
            await this.props.storeUser(u.data.user)
            await this.props.getUsers(u.data.user._id, '')
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
    })
  }

  isAuthenticated = flag => {
    if (flag && this.state.user) {
      this.props.getUsers(this.state.user._id, '')
    }
    this.setState({
      authenticated: flag,
    })
  }

  componentWillUnMount() {
    this.unSubscribe()
  }

  render() {
    const { authenticated, user } = this.state
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Header
            authenticated={authenticated}
            isAuthenticated={this.isAuthenticated}
          />
          {/*<section>
            { authenticated ? <DrawerComponent /> : null }
          </section>*/}
          <section className="home-background">
            <div className="auto-container">
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
                  component={() => <ReactionsList />}
                />
                <PrivateRoute
                  authenticated={authenticated}
                  path="/post/:id/shares"
                  component={() => <SharesList />}
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
            </div>
          </section>
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
