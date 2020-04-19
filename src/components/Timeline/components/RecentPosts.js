import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Loader from '../../Loader/components/Loader'
import * as actions from '../actions'
import { Map, fromJS } from 'immutable'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import { Link } from 'react-router-dom'
import getReaction from '../../../util/getReaction'
import renderUserNames from '../../../util/renderUserNames'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import formateNumber from '../../../util/formateNumber'

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

  render() {
    const {
      classes,
      recentPosts,
      recentPostsError,
      recentPostsLoading,
      iposted,
      ireceived,
      user,
    } = this.props
    console.log('RecentPosts', recentPosts)
    return (
      <React.Fragment>
        <Card style={{ width: '100%', maxWidth: '100%' }}>
          <CardHeader title="Most Recent Posts"></CardHeader>
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
                              backgroundColor: '#1976d2',
                            }}
                          >
                            A
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <Tooltip title={post.providerId} placement="right-end">
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
                                <span
                                  className={
                                    post.approved
                                      ? 'status approved ml-7'
                                      : post.rejected
                                      ? 'status rejected ml-7'
                                      : 'status pending ml-7'
                                  }
                                ></span>
                                {/* {post.postedBy.likes.length
                                  ? ' ' +
                                    formateNumber(post.postedTo.likes.length) +
                                    ' Liked'
                                  : ''} */}
                              </>
                            ) : (
                              <b className="hyperlink">
                                Annonymous User{' '}
                                <span
                                  className={
                                    post.approved
                                      ? 'status approved'
                                      : post.rejected
                                      ? 'status rejected'
                                      : 'status pending'
                                  }
                                ></span>
                              </b>
                            )
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {post.pros.length > 40
                                  ? post.pros.substring(0, 40) + '...'
                                  : post.pros}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </Tooltip>
                      <div className="row">
                        <AvatarGroup style={{ marginTop: 6 }}>
                          {post.reactions.length > 0
                            ? post.reactions.slice(0, 3).map(react => (
                                <Tooltip
                                  title={renderUserNames(post.reactions)}
                                  placement="bottom"
                                >
                                  <Avatar
                                    className={classes.smallAvatar}
                                    key={react._id}
                                    alt={react.type}
                                    src={getReaction(react ? react.type : '')}
                                  />
                                </Tooltip>
                              ))
                            : ''}
                        </AvatarGroup>
                        {post.reactions.length > 0 ? (
                          <>
                            <Tooltip
                              title={renderUserNames(post.reactions)}
                              placement="bottom"
                            >
                              <Link
                                style={{ marginTop: 6 }}
                                className="mr-20"
                                to={`/post/${post._id}/reactions`}
                                className="actions-text"
                              >
                                <span>
                                  {formateNumber(post.reactions.length)}
                                </span>
                              </Link>
                            </Tooltip>
                            <Avatar
                              style={{ marginTop: 6 }}
                              className={classes.smallAvatar}
                              alt="Image Not Available"
                              src={getReaction('share')}
                            />
                            <Link
                              style={{ marginTop: 6 }}
                              to={`/post/${post._id}/shares`}
                              className="actions-text"
                            >
                              <span>
                                {post.shares.length
                                  ? formateNumber(post.shares.length)
                                  : 'No'}{' '}
                              </span>
                            </Link>
                          </>
                        ) : (
                          'No Reactions'
                        )}
                      </div>
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
