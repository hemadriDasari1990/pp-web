import * as actions from '../../../actions/index'

import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Incoming from '../../Timeline/components/Incoming'
import ProfileFollowersView from './FollowersView'
import ProfileReactionsView from './ReactionsView'
import { connect } from 'react-redux'

class CenterGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const {} = this.state
    const { profile, path } = this.props
    return (
      <>
        <Grid item lg={5} md={6} xs={12} sm={9} className="middle-content">
          <Route
            path="/profile/:id"
            exact
            component={() => <Incoming user={profile} type="profile" />}
          />
          <Route
            path="/profile/:id/reactions"
            exact
            component={() => (
              <ProfileReactionsView
                fallBackTo={'/timeline/incoming'}
                view="list"
              />
            )}
          />
          <Route
            path="/profile/:id/followers"
            exact
            component={() => (
              <ProfileFollowersView
                fallBackTo={'/timeline/incoming'}
                view="list"
              />
            )}
          />
        </Grid>
      </>
    )
  }
}

CenterGrid.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(CenterGrid))
