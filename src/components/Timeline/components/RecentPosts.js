import * as actions from '../actions'

import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Fab from '@material-ui/core/Fab'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import { Map } from 'immutable'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import PropTypes from 'prop-types'
import SkeletonListCard from '../../Skeletons/components/ListCard'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { getCardSubHeaderStatus } from '../../../util/getCardSubHeaderText'
import getPastTime from '../../../util/getPastTime'
import { withRouter } from 'react-router-dom'
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
    if (!this.props.match.params.id && this.props.user) {
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
        {recentPostsLoading ? (
          <SkeletonListCard />
        ) : (
          <Card>
            <CardHeader
              title="Most Recent Posts"
              action={<a>View All</a>}
            ></CardHeader>
            <CardContent
              className={recentPosts && recentPosts.length ? 'p-0' : 'p-3'}
            >
              <List>
                {!recentPostsLoading && recentPosts.length
                  ? recentPosts.map(post => (
                      <ListItem
                        key={post._id}
                        className="p-1 w-us"
                        alignItems="flex-start"
                      >
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
                                      : post.postedBy.userName.substring(
                                          0,
                                          15,
                                        ) + '...'}
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
                          <Fab
                            color="primary"
                            variant="outlined"
                            size="small"
                            onClick={() => this.viewPost(post._id)}
                          >
                            View Post
                          </Fab>
                        </ListItemSecondaryAction>
                      </ListItem>
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
            </CardContent>
          </Card>
        )}
      </React.Fragment>
    )
  }
}

RecentPosts.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const recentPosts = state.getIn(['Timeline', 'recent', 'success'], Map())
  const recentPostsLoading = state.getIn(
    ['Timeline', 'recent', 'loading'],
    false,
  )
  const recentPostsError = state.getIn(['Timeline', 'recent', 'errors'], Map())
  return {
    user,
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
