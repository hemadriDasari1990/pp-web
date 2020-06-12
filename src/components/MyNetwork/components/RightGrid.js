import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Loader from '../../Loader/components/Loader'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// const RecentPosts = lazy(() => import('../../Timeline/components/RecentPosts'))

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
        <Box clone order={{ xs: 3, lg: 3 }}>
          <Grid item lg={3} md={6} xs={12} sm={12} className="of-h"></Grid>
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

const actionsToProps = {}

export default withRouter(connect(mapStateToProps, actionsToProps)(RightGrid))
