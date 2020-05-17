import React, { Component, Suspense, lazy } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'

import Loader from './Loader/components/Loader'
import { connect } from 'react-redux'

const Dashboard = lazy(() => import('./Dashboard/components/Dashboard'))
const Notifications = lazy(() =>
  import('./Notifications/components/Notification'),
)
// const PageNotFound = lazy(() => import('./PageNotFound/components/index'));
const PostDetails = lazy(() => import('./Timeline/components/PostDetails'))
const Preferences = lazy(() => import('./Post/components/Preferences'))
const Timeline = lazy(() => import('./Timeline/components/Timeline'))
const UserProfile = lazy(() => import('./UserProfile/components/Dashboard'))

class Routes extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {}

  componentWillUnMount() {}

  handleSignin = () => {
    this.props.history.push('/signin')
  }

  render() {
    const { user, authenticated } = this.props
    return (
      <Suspense fallback={<Loader />}>
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          <PrivateRoute
            authenticated={authenticated}
            path="/timeline"
            component={() => <Timeline />}
          />
          <PrivateRoute
            authenticated={authenticated}
            path="/dashboard"
            component={() => <Dashboard />}
          />

          <PrivateRoute
            authenticated={authenticated}
            path="/profile/:id"
            component={() => <UserProfile path="profile" />}
          />
          <PrivateRoute
            authenticated={authenticated}
            path="/notifications"
            component={() => <Notifications user={user} />}
          />
          <PrivateRoute
            authenticated={authenticated}
            path="/post/:id/details"
            component={() => <PostDetails />}
          />
          <PrivateRoute
            authenticated={authenticated}
            path="/preferences"
            component={() => <Preferences />}
          />
        </Switch>
      </Suspense>
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
