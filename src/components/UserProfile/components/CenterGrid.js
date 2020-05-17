import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Loader from '../../Loader/components/Loader'
import { connect } from 'react-redux'

const Incoming = lazy(() => import('../../Timeline/components/Incoming'))
const ProfileFollowersView = lazy(() => import('./FollowersView'))
const ProfileReactionsView = lazy(() => import('./ReactionsView'))

class CenterGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const {} = this.state
    const { profile, path } = this.props
    return (
      <Suspense fallback={<Loader />}>
        <Grid item lg={5} md={6} xs={12} sm={9} className="middle-content">
          <Route
            path="/profile/:id"
            exact
            component={() => <Incoming user={profile} type="profile" />}
          />
          <Route
            path="/profile/:id/reactions"
            exact
            component={() => (
              <ProfileReactionsView
                fallBackTo={'/timeline/incoming'}
                view="list"
              />
            )}
          />
          <Route
            path="/profile/:id/followers"
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
