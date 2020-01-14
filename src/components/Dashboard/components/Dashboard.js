import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import * as userProfileActions from '../../UserProfile/actions'
import { Map, fromJS } from 'immutable'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from '../../../firebase'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import PostList from './PostList'
import PostsInfo from './PostsInfo'
import RecentPosts from './RecentPosts'
import TopPosts from './TopPosts'
import ListIcon from '@material-ui/icons/List'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import CallReceivedIcon from '@material-ui/icons/CallReceived'
import formateNumber from '../../../util/formateNumber'
import Loader from '../../Loader/components/Loader'

class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMyPosts: false,
      user: {},
      givenPosts: [],
      receivedPosts: [],
      isGivenPost: false,
      isReceivedPost: true,
    }
  }

  componentDidMount() {
    new firebase.auth().onAuthStateChanged(async user => {
      if (
        user &&
        Array.isArray(user.providerData) &&
        user.providerData.length
      ) {
        await this.props.getPostsByUser(user.providerData[0].uid).then(data => {
          this.setState({
            user: user.providerData[0],
            receivedPosts: data.data,
          })
        })
      }
    })
  }

  updatePosts = posts => {
    this.setState({
      receivedPosts: posts,
    })
  }

  handleUser = event => {
    this.props.history.push('/dashboard')
  }

  handleGivenPosts = async event => {
    await this.props.getPostsPostedByUser(this.state.user.uid).then(data => {
      this.setState({
        givenPosts: data.data,
        isGivenPost: true,
        isReceivedPost: false,
      })
    })
  }

  handleReceivedPosts = async event => {
    await this.props.getPostsByUser(this.state.user.uid).then(data => {
      this.setState({
        receivedPosts: data.data,
        isGivenPost: false,
        isReceivedPost: true,
      })
    })
  }

  render() {
    const {
      user,
      givenPosts,
      receivedPosts,
      isReceivedPost,
      isGivenPost,
    } = this.state
    const { postsLoading } = this.props
    return (
      <React.Fragment>
        {postsLoading ? (
          <Loader />
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-5 col-sm-12 col-xs-12">
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button onClick={event => this.handleUser(event)}>
                    <ListItemAvatar>
                      <Avatar size="small" src={user.photoURL} />
                    </ListItemAvatar>
                    <ListItemText primary={user.displayName} />
                    <ListItemSecondaryAction>
                      <IconButton
                        color="primary"
                        edge="end"
                        aria-label="delete"
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem
                    button
                    onClick={event => this.handleGivenPosts(event)}
                  >
                    <ListItemAvatar>
                      <PlaylistAddCheckIcon color="primary" />
                    </ListItemAvatar>
                    <ListItemText primary="Given Posts" />
                    <ListItemSecondaryAction style={{ marginRight: 20 }}>
                      {isGivenPost && givenPosts
                        ? formateNumber(givenPosts.length)
                        : 0}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem
                    button
                    onClick={event => this.handleReceivedPosts(event)}
                  >
                    <ListItemAvatar>
                      <CallReceivedIcon color="primary" />
                    </ListItemAvatar>
                    <ListItemText primary="Received Posts" />
                    <ListItemSecondaryAction style={{ marginRight: 20 }}>
                      {isReceivedPost && receivedPosts
                        ? formateNumber(receivedPosts.length)
                        : 0}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
                {isGivenPost && <PostsInfo posts={givenPosts} />}
                {isReceivedPost && <PostsInfo posts={receivedPosts} />}
              </div>
              <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12">
                {isGivenPost && givenPosts.length ? (
                  <PostList
                    given={true}
                    received={false}
                    updatePosts={this.updatePosts}
                    postsLoading={postsLoading}
                    posts={givenPosts}
                  />
                ) : null}
                {isReceivedPost && receivedPosts.length ? (
                  <PostList
                    received={true}
                    given={false}
                    updatePosts={this.updatePosts}
                    postsLoading={postsLoading}
                    posts={receivedPosts}
                  />
                ) : null}
                {isGivenPost && !givenPosts.length ? (
                  <Typography variant="h4" className="no-records">
                    No posts Found
                  </Typography>
                ) : null}
                {isReceivedPost && !receivedPosts.length ? (
                  <Typography variant="h4" className="no-records">
                    No posts Found
                  </Typography>
                ) : null}
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                {isReceivedPost && <RecentPosts posts={receivedPosts} />}
                {isGivenPost && <RecentPosts posts={givenPosts} />}
                {isReceivedPost && <TopPosts posts={receivedPosts} />}
                {isGivenPost && <TopPosts posts={givenPosts} />}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const posts = state.getIn(['UserProfile', 'posts', 'success'], Map())
  const postsLoading = state.getIn(['UserProfile', 'posts', 'loading'], Map())
  return {
    posts,
    postsLoading,
  }
}

const actionsToProps = {
  getPostsByUser: userProfileActions.getPostsByUser,
  getPostsPostedByUser: userProfileActions.getPostsPostedByUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(DashBoard))
