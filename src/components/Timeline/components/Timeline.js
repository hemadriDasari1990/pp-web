import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const LeftGrid = lazy(() => import('./LeftGrid'))
const CenterGrid = lazy(() => import('./CenterGrid'))
const RightGrid = lazy(() => import('./RightGrid'))

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  handleUser = event => {
    this.props.history.push('/dashboard')
  }

  render() {
    const { user } = this.state
    const {} = this.props
    return (
      <Suspense>
        <Grid container spacing={1} className="of-h w-us" disableGutters={true}>
          <LeftGrid />
          <CenterGrid />
          <RightGrid />
        </Grid>
      </Suspense>
    )
  }
}

Timeline.propTypes = {}

const mapStateToProps = state => {
  return {}
}

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Timeline))
