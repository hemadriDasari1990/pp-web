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
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Loader from '../../Loader/components/Loader'
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
import { Link } from 'react-router-dom'

class TopPosts extends Component {
  componentDidMount() {
    if (!this.props.match.params.id) {
      this.props.getPostsByUser(this.props.user.uid, false, true)
    }
    if (this.props.match.params.id) {
      this.props.getPostsByUser(this.props.match.params.id, false, true)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.iposted && this.props.iposted != prevProps.iposted) {
      this.props.getPostsByUser(this.props.user.uid, true, false)
    }
    if (this.props.ireceived && this.props.ireceived != prevProps.ireceived) {
      this.props.getPostsByUser(this.props.user.uid, false, true)
    }
  }

  render() {
    const {
      classes,
      posts,
      postsError,
      postsLoading,
      iposted,
      ireceived,
    } = this.props
    return (
      <React.Fragment>
        <Card style={{ width: '100%', maxWidth: '100%' }}>
          <CardHeader title="Popular Posts"></CardHeader>
          <CardContent>
            <List>
              {!postsLoading && posts.filter(p => p.approved).slice(0, 5).length
                ? posts
                    .filter(p => p.approved)
                    .slice(0, 5)
                    .map(post => (
                      <ListItem key={post._id} alignItems="flex-start">
                        <ListItemAvatar>
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
                        </ListItemAvatar>
                        <Tooltip title={post.positive} placement="right-end">
                          <ListItemText
                            primary={post.postedBy.userName}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textPrimary"
                                >
                                  {post.positive.length > 40
                                    ? post.positive.substring(0, 40) + '...'
                                    : post.positive}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </Tooltip>
                        <Tooltip title="Approved" placement="right-end">
                          <IconButton style={{ color: '#17ab13' }}>
                            <BookmarkIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                    ))
                : null}
              {!postsLoading && !posts.length && (
                <Typography variant="h4" className="text-center">
                  You haven't got popular posts yet
                </Typography>
              )}
              {postsLoading && !posts.length && <Loader />}
            </List>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

TopPosts.propTypes = {}

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
  getPostsByUser: actions.getPostsByUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(TopPosts))
