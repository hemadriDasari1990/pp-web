import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import Grid from '@material-ui/core/Grid'
import Loader from '../../Loader/components/Loader'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Followers = lazy(() => import('./Followers'))
const Profile = lazy(() => import('./Profile'))
const Reactions = lazy(() => import('./Reactions'))

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
      <Suspense fallback={<Loader />}>
        <Grid item lg={3} md={3} xs={12} sm={9} className="middle-content">
          <Profile profileUser={profile} />
          <Reactions path="profile" />
          <Followers path="profile" />
        </Grid>
      </Suspense>
    )
  }
}

LeftGrid.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(LeftGrid))
