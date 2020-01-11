import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import PostList from './PostList'
import * as actions from '../actions'
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
import PostsInfo from '../../Dashboard/components/PostsInfo'
import RecentPosts from '../../Dashboard/components/RecentPosts'
import TopPosts from '../../Dashboard/components/TopPosts'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import * as globalActions from '../../../actions/index'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      user: {},
    }
  }

  componentDidMount() {
    this.props.getPostsByUser(this.props.match.params.id).then(res => {
      this.setState({
        posts: res.data,
      })
    })
    this.props.getUser(this.props.match.params.id).then(res => {
      this.setState({
        user: res.data ? res.data.user : {},
      })
    })
  }

  render() {
    const { classes } = this.props
    const { posts, user } = this.state
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button onClick={event => this.handleApproved(event)}>
                  <ListItemAvatar>
                    <Avatar src={user ? user.photoURL : ''} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user ? user.userName : 'Name loading...'}
                  />
                </ListItem>
              </List>
              <PostsInfo posts={posts} />
            </div>
            <div className="col-lg-4 col-md-3 col-sm-12 col-xs-12">
              <PostList posts={posts} user={user} />
            </div>
            <div className="col-lg-0 col-md-4 col-sm-12 col-xs-12">
              <RecentPosts posts={posts} />
              <TopPosts posts={posts} />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const posts = state.getIn(['UserProfile', 'posts', 'success'], Map())
  // const user = state.getIn(['user', 'data']);
  return {
    posts,
  }
}

const actionsToProps = {
  getPostsByUser: actions.getPostsByUser,
  getUser: globalActions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Dashboard))
