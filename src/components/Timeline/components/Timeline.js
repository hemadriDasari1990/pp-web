import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from '../../../firebase'
import Incoming from './Incoming'
import RecentPosts from './RecentPosts'
import TopPosts from './TopPosts'
import * as actions from '../../../actions/index'
import Outgoing from './Outgoing'
import Post from '../../Post/components/Post'
import DrawerComponent from '../../Drawer/components/Drawer'
import Users from '../../Users/components/Users'
import Search from '../../Search/components/Search'
import Grid from '@material-ui/core/Grid'
import Summary from '../../Dashboard/components/Summary'

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
      <React.Fragment>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={1}>
            <DrawerComponent />
          </Grid>
          {user && this.props.location.pathname == '/users' && (
            <Grid item lg={11} xs={12} sm={3}>
              <Search />
              <br />
              <Users />
            </Grid>
          )}
          {this.props.location.pathname !== '/users' && (
            <Grid item xs={12} sm={4}>
              <Post />
              {user && this.props.location.pathname == '/incoming' && (
                <Incoming user={user} type="timeline" />
              )}
              {user && this.props.location.pathname == '/outgoing' && (
                <Outgoing user={user} />
              )}
            </Grid>
          )}
          {this.props.location.pathname !== '/users' && (
            <Grid item xs={12} sm={4}>
              {user && (
                <Summary
                  type={
                    this.props.location.pathname == '/incoming'
                      ? 'incoming'
                      : 'outgoing'
                  }
                  title="Summary"
                />
              )}
              {user && <RecentPosts user={user} />}
              {user && <TopPosts user={user} />}
            </Grid>
          )}
        </Grid>
      </React.Fragment>
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
