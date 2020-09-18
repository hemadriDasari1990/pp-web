import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Followers = lazy(() => import('../../UserProfile/components/Followers'))
const Profile = lazy(() => import('../../UserProfile/components/Profile'))
const Reactions = lazy(() => import('../../UserProfile/components/Reactions'))
const Following = lazy(() => import('../../UserProfile/components/Following'))

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
      <Suspense>
        <Box clone order={{ xs: 3, lg: 1 }}>
          <Grid item lg={3} md={3} xs={12} sm={3}>
            {user && <Profile profileUser={user} />}
            <Reactions path="timeline" />
            <Followers path="timeline" />
            <Following path="timeline" />
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

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(LeftGrid))
