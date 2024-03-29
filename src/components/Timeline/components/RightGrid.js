import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const PopularPosts = lazy(() => import('./PopularPosts'))
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
      <Suspense>
        <Box clone order={{ xs: 2, lg: 3 }}>
          <Grid item lg={4} md={6} xs={12} sm={4} className="of-h">
            {user && <Summary type={path} title="Summary" />}
            {/* {user && <RecentPosts user={path} />} */}
            {user && <PopularPosts user={user} type={path} />}
          </Grid>
        </Box>
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
