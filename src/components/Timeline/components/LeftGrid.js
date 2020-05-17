import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import Grid from '@material-ui/core/Grid'
import Loader from '../../Loader/components/Loader'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Followers = lazy(() => import('../../UserProfile/components/Followers'))
const Profile = lazy(() => import('../../UserProfile/components/Profile'))
const Reactions = lazy(() => import('../../UserProfile/components/Reactions'))

class LeftGrid extends Component {
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
    const { user } = this.props
    return (
      <Suspense fallback={<Loader />}>
        <Grid item lg={3} md={3} xs={12} sm={9} className="middle-content">
          {user && <Profile profileUser={user} />}
          <Reactions path="timeline" />
          <Followers path="timeline" />
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
