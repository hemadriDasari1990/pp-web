import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostList from './PostList'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PostsInfo from '../../Dashboard/components/PostsInfo'
import RecentPosts from '../../Dashboard/components/RecentPosts'
import TopPosts from '../../Dashboard/components/TopPosts'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import * as globalActions from '../../../actions/index'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import userLike from '../../../../assets/user-like.svg'
import userLiked from '../../../../assets/user-liked.svg'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import * as actions from '../actions'
import { Map } from 'immutable'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      user: {},
      userLikeFlag: false,
    }
  }

  async componentDidMount() {
    await this.props.getUser(this.props.match.params.id).then(res => {
      this.setState({
        user: res.data ? res.data.user : {},
      })
    })
    await this.getUserLike()
  }

  handleLike = like => {
    this.props.user
      ? this.props
          .createOrUpdateUserLike({
            user: this.props.match.params.id,
            likedBy: this.props.user._id,
            like: like,
          })
          .then(res => {
            this.getUserLike()
          })
      : null
  }

  getUserLike = () => {
    this.props
      .getUserLike(this.props.user._id, this.props.match.params.id)
      .then(res => {
        res && res.data
          ? this.setState({
              userLikeFlag: true,
            })
          : this.setState({
              userLikeFlag: false,
            })
      })
      .catch(err => {
        this.setState({
          userLikeFlag: false,
        })
      })
  }

  render() {
    const { classes } = this.props
    const { posts, user, userLikeFlag } = this.state
    return (
      <React.Fragment>
          <div className="row">
            <div className="col-lg-3 col-md-5 col-sm-12 col-xs-12">
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar src={user ? user.photoURL : ''} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user ? user.userName : 'Name loading...'}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title={userLikeFlag ? 'Liked' : 'LiKE'}>
                      <IconButton
                        edge="end"
                        aria-label="like"
                        onClick={() => this.handleLike(!userLikeFlag)}
                      >
                        <Avatar src={userLikeFlag ? userLiked : userLike} />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              {user && (
                <PostsInfo user={user} iposted={false} ireceived={true} />
              )}
            </div>
            <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12">
              {user && (
                <PostList searchUser={user} iposted={false} ireceived={true} />
              )}
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
              {user && (
                <RecentPosts user={user} iposted={false} ireceived={true} />
              )}
              {user && (
                <TopPosts user={user} iposted={false} ireceived={true} />
              )}
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
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  getUser: globalActions.getUser,
  createOrUpdateUserLike: actions.createOrUpdateUserLike,
  getUserLike: actions.getUserLike,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Dashboard))
