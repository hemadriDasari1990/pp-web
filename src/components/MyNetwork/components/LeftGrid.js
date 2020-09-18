import React, { Component, Suspense } from 'react'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
// import Summary from './Summary'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// const Followers = lazy(() => import('../../UserProfile/components/Followers'))

class LeftGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const {} = this.state
    const { user } = this.props
    return (
      <Suspense>
        <Box clone order={{ xs: 1, lg: 1 }}>
          <Grid item lg={4} md={4} xs={12} sm={4}>
            {/* <Summary /> */}
          </Grid>
        </Box>
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

const actionsToProps = {}

export default withRouter(connect(mapStateToProps, actionsToProps)(LeftGrid))
