import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import WhoToFollow from '../../WhoToFollow/components/WhoToFollow'
import { connect } from 'react-redux'

class CenterGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const {} = this.state
    const { user, path, match, actionState } = this.props
    const locationPath = this.props.location.pathname

    return (
      <Suspense>
        <Box clone order={{ xs: 2, lg: 2 }}>
          <Grid item lg={8} md={8} xs={12} sm={8} className="middle-content">
            <WhoToFollow />
          </Grid>
        </Box>
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

const actionsToProps = {}

export default withRouter(connect(mapStateToProps, actionsToProps)(CenterGrid))
