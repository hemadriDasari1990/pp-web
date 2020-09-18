import * as actions from '../actions'

import { Link, withRouter } from 'react-router-dom'
import React, { Component, Suspense } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import SkeletonListCard from '../../Skeletons/components/ListCard'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import ViewIcon from '@material-ui/icons/Visibility'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { getCardSubHeaderStatus } from '../../../util/getCardSubHeaderText'
import getPastTime from '../../../util/getPastTime'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  smallAvatar: {
    width: 20,
    height: 20,
    borderColor: '#fff',
  },
}

class RecentPosts extends Component {
  componentDidMount() {
    // if (!this.props.match.params.id && this.props.user) {
    //   this.props.getRecentPosts(this.props.user._id)
    // }
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
      <Suspense fallback={<Loader />}>
        {recentPostsLoading ? (
          <SkeletonListCard />
        ) : (
          <List>
            {!recentPostsLoading && recentPosts.length
              ? recentPosts.map(post => (
                  <Grid item lg={4} key={post._id}>
                    <ListItem className="p-1 w-us" alignItems="flex-start">
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
                              backgroundColor: '#5383ff',
                            }}
                          >
                            A
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <Tooltip
                        title={
                          post.isAnonymous
                            ? 'Annonymous User'
                            : post.postedBy.userName
                        }
                        placement="top"
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
                                    : post.postedBy.userName.substring(0, 15) +
                                      '...'}
                                </Link>
                              </>
                            ) : (
                              <b className="hyperlink">Annonymous ... </b>
                            )
                          }
                          secondary={
                            <div className="mt-minus-10">
                              <small className="grey-color">
                                {getPastTime(post.createdAt)}
                              </small>
                              &nbsp;
                              <span
                                className={
                                  post.approved
                                    ? 'status accepted ' + 'mr-10'
                                    : post.rejected
                                    ? 'status rejected ' + 'mr-10'
                                    : 'status pending ' + 'mr-10'
                                }
                              >
                                {getCardSubHeaderStatus(post)}
                              </span>
                            </div>
                          }
                        />
                      </Tooltip>
                      <ListItemSecondaryAction>
                        <Button
                          variant="containedPrimary"
                          color="default"
                          size="medium"
                          onClick={() => this.viewPost(post._id)}
                          startIcon={<ViewIcon />}
                        >
                          View
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Grid>
                ))
              : null}

            {!recentPostsLoading && !recentPosts.length && (
              <Zoom in={true} timeout={2000}>
                <Typography variant="h4" className="text-center">
                  No Recent Posts
                </Typography>
              </Zoom>
            )}
          </List>
        )}
      </Suspense>
    )
  }
}

RecentPosts.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  // const user = state.getIn(['user', 'data'])
  const recentPosts = state.getIn(['Timeline', 'recent', 'success'], Map())
  const recentPostsLoading = state.getIn(
    ['Timeline', 'recent', 'loading'],
    false,
  )
  const recentPostsError = state.getIn(['Timeline', 'recent', 'errors'], Map())
  const profile = state.getIn(['user', 'success'])
  return {
    recentPosts,
    recentPostsError,
    recentPostsLoading,
    user: profile ? profile.user : undefined,
  }
}

const actionsToProps = {
  getRecentPosts: actions.getRecentPosts,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(RecentPosts)),
)
