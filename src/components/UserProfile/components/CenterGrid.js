import * as actions from '../actions'
import * as globalActions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Loader from '../../Loader/components/Loader'
import { connect } from 'react-redux'

const Reactions = lazy(() => import('../../Reactions/components/Reactions'))
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
    const { profile, path, actionState } = this.props
    return (
      <Suspense fallback={<Loader />}>
        <Grid item lg={5} md={6} xs={12} sm={9} className="middle-content">
          {actionState === 'post-reactions' && <Reactions />}
          {!actionState || actionState === 'incoming' ? (
            <Incoming user={profile} type="profile" />
          ) : null}
          {actionState === 'reactions' ? (
            <ProfileReactionsView view="list" />
          ) : null}
          {actionState === 'followers' ? (
            <ProfileFollowersView view="list" />
          ) : null}
        </Grid>
      </Suspense>
    )
  }
}

CenterGrid.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const actionState = state.getIn(['UserProfile', 'action', 'save'])
  return {
    user,
    actionState,
  }
}

const actionsToProps = {
  getUser: globalActions.getUser,
  saveActionState: actions.saveActionState,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(CenterGrid))
