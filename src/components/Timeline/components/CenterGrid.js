import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'

const Incoming = lazy(() => import('./Incoming'))
const Outgoing = lazy(() => import('./Outgoing'))
const Post = lazy(() => import('../../Post/components/Post'))
const ProfileFollowersView = lazy(() =>
  import('../../UserProfile/components/FollowersView'),
)
const ProfileReactionsView = lazy(() =>
  import('../../UserProfile/components/ReactionsView'),
)
const Reactions = lazy(() => import('../../Reactions/components/Reactions'))
const Users = lazy(() => import('../../Users/components/Users'))

class CenterGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  handleUser = event => {
    this.props.history.push('/dashboard')
  }

  render() {
    const {} = this.state
    const { user, path, match } = this.props
    const locationPath = this.props.location.pathname
    return (
      <Suspense>
        <Grid item lg={5} md={6} xs={12} sm={9} className="middle-content">
          {locationPath.includes('/post') && <Reactions />}
          <Route
            exact
            path={'/timeline/users'}
            exact
            component={() => (
              <>
                <Users user={user} />
              </>
            )}
          />
          <Route
            path={'/timeline/incoming'}
            exact
            component={() => (
              <>
                <Post />
                <Incoming user={user} />
              </>
            )}
          />
          <Route
            path="/timeline/outgoing"
            exact
            component={() => (
              <>
                <Post />
                <Outgoing user={user} />
              </>
            )}
          />
          <Route
            path="/timeline/:id/reactions"
            exact
            component={() => (
              <ProfileReactionsView
                fallBackTo={'/timeline/incoming'}
                view="list"
              />
            )}
          />
          <Route
            path="/timeline/:id/followers"
            exact
            component={() => (
              <ProfileFollowersView
                fallBackTo={'/timeline/incoming'}
                view="list"
              />
            )}
          />
        </Grid>
      </Suspense>
    )
  }
}

CenterGrid.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(CenterGrid))
