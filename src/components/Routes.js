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

class Routes extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {}

  //   isAuthenticated = flag => {
  //     if (flag && this.props.user) {
  //       this.props.getUsers(this.props.user._id, '')
  //     }
  //     this.setState({
  //       loading: flag,
  //     })
  //   }

  componentWillUnMount() {
    // this.unSubscribe()
  }

  handleSignin = () => {
    this.props.history.push('/signin')
  }

  render() {
    const { user, authenticated } = this.props
    return (
      <React.Fragment>
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

const actionsToProps = {}

export default withRouter(connect(mapStateToProps, actionsToProps)(Routes))
