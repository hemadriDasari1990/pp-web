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
import * as dashboardActions from '../../Timeline/actions'
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
import PostsInfo from '../../Timeline/components/PostsInfo'
import { Link } from 'react-router-dom'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import advice from '../../../../assets/advice.svg'
import pros from '../../../../assets/pros.svg'
import cons from '../../../../assets/cons.svg'
import getReaction from '../../../util/getReaction'
import renderUserNames from '../../../util/renderUserNames'
import textingImage from '../../../../assets/notifications/texting.svg'

const styles = {
  smallAvatar: {
    width: 20,
    height: 20,
    borderColor: '#fff',
  },
  avatar: {
    marginTop: 0,
    width: '100%',
    textAlign: 'center',
  },
  button: {
    width: '150px !important',
    height: '35px !important',
  },
  rightButton: {
    marginLeft: 'auto',
  },
}

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
      this.props.getIncomingPosts(this.props.user._id)
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
        await this.props.getIncomingPosts(this.props.user._id)
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
    this.props.getIncomingPosts(this.props.user._id)
  }

  render() {
    const {
      classes,
      incomingPosts,
      incomingPostsError,
      incomingPostsLoading,
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
            {user &&
            !incomingPostsLoading &&
            incomingPosts &&
            incomingPosts.length ? (
              <PostsInfo user={user} iposted={false} ireceived={true} />
            ) : null}
          </div>
          <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12">
            {!incomingPostsLoading && incomingPosts && incomingPosts.length
              ? incomingPosts.map(post => (
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
                          {!post.approved && !post.rejected ? (
                            <>
                              <Tooltip title="Accepted">
                                <Button
                                  onClick={() =>
                                    this.updatePost(post, 'approve')
                                  }
                                  variant="outlined"
                                  color="primary"
                                  tooltipPosition="bottom-left"
                                  startIcon={<VerifiedUserIcon />}
                                >
                                  Accept
                                </Button>
                              </Tooltip>
                              <Tooltip title="Reject">
                                <Button
                                  onClick={() =>
                                    this.updatePost(post, 'reject')
                                  }
                                  variant="outlined"
                                  color="primary"
                                  tooltipPosition="bottom-left"
                                  className="ml-7"
                                  startIcon={<VerifiedUserIcon />}
                                >
                                  Reject
                                </Button>
                              </Tooltip>
                            </>
                          ) : (
                            <Tooltip
                              title={
                                post.rejected
                                  ? 'Rejected'
                                  : post.approved
                                  ? 'Accepted'
                                  : 'Pending'
                              }
                            >
                              <span
                                className={
                                  post.approved
                                    ? 'status approved m-t-7 m-r-20'
                                    : post.rejected
                                    ? 'status rejected m-t-7 m-r-20'
                                    : 'status pending m-t-7 m-r-20'
                                }
                              ></span>
                            </Tooltip>
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
                    <CardContent style={{ minHeight: '300px !important' }}>
                      <List>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar src={pros} className="avatar" />
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
                            <Avatar src={cons} className="avatar" />
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
                            <Avatar src={advice} className="avatar" />
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
                      <div className="actions-align">
                        <AvatarGroup>
                          {post.reactions.length > 0
                            ? post.reactions.slice(0, 3).map(react => (
                                <Tooltip
                                  title={renderUserNames(post.reactions)}
                                  placement="bottom"
                                >
                                  <Avatar
                                    className={classes.smallAvatar}
                                    key={react._id}
                                    alt="Image Not Available"
                                    src={getReaction(react ? react.type : '')}
                                  />
                                </Tooltip>
                              ))
                            : 'No Reactions'}
                        </AvatarGroup>
                        <Tooltip
                          title={renderUserNames(post.reactions)}
                          placement="bottom"
                        >
                          <Link
                            to={`/post/${post._id}/reactions`}
                            className="actions-text"
                          >
                            <span>
                              {post.reactions.length
                                ? formateNumber(post.reactions.length)
                                : 'No Reactions'}
                            </span>
                          </Link>
                        </Tooltip>
                        <div className={classes.rightButton}>
                          <Link
                            to={`/post/${post._id}/shares`}
                            className="actions-text"
                          >
                            <span>
                              {post.shares.length
                                ? formateNumber(post.shares.length)
                                : 'No'}{' '}
                              shares
                            </span>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : null}
          </div>
        </div>

        {incomingPostsLoading ? <Loader /> : null}
        {postUpdateLoading ? <Loader /> : null}
        {postUpdateSuccess && postUpdateSuccess.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={postUpdateSuccess.get('message')}
            status="success"
          />
        ) : null}
        {incomingPosts && incomingPosts.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={posts.get('message')}
            status="success"
          />
        ) : null}
        {(!incomingPostsLoading && !incomingPosts) ||
          (!incomingPostsLoading && !incomingPosts.length && (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h2 className="text-center">No notifications found</h2>
              <img src={textingImage} />
            </div>
          ))}
      </React.Fragment>
    )
  }
}

Notifications.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const incomingPosts = state.getIn(['Timeline', 'incoming', 'success'], Map())
  const incomingPostsLoading = state.getIn(
    ['Timeline', 'incoming', 'loading'],
    false,
  )
  const incomingPostsError = state.getIn(
    ['Timeline', 'incoming', 'errors'],
    Map(),
  )
  const postUpdateSuccess = state.getIn(
    ['Timeline', 'post', 'update', 'success'],
    Map(),
  )
  const postUpdateError = state.getIn(
    ['Timeline', 'post', 'update', 'errors'],
    Map(),
  )
  const postUpdateLoading = state.getIn(
    ['Timeline', 'post', 'update', 'loading'],
    false,
  )
  return {
    user,
    incomingPosts,
    incomingPostsError,
    incomingPostsLoading,
    user,
    postUpdateSuccess,
    postUpdateError,
    postUpdateLoading,
  }
}

const actionsToProps = {
  getIncomingPosts: dashboardActions.getIncomingPosts,
  updatePost: dashboardActions.updatePost,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Notifications)),
)
