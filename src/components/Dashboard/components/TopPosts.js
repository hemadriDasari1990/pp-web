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

class TopPosts extends Component {
  componentDidMount() {
    if (!this.props.match.params.id) {
      this.props.getPostsByUser(this.props.user._id, false, true)
    }
    if (this.props.match.params.id) {
      this.props.getPostsByUser(this.props.match.params.id, false, true)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.iposted && this.props.iposted != prevProps.iposted) {
      this.props.getPostsByUser(this.props.user._id, true, false)
    }
    if (this.props.ireceived && this.props.ireceived != prevProps.ireceived) {
      this.props.getPostsByUser(this.props.user._id, false, true)
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
      user,
    } = this.props
    return (
      <React.Fragment>
        <Card style={{ width: '100%', maxWidth: '100%' }}>
          <CardHeader title="Popular Posts"></CardHeader>
          <CardContent>
            <List>
              {!postsLoading &&
              posts.length &&
              posts.filter(p => p.approved).slice(0, 5).length ? (
                posts
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
                      <Tooltip title={post.pros} placement="right-end">
                        <ListItemText
                          primary={
                            user && user._id === post.postedBy._id
                              ? 'You'
                              : post.postedBy.userName
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
                      <Tooltip title="Approved" placement="right-end">
                        <IconButton style={{ color: '#17ab13' }}>
                          <BookmarkIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                  ))
              ) : (
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
