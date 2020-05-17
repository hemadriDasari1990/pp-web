import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import Grid from '@material-ui/core/Grid'
import Loader from '../../Loader/components/Loader'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const PopularPosts = lazy(() => import('./PopularPosts'))
const RecentPosts = lazy(() => import('./RecentPosts'))
const Summary = lazy(() => import('../../Dashboard/components/Summary'))

class RightGrid extends Component {
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
    const { user, path } = this.props
    return (
      <Suspense fallback={<Loader />}>
        <Grid item lg={4} md={6} xs={12} sm={9} className="of-h">
          {user && <Summary type={path} title="Summary" />}
          {user && <RecentPosts user={path} />}
          {user && <PopularPosts user={user} type={path} />}
        </Grid>
      </Suspense>
    )
  }
}

RightGrid.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(RightGrid))
