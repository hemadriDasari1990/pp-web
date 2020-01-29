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
import { Link } from 'react-router-dom'
import Post from '../../Post/components/Post'

class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      anchorEl: undefined,
    }
  }

  componentDidMount() {
    this.props.getPostsByUser(this.props.user.uid, false, true)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.iposted && this.props.iposted != prevProps.iposted) {
      this.props.getPostsByUser(this.props.user.uid, true, false)
    }
    if (this.props.ireceived && this.props.ireceived != prevProps.ireceived) {
      this.props.getPostsByUser(this.props.user.uid, false, true)
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
        if (this.props.ireceived) {
          await this.props.getPostsByUser(this.props.user.uid, false, true)
        }
        if (this.props.iposted) {
          await this.props.getPostsByUser(this.props.user.uid, true, false)
        }
        break
      default:
        break
    }
  }

  handleButton = event => {
    this.setState({ open: !this.state.open, anchorEl: event.currentTarget })
  }

  render() {
    const {
      posts,
      postsError,
      postsLoading,
      deletePostSuccess,
      deletePostError,
      deletePostLoading,
      iposted,
      ireceived,
    } = this.props
    const { open, anchorEl } = this.state
    return (
      <React.Fragment>
        <Post />
        {!postsLoading && posts.length
          ? posts.map(post => (
              <Card key={post._id}>
                <CardHeader
                  avatar={
                    <Avatar
                      alt={
                        iposted
                          ? post.postedTo.userName
                          : ireceived
                          ? post.postedBy.userName
                          : 'Image not Available'
                      }
                      src={
                        iposted
                          ? post.postedTo.photoURL
                          : ireceived
                          ? post.postedBy.photoURL
                          : ''
                      }
                    />
                  }
                  action={
                    <>
                      <Tooltip
                        title={
                          post.rejected
                            ? 'Rejected'
                            : post.approved
                            ? 'Approved'
                            : 'Pending'
                        }
                      >
                        <IconButton
                          style={{
                            color: post.rejected
                              ? '#ff0000'
                              : post.approved
                              ? '#17ab13'
                              : '',
                          }}
                        >
                          <VerifiedUserIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Update">
                        <IconButton
                          aria-label="settings"
                          onClick={this.handleButton}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        open={open}
                        onClose={this.handleClose}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'bottom',
                        }}
                        getContentAnchorEl={null}
                      >
                        <MenuItem
                          onClick={() =>
                            this.handleMenuItem('delete', post._id)
                          }
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </>
                  }
                  title={
                    <Link
                      className="hyperlink"
                      to={
                        iposted
                          ? `/profile/${post.postedTo._id}`
                          : ireceived
                          ? `/profile/${post.postedBy._id}`
                          : ''
                      }
                    >
                      {iposted
                        ? post.postedTo.userName
                        : ireceived
                        ? post.postedBy.userName
                        : 'Unknown User'}
                    </Link>
                  }
                  subheader={moment(post.createdAt).fromNow()}
                />
                <CardContent style={{ minHeight: '300px !important' }}>
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
                              {post.positive
                                ? post.positive
                                : 'No comments added'}
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
                              {post.negative
                                ? post.negative
                                : 'No comments added'}
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
                              {post.advice ? post.advice : 'No comments added'}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <span style={{ fontSize: 13, color: '#606770' }}>
                    {post.likes > 0 ? formateNumber(post.likes) : 0} Likes
                  </span>
                  <span style={{ fontSize: 13, color: '#606770' }}>
                    {formateNumber(post.disLikes)} Dislikes
                  </span>
                  {/* <Badge showZero color="primary" style={{marginRight: 50}} badgeContent={post.likes > 0 ? formateNumber(post.likes): 0} >
				        <LikeIcon/>
				      </Badge>
				      <Badge showZero badgeContent={formateNumber(post.disLikes)}>
				        <DisLikeIcon />
				      </Badge> */}
                </CardActions>
              </Card>
            ))
          : null}
        {!postsLoading && !posts.length ? (
          <Typography variant="h3" className="text-center">
            {iposted
              ? `You haven't posted to others`
              : `You haven't received posts `}
          </Typography>
        ) : null}
        {postsLoading ? <Loader /> : null}
        {postsError && postsError.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={postsError.get('message')}
            status={'error'}
          />
        ) : null}
      </React.Fragment>
    )
  }
}

PostList.propTypes = {}

const mapStateToProps = state => {
  const deletePostSuccess = state.getIn(
    ['Dashboard', 'post', 'delete', 'success'],
    Map(),
  )
  const deletePostError = state.getIn(
    ['Dashboard', 'post', 'delete', 'errors'],
    Map(),
  )
  const deletePostLoading = state.getIn(
    ['Dashboard', 'post', 'delete', 'loading'],
    Map(),
  )
  const posts = state.getIn(['Dashboard', 'posts', 'success'], Map())
  const postsLoading = state.getIn(['Dashboard', 'posts', 'loading'], false)
  const postsError = state.getIn(['Dashboard', 'posts', 'errors'], Map())
  return {
    posts,
    postsError,
    postsLoading,
    deletePostSuccess,
    deletePostError,
    deletePostLoading,
  }
}

const actionsToProps = {
  getPostsByUser: actions.getPostsByUser,
  deletePost: actions.deletePost,
  getPostsPostedByUser: actions.getPostsPostedByUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(PostList))
