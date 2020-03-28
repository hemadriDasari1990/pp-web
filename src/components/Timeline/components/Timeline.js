import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from '../../../firebase'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Incoming from './Incoming'
import PostsInfo from './PostsInfo'
import RecentPosts from './RecentPosts'
import TopPosts from './TopPosts'
import outgoingIcon from '../../../../assets/outgoing.svg'
import incomingIcon from '../../../../assets/incoming.svg'
import * as actions from '../../../actions/index'
import Tooltip from '@material-ui/core/Tooltip'
import { useLocation } from 'react-router-dom'
import Outgoing from './Outgoing'
import Post from '../../Post/components/Post'
import DrawerComponent from '../../Drawer/components/Drawer'
import Users from '../../Users/components/Users'
import InputBase from '@material-ui/core/InputBase'
import Search from '../../Search/components/Search'
import Grid from '@material-ui/core/Grid'

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
            <Grid item xs={12} sm={3}>
              <Search />
              <br />
              <Users />
            </Grid>
          )}
          {this.props.location.pathname !== '/users' && (
            <Grid item xs={12} sm={4}>
              <Post />
              {user && this.props.location.pathname == '/incoming' && (
                <Incoming user={user} />
              )}
              {user && this.props.location.pathname == '/outgoing' && (
                <Outgoing user={user} />
              )}
            </Grid>
          )}
          {this.props.location.pathname !== '/users' && (
            <Grid item xs={12} sm={4}>
              {user && <PostsInfo user={user} />}
              {user && <RecentPosts user={user} />}
              {user && <TopPosts user={user} />}
            </Grid>
          )}
        </Grid>
        {/* {user && this.props.location.pathname == '/users' && (<div className="row text-center">
          <div style={{marginLeft: '33%', marginBottom: 10}} className="col-lg-4 col-md-3 col-sm-12 col-xs-12">
            <Search />
          </div>
        </div>)} */}
        {/* <div className="row">
            <div className="col-lg-1 col-md-3 col-sm-12 col-xs-12">
              <DrawerComponent />
            </div>
            {user && this.props.location.pathname == '/users' && (
              <Users />
            )}

            { this.props.location.pathname !== '/users' && (<div className="col-lg-5 col-md-7 col-sm-12 col-xs-12">
              <Post />
              {user && this.props.location.pathname == '/incoming' && (
                <Incoming user={user} />
              )}
              {user && this.props.location.pathname == '/outgoing' && (
                <Outgoing user={user} />
              )}
            </div>)}
            { this.props.location.pathname !== '/users' && (<div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
              {user && (
                <PostsInfo user={user} />
              )}
              {user && (
                <RecentPosts
                  user={user}
                />
              )}
              {user && (
                <TopPosts user={user} />
              )}
            </div>)}
          </div> */}
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
