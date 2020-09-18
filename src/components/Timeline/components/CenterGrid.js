import * as actions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Incoming = lazy(() => import('./Incoming'))
const Outgoing = lazy(() => import('./Outgoing'))
const Post = lazy(() => import('../../Post/components/Post'))
const Reactions = lazy(() => import('../../Reactions/components/Reactions'))

class CenterGrid extends Component {
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
    const { user, path, match, actionState } = this.props
    const locationPath = this.props.location.pathname

    return (
      <Suspense>
        <Box clone order={{ xs: 1, lg: 3 }}>
          <Grid item lg={5} md={6} xs={12} sm={5} className="middle-content">
            {actionState === 'post-reactions' && <Reactions />}
            {!actionState || actionState === 'incoming' ? (
              <>
                <Post />
                <Incoming user={user} />
              </>
            ) : null}
            {actionState === 'outgoing' ? (
              <>
                <Post />
                <Outgoing user={user} />
              </>
            ) : null}
            {actionState === 'meme' ? (
              <>
                <Post />
                <Incoming user={user} type="meme" />
              </>
            ) : null}
            {actionState === 'feed' ? (
              <>
                <Post />
                <Incoming user={user} type="feed" />
              </>
            ) : null}
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

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(CenterGrid))
