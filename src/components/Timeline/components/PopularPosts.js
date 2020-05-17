import * as actions from '../actions'

import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import { Map } from 'immutable'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
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

class PopularPosts extends Component {
  componentDidMount() {
    if (this.props.user && !this.props.match.params.id) {
      this.props.getPopularPosts(this.props.user._id, this.props.type)
    }
    if (this.props.match.params.id) {
      this.props.getPopularPosts(this.props.match.params.id, this.props.type)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //this.props.getpopularPosts(this.props.user._id)
  }

  render() {
    const {
      classes,
      popularPosts,
      popularPostsError,
      popularPostsLoading,
      iposted,
      ireceived,
      user,
    } = this.props
    return (
      <React.Fragment>
        <Card>
          <CardHeader
            title="Popular Posts"
            action={<a>View All</a>}
          ></CardHeader>
          <CardContent>
            <List>
              {!popularPostsLoading &&
              popularPosts.length &&
              popularPosts.filter(p => p.approved).slice(0, 5).length ? (
                popularPosts
                  .filter(p => p.approved)
                  .slice(0, 5)
                  .map(post => (
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
                                {post.type === 'Generic'
                                  ? post.message.substring(0, 45) + '...'
                                  : ''}
                                {post.type === 'Opinion' ? (
                                  <>
                                    <b>Pros&nbsp;-&nbsp;</b>{' '}
                                    {post.pros.substring(0, 45)} + '...'
                                  </>
                                ) : (
                                  ''
                                )}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </Tooltip>
                      <ListItemSecondaryAction
                        style={{ top: '28%' }}
                        className="r-5"
                      >
                        <Typography
                          component="span"
                          variant="body2"
                          className={
                            post.approved
                              ? 'status accepted ' + 'mr-10'
                              : post.rejected
                              ? 'status rejected ' + 'mr-10'
                              : 'status pending ' + 'mr-10'
                          }
                        >
                          {getCardSubHeaderStatus(post)}
                        </Typography>
                        <small className="grey-color ">
                          {getPastTime(post.createdAt)}
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
              ) : (
                <Zoom in={true} timeout={2000}>
                  <Typography variant="h4" className="text-center">
                    No Popular Posts
                  </Typography>
                </Zoom>
              )}

              {popularPostsLoading && !popularPosts.length && <Loader />}
            </List>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

PopularPosts.propTypes = {}

const mapStateToProps = state => {
  const popularPosts = state.getIn(['Timeline', 'popular', 'success'], Map())
  const popularPostsLoading = state.getIn(
    ['Timeline', 'popular', 'loading'],
    false,
  )
  const popularPostsError = state.getIn(
    ['Timeline', 'popular', 'errors'],
    Map(),
  )
  return {
    popularPosts,
    popularPostsError,
    popularPostsLoading,
  }
}

const actionsToProps = {
  getPopularPosts: actions.getPopularPosts,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(PopularPosts)),
)
