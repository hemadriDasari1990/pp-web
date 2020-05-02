import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Loader from '../../Loader/components/Loader'
import * as actions from '../actions'
import { Map, fromJS } from 'immutable'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import getReaction from '../../../util/getReaction'
import renderUserNames from '../../../util/renderUserNames'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import formateNumber from '../../../util/formateNumber'
import { getCardSubHeaderStatus } from '../../../util/getCardSubHeaderText'
import Button from '@material-ui/core/Button'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import getPastTime from '../../../util/getPastTime'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const styles = {
  smallAvatar: {
    width: 20,
    height: 20,
    borderColor: '#fff',
  },
}

class RecentPosts extends Component {
  componentDidMount() {
    if (!this.props.match.params.id) {
      this.props.getRecentPosts(this.props.user._id)
    }
    if (this.props.match.params.id) {
      this.props.getRecentPosts(this.props.match.params.id)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //this.props.getIncomingPosts(this.props.user._id)
  }

  viewPost = postId => {
    this.props.history.push(`/post/${postId}/details`)
  }

  handleCommentMenu = () => {}

  render() {
    const {
      classes,
      recentPosts,
      recentPostsError,
      recentPostsLoading,
      user,
    } = this.props
    return (
      <React.Fragment>
        <Card>
          <CardHeader
            title="Most Recent Posts"
            action={
              <a>
                Shown upto <b>5</b> posts
              </a>
            }
          ></CardHeader>
          <CardContent>
            <List>
              {!recentPostsLoading && recentPosts.length
                ? recentPosts.map(post => (
                    <ListItem key={post._id} alignItems="flex-start">
                      <ListItemAvatar>
                        {!post.isAnonymous ? (
                          <Avatar
                            alt={post.postedBy.userName}
                            src={post.postedBy.photoURL}
                          />
                        ) : (
                          <Avatar
                            style={{
                              color: '#ffffff',
                              backgroundColor: '#2a7fff',
                            }}
                          >
                            A
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <Tooltip
                        title={
                          post.approved
                            ? 'Accepted'
                            : post.rejected
                            ? 'Rejected'
                            : 'Pending'
                        }
                        placement="right-end"
                      >
                        <ListItemText
                          primary={
                            !post.isAnonymous ? (
                              <>
                                <Link
                                  className="hyperlink"
                                  to={`/profile/${post.postedBy._id}`}
                                >
                                  {user && user._id === post.postedBy._id
                                    ? 'You'
                                    : post.postedBy.userName}
                                </Link>
                              </>
                            ) : (
                              <b className="hyperlink">Annonymous User </b>
                            )
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {post.pros}
                              </Typography>
                              <br />
                            </React.Fragment>
                          }
                        />
                      </Tooltip>
                      <ListItemSecondaryAction className="t-37 r-5">
                        <Typography
                          component="span"
                          variant="body2"
                          className={
                            post.approved
                              ? 'approved ' + 'mr-10 reactions-subheader'
                              : post.rejected
                              ? 'rejected ' + 'mr-10 reactions-subheader'
                              : 'pending ' + 'mr-10 reactions-subheader'
                          }
                        >
                          {getCardSubHeaderStatus(post)}
                        </Typography>
                        <small className="grey-color ">
                          {getPastTime(post.updatedAt)}
                        </small>
                        <Tooltip title="Action">
                          <IconButton
                            aria-label="settings"
                            onClick={this.handleCommentMenu}
                          >
                            <MoreHorizIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                : null}

              {!recentPostsLoading && !recentPosts.length && (
                <Typography variant="h4" className="text-center">
                  No Recent Posts
                </Typography>
              )}

              {recentPostsLoading && !recentPosts.length && <Loader />}
            </List>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

RecentPosts.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const recentPosts = state.getIn(['Timeline', 'recent', 'success'], Map())
  const recentPostsLoading = state.getIn(
    ['Timeline', 'recent', 'loading'],
    false,
  )
  const recentPostsError = state.getIn(['Timeline', 'recent', 'errors'], Map())
  return {
    recentPosts,
    recentPostsError,
    recentPostsLoading,
  }
}

const actionsToProps = {
  getRecentPosts: actions.getRecentPosts,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(RecentPosts)),
)
