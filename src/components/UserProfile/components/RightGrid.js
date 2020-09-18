import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const PopularPosts = lazy(() =>
  import('../../Timeline/components/PopularPosts'),
)
const RecentPosts = lazy(() => import('../../Timeline/components/RecentPosts'))
const Summary = lazy(() => import('../../Dashboard/components/Summary'))

class RightGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const {} = this.state
    const { profile, path } = this.props
    return (
      <Suspense>
        {profile && (
          <Grid item lg={4} md={6} xs={12} sm={12} className="of-h">
            {/* <Summary type={path} title="Incoming Summary" />
          <Summary type={path} title="Outgoing Summary" /> */}
            {/* <RecentPosts  /> */}
            {/* <PopularPosts user={profile} type={path} /> */}
          </Grid>
        )}
      </Suspense>
    )
  }
}

RightGrid.propTypes = {}

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

export default withRouter(connect(mapStateToProps, actionsToProps)(RightGrid))
