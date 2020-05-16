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
import LeftGrid from './LeftGrid'
import CenterGrid from './CenterGrid'
import RightGrid from './RightGrid'
import Container from '@material-ui/core/Container'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    new firebase.auth().onAuthStateChanged(async user => {
      if (
        user &&
        Array.isArray(user.providerData) &&
        user.providerData.length
      ) {
        await this.props.getUser(user.providerData[0].uid).then(async u => {
          if (u && u.data && u.data.user) {
            this.setState({
              user: u.data.user,
            })
          }
        })
      }
    })
  }

  handleUser = event => {
    this.props.history.push('/dashboard')
  }

  render() {
    const { user } = this.state
    const {} = this.props
    return (
      <>
        <Grid container spacing={1} className="of-h">
          <LeftGrid />
          <CenterGrid />
          <RightGrid />
        </Grid>
      </>
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
