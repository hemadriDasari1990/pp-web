import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import LikeIcon from '@material-ui/icons/ThumbUp'
import DisLikeIcon from '@material-ui/icons/ThumbDown'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import moment from 'moment'
import MoodIcon from '@material-ui/icons/Mood'
import MoodBadIcon from '@material-ui/icons/MoodBad'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import * as actions from '../actions'
import { Map } from 'immutable'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import { Link } from 'react-router-dom'
import * as dashboardActions from '../../Dashboard/actions'
import Loader from '../../Loader/components/Loader'

class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likesCount: 0,
      disLikesCount: 0,
    }
  }

  componentDidMount() {
    this.props.getPostsByUser(this.props.match.params.id, false, true)
  }

  handleApproved = event => {}

  createOrUpdateReaction = (userId, postId) => {
    this.props.createOrUpdateReaction(userId, postId).then(data => {
      this.setState({
        likesCount: data.data.likes,
        disLikesCount: data.data.disLikes,
      })
    })
  }

  handleMenuItem = (text, postId) => {}
  render() {
    const { classes, posts, postsError, postsLoading, user } = this.props
    const { likesCount, disLikesCount, open } = this.state
    const likeIco = <LikeIcon />
    const disLikeIco = <DisLikeIcon />
    return (
      <React.Fragment>
        {user && posts.length
          ? posts
              .filter(p => p.approved)
              .map(post => (
                <Card key={post._id}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt={
                          post.postedBy.userName
                            ? post.postedBy.userName.substring(1, 1)
                            : 'Image not Available'
                        }
                        src={post.postedBy.photoURL}
                      />
                    }
                    title={
                      <Link
                        className="hyperlink"
                        to={`/profile/${post.postedBy._id}`}
                      >
                        {post.postedBy.userName}
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
                  <CardActions style={{ height: 10 }} disableSpacing>
                    <Typography display="block" gutterBottom>
                      {formateNumber(
                        post.likes > 0
                          ? post.likes
                          : likesCount
                          ? likesCount
                          : 0,
                      )}{' '}
                      Likes
                    </Typography>
                  </CardActions>
                  <Divider variant="middle" />
                  <CardActions>
                    <Tooltip title="Like">
                      <IconButton
                        aria-label="like"
                        onClick={() =>
                          this.createOrUpdateReaction(user.uid, post._id)
                        }
                      >
                        <LikeIcon
                          color={
                            post.postDetails &&
                            post.postDetails.filter(d => d.userId == user.uid)
                              .length
                              ? 'primary'
                              : ''
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <span className="span-name">Like</span>
                  </CardActions>
                  {post.likes === 0 && <Divider variant="middle" />}
                  <CardActions>
                    {post.likes == 0 && (
                      <Typography paragraph>
                        Be the first person to like this
                      </Typography>
                    )}
                  </CardActions>
                </Card>
              ))
          : null}
        {!posts.length ||
        (posts.length && !posts.filter(p => p.approved).length) ? (
          <Typography variant="h3" className="text-center">
            No Approved posts found to show
          </Typography>
        ) : null}
        {postsLoading ? <Loader /> : null}
      </React.Fragment>
    )
  }
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const posts = state.getIn(['Dashboard', 'posts', 'success'], Map())
  const postsLoading = state.getIn(['Dashboard', 'posts', 'loading'], false)
  const postsError = state.getIn(['Dashboard', 'posts', 'errors'], Map())
  return {
    posts,
    postsError,
    postsLoading,
  }
}

const actionsToProps = {
  createOrUpdateReaction: actions.createOrUpdateReaction,
  getPostsByUser: dashboardActions.getPostsByUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(PostList))
