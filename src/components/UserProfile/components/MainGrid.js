import * as actions from '../actions'
import * as globalActions from '../../../actions/index'

import { Link, withRouter } from 'react-router-dom'
import React, { Component, Suspense, lazy } from 'react'

import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Loader from '../../Loader/components/Loader'
import { connect } from 'react-redux'

const ProfileTabs = lazy(() => import('./ProfileTabs'))

class MainGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: undefined,
    }
  }

  componentDidMount() {
    this.props.match.params.id
      ? this.props.getUser(this.props.match.params.id).then(res => {
          this.setState({
            profile: res.data ? res.data.user : {},
          })
        })
      : null
  }

  render() {
    const { profile } = this.state
    const { path, actionState } = this.props
    return (
      <Suspense fallback={<Loader />}>
        {profile && (
          <Grid item lg={12} md={12} xs={12} sm={12} className="middle-content">
            <Box className="text-center mt-5">
              <h1>{profile.userName}</h1>
              <span>
                Some days are just bad days, that's all. You have to experience
                sadness to know happiness😊
              </span>
              <br />
              <Link to="#">Edit</Link>
            </Box>
            <Divider />
            <ProfileTabs />
          </Grid>
        )}
      </Suspense>
    )
  }
}

MainGrid.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const actionState = state.getIn(['UserProfile', 'action', 'save'])
  return {
    user,
    actionState,
  }
}

const actionsToProps = {
  getUser: globalActions.getUser,
  saveActionState: actions.saveActionState,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(MainGrid))
