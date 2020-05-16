import * as actions from '../../../actions/index'

import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Followers from '../../UserProfile/components/Followers'
import Grid from '@material-ui/core/Grid'
import Incoming from './Incoming'
import Outgoing from './Outgoing'
import PopularPosts from './PopularPosts'
import Post from '../../Post/components/Post'
import Profile from '../../UserProfile/components/Profile'
import Reactions from '../../UserProfile/components/Reactions'
import RecentPosts from './RecentPosts'
import Search from '../../Search/components/Search'
import Summary from '../../Dashboard/components/Summary'
import Users from '../../Users/components/Users'
import { connect } from 'react-redux'
import firebase from '../../../firebase'

class RightGrid extends Component {
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
    const { user, path } = this.props
    return (
      <>
        <Grid item lg={4} md={6} xs={12} sm={9} className="of-h">
          {user && <Summary type={path} title="Summary" />}
          {user && <RecentPosts user={path} />}
          {user && <PopularPosts user={user} type={path} />}
        </Grid>
      </>
    )
  }
}

RightGrid.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(RightGrid))
