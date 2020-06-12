import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Loader from '../../Loader/components/Loader'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const LeftGrid = lazy(() => import('./LeftGrid'))
const CenterGrid = lazy(() => import('./CenterGrid'))
const RightGrid = lazy(() => import('./RightGrid'))

class MyNetwork extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  render() {
    const {} = this.state
    const { user } = this.props
    return (
      <Suspense>
        <Container fixed>
          <Grid
            container
            spacing={1}
            className="of-h w-us"
            disableGutters={true}
          >
            <LeftGrid />
            <CenterGrid />
            {/* <RightGrid /> */}
          </Grid>
        </Container>
      </Suspense>
    )
  }
}

MyNetwork.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(MyNetwork))
