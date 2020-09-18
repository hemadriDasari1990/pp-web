import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Followers = lazy(() => import('./Followers'))
const Profile = lazy(() => import('./Profile'))
const Reactions = lazy(() => import('./Reactions'))
const Following = lazy(() => import('./Following'))

class LeftGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const {} = this.state
    const { profile } = this.props
    return (
      <Suspense>
        {profile && (
          <Grid item lg={3} md={3} xs={12} sm={9} disableGutters={true}>
            <Profile profileUser={profile} />
            {/* <Reactions path="profile" />
          <Followers path="profile" />
          <Following path="profile" /> */}
          </Grid>
        )}
      </Suspense>
    )
  }
}

LeftGrid.propTypes = {}

const mapStateToProps = state => {
  const profile = state.getIn(['user', 'success'])
  const user = state.getIn(['user', 'data'])
  return {
    user,
    profile: profile ? profile.user : undefined,
  }
}

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(LeftGrid))
