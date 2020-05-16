import * as actions from '../../../actions/index'

import React, { Component } from 'react'

import Followers from '../../UserProfile/components/Followers'
import Grid from '@material-ui/core/Grid'
import Incoming from './Incoming'
import Outgoing from './Outgoing'
import PopularPosts from './PopularPosts'
import Post from '../../Post/components/Post'
import ProfileReactionsView from '../../UserProfile/components/ReactionsView'
import ProfileFollowersView from '../../UserProfile/components/FollowersView'
import Reactions from '../../Reactions/components/Reactions'
import RecentPosts from './RecentPosts'
import Search from '../../Search/components/Search'
import Summary from '../../Dashboard/components/Summary'
import Users from '../../Users/components/Users'
import { connect } from 'react-redux'
import firebase from '../../../firebase'
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'

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
    const { user, path, match } = this.props
    const locationPath = this.props.location.pathname
    return (
      <>
        <Grid item lg={5} md={6} xs={12} sm={9} className="middle-content">
          {locationPath.includes('/post') && <Reactions />}
          <Route
            exact
            path={'/timeline/users'}
            exact
            component={() => (
              <>
                <Users user={user} />
              </>
            )}
          />
          <Route
            path={'/timeline/incoming'}
            exact
            component={() => (
              <>
                <Post />
                <Incoming user={user} />
              </>
            )}
          />
          <Route
            path="/timeline/outgoing"
            exact
            component={() => (
              <>
                <Post />
                <Outgoing user={user} />
              </>
            )}
          />
          <Route
            path="/timeline/:id/reactions"
            exact
            component={() => (
              <ProfileReactionsView
                fallBackTo={'/timeline/incoming'}
                view="list"
              />
            )}
          />
          <Route
            path="/timeline/:id/followers"
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
