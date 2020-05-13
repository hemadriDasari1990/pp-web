import * as actions from '../../../actions/index'

import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

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
    const { user } = this.props
    const locationPath = this.props.location.pathname
    return (
      <>
        <Grid item lg={5} md={6} xs={12} sm={9} className="middle-content">
          {locationPath.includes('/post') && <Reactions />}
          {user && locationPath == '/users' && (
            <>
              <Search />
              <br />
              <Users />
            </>
          )}
          {locationPath == '/user/reactions' ? (
            <ProfileReactionsView fallBackTo={'/incoming'} view="list" />
          ) : null}
          {locationPath == '/user/followers' ? (
            <ProfileFollowersView fallBackTo={'/incoming'} view="list" />
          ) : null}
          {locationPath == '/incoming' || locationPath == '/outgoing' ? (
            <Post />
          ) : null}
          {user && locationPath == '/incoming' && (
            <Incoming user={user} type="timeline" />
          )}
          {user && locationPath == '/outgoing' && <Outgoing user={user} />}
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
