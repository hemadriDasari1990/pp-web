import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Code from '@material-ui/icons/Code'
import Tooltip from '@material-ui/core/Tooltip'
import Phone from '@material-ui/icons/Phone'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'
import LikeIcon from '@material-ui/icons/ThumbUp'
import DisLikeIcon from '@material-ui/icons/ThumbDown'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import moment from 'moment'
import MoodIcon from '@material-ui/icons/Mood'
import MoodBadIcon from '@material-ui/icons/MoodBad'
import PublicIcon from '@material-ui/icons/Public'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import formateNumber from '../../../util/formateNumber'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import * as actions from '../actions'
import * as userProfileActions from '../../UserProfile/actions'
import * as dashboardActions from '../../Dashboard/actions'
import { Map, fromJS } from 'immutable'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import { connect } from 'react-redux'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import Loader from '../../Loader/components/Loader'
import Chip from '@material-ui/core/Chip'
import PostsInfo from '../../Dashboard/components/PostsInfo'
import { Link } from 'react-router-dom'

class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      anchorEl: undefined,
    }
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.getPostsByUser(this.props.user.uid)
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleMenuItem = async (val, postId) => {
    switch (val) {
      case 'delete':
        await this.props.deletePost(postId)
        this.setState(
          {
            posts: await this.state.posts.filter(post => post._id !== postId),
            open: false,
          },
          () => {
            this.props.updatePosts(this.state.posts)
          },
        )
        break
      default:
        break
    }
  }

  handleButton = event => {
    this.setState({ open: !this.state.open, anchorEl: event.currentTarget })
  }

  updatePost = async (post, value) => {
    switch (value) {
      case 'approve':
        await this.props.updatePost(post._id, {
          approved: true,
        })
        break
      case 'reject':
        await this.props.updatePost(post._id, {
          rejected: true,
        })
        break
      default:
        break
    }
    this.props.getPostsByUser(this.props.user.uid)
  }

  render() {
    const {
      classes,
      posts,
      postsError,
      postsLoading,
      postUpdateSuccess,
      postUpdateError,
      postUpdateLoading,
    } = this.props
    const { open, anchorEl } = this.state
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            {!postsLoading && posts && posts.length ? (
              <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <PostsInfo posts={posts} />
              </div>
            ) : null}
            <div className="col-lg-6 col-md-7 col-sm-12 col-xs-12">
              {!postsLoading && posts && posts.length
                ? posts.map(post => (
                    <Card key={post._id}>
                      <CardHeader
                        avatar={
                          <Avatar
                            alt={
                              post.postedByName
                                ? post.postedByName.substring(1, 1)
                                : 'Image not Available'
                            }
                            src={post.postedByPhotoURL}
                          />
                        }
                        action={
                          <>
                            {!post.approved && !post.rejected && (
                              <>
                                <Tooltip title="Approve">
                                  <IconButton
                                    onClick={() =>
                                      this.updatePost(post, 'approve')
                                    }
                                    tooltipPosition="bottom-left"
                                    color="primary"
                                  >
                                    <VerifiedUserIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Reject">
                                  <IconButton
                                    onClick={() =>
                                      this.updatePost(post, 'reject')
                                    }
                                    tooltipPosition="bottom-left"
                                    color="secondary"
                                  >
                                    <VerifiedUserIcon />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                            {post.approved && (
                              <Chip
                                variant="outlined"
                                size="small"
                                label="Approved"
                                className="approve-text"
                              />
                            )}
                            {post.rejected && (
                              <Chip
                                variant="outlined"
                                size="small"
                                label="Rejected"
                                className="reject-text"
                              />
                            )}
                          </>
                        }
                        title={
                          <Link
                            className="hyperlink"
                            to={`/profile/${post.postedTo}`}
                          >
                            {post.postedByName}
                          </Link>
                        }
                        subheader={moment(post.createdAt).fromNow()}
                      />
                      <CardContent>
                        <List>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <MoodIcon />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Positive"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="p"
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    {post.positive}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <MoodBadIcon />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Negative"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="p"
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    {post.negative}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <SentimentSatisfiedIcon />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Advice"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="p"
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    {post.advice}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                      <Divider />
                    </Card>
                  ))
                : null}
            </div>
          </div>
        </div>

        {postsLoading ? <Loader /> : null}
        {postUpdateSuccess && postUpdateSuccess.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={postUpdateSuccess.get('message')}
            status="success"
          />
        ) : null}
        {!posts ||
          (!posts.length && (
            <div className="home-background">
              <div className="img-text">No posts found</div>
            </div>
          ))}
      </React.Fragment>
    )
  }
}

Notifications.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const posts = state.getIn(['UserProfile', 'posts', 'success'], Map())
  const postsLoading = state.getIn(['UserProfile', 'posts', 'loading'], false)
  const postsError = state.getIn(['UserProfile', 'posts', 'errors'], Map())
  const postUpdateSuccess = state.getIn(
    ['Dashboard', 'post', 'update', 'success'],
    Map(),
  )
  const postUpdateError = state.getIn(
    ['Dashboard', 'post', 'update', 'errors'],
    Map(),
  )
  const postUpdateLoading = state.getIn(
    ['Dashboard', 'post', 'update', 'loading'],
    false,
  )
  // const postSuccess = state.getIn(['Dashboard', 'post', 'delete', 'success'], Map());
  // const postError = state.getIn(['Dashboard', 'post', 'delete', 'errors'], Map());
  // const postLoading = state.getIn(['Dashboard', 'post', 'delete', 'loading'], Map());
  return {
    posts,
    postsError,
    postsLoading,
    user,
    postUpdateSuccess,
    postUpdateError,
    postUpdateLoading,
  }
}

const actionsToProps = {
  getPostsByUser: userProfileActions.getPostsByUser,
  updatePost: dashboardActions.updatePost,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(Notifications),
)
