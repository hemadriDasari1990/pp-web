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
      this.props.getPostsByUser(this.props.user._id, false, true)
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleMenuItem = async (val, postId) => {
    switch (val) {
      case 'delete':
        await this.props.deletePost(postId)
        this.setState({
          open: false,
        })
        await this.props.getPostsByUser(this.props.user._id, false, true)
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
    this.props.getPostsByUser(this.props.user._id, false, true)
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
      user,
    } = this.props
    const { open, anchorEl } = this.state
    return (
      <React.Fragment>
          <div className="row">
            <div className="col-lg-3 col-md-5 col-sm-12 col-xs-12">
              {user && !postsLoading && posts && posts.length ? (
                <PostsInfo user={user} iposted={false} ireceived={true} />
              ) : null}
            </div>
            <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12">
              {!postsLoading && posts && posts.length
                ? posts.map(post => (
                    <Card key={post._id}>
                      <CardHeader
                        avatar={
                          !post.isAnonymous ? (
                            <Avatar
                              alt={
                                post.postedBy
                                  ? post.postedBy.userName.substring(1, 1)
                                  : 'Image not Available'
                              }
                              src={post.postedBy ? post.postedBy.photoURL : ''}
                            />
                          ) : (
                            <Avatar
                              style={{
                                color: '#ffffff',
                                backgroundColor: '#1976d2',
                              }}
                            >
                              A
                            </Avatar>
                          )
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
                                    style={{ color: '#17ab13' }}
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
                                    style={{ color: '#ff0000' }}
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
                          !post.isAnonymous ? (
                            <Link
                              className="hyperlink"
                              to={`/profile/${post.postedBy._id}`}
                            >
                              {post.postedBy.userName}
                            </Link>
                          ) : (
                            <b>Annonymous User</b>
                          )
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
                              primary="Pros"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="p"
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    {post.pros}
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
                              primary="Cons"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="p"
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    {post.cons}
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

        {postsLoading ? <Loader /> : null}
        {postUpdateLoading ? <Loader /> : null}
        {postUpdateSuccess && postUpdateSuccess.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={postUpdateSuccess.get('message')}
            status="success"
          />
        ) : null}
        {posts && posts.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={posts.get('message')}
            status="success"
          />
        ) : null}
        {(!postsLoading && !posts) ||
          (!postsLoading && !posts.length && (
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
  const posts = state.getIn(['Dashboard', 'posts', 'success'], Map())
  const postsLoading = state.getIn(['Dashboard', 'posts', 'loading'], false)
  const postsError = state.getIn(['Dashboard', 'posts', 'errors'], Map())
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
  return {
    user,
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
  getPostsByUser: dashboardActions.getPostsByUser,
  updatePost: dashboardActions.updatePost,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(Notifications),
)
