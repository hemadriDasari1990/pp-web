import React, { Component } from 'react'
import Home from './Home/components/Home'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  BrowserRouter,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import Dashboard from './Dashboard/components/Dashboard'
import * as actions from '../actions/index'
import { Map, List, fromJS } from 'immutable'
import Header from './Header/index'
import Footer from './Footer/components/Footer'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import indigo from '@material-ui/core/colors/indigo'
import pink from '@material-ui/core/colors/pink'
import red from '@material-ui/core/colors/red'
import firebase from '../firebase'
import Loader from './Loader/components/Loader'
import theme from './theme'
import UserProfileDashboard from './UserProfile/components/Dashboard'
// import { askForPermissionToReceiveNotifications } from '../firebase/push-notification';
import Notifications from './Notifications/components/Notification'
import { history } from '../history'
import PageNotFound from './PageNotFound/components/index'
import About from './Footer/components/About'
import Contact from './Footer/components/Contact'
import Location from './Footer/components/Location'
import Developers from './Footer/components/developers'
import Careers from './Footer/components/careers'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      user: {},
    }
  }

  componentDidMount() {
    new firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        await this.props.getUser(user.providerData[0].uid).then(async u => {
          if (u && u.data && u.data.user) {
            this.setState({
              authenticated: true,
              user: u.data.user,
            })
            await this.props.storeUser(user.providerData[0])
            await this.props.getUsers()
            this.props.history.push('/dashboard')
          } else {
            this.setState({
              authenticated: false,
            })
            this.props.storeUser(null)
            this.props.history.push('/')
          }
        })
      }
    })
  }

  isAuthenticated = flag => {
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
          {/* { !authenticated ? <Loader />: <>
            <Switch>
              <Route path='/' exact component={Home}/>
              <PrivateRoute authenticated={this.state.authenticated} path='/dashboard' component={() => (<Dashboard />)} />
              <PrivateRoute authenticated={this.state.authenticated} path='/profile/:id' component={() => (<UserProfileDashboard />)} />
              <PrivateRoute authenticated={this.state.authenticated} path='/notifications' component={() => (<Notifications user={user}/>)} />
            </Switch>
            </>
          } */}
          <div className="container-body">
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute
                authenticated={this.state.authenticated}
                path="/dashboard"
                component={() => <Dashboard />}
              />
              <PrivateRoute
                authenticated={this.state.authenticated}
                path="/profile/:id"
                component={() => <UserProfileDashboard />}
              />
              <PrivateRoute
                authenticated={this.state.authenticated}
                path="/notifications"
                component={() => <Notifications user={user} />}
              />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/location" component={Location} />
              <Route path="/developers" component={Developers} />
              <Route path="/careers" component={Careers} />
            </Switch>
          </div>
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
        authenticated === true ? (
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
