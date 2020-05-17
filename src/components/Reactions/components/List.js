import * as postActions from '../../Post/actions'
import * as userProfileActions from '../../UserProfile/actions'

import React, { Component } from 'react'

import AskIcon from '@material-ui/icons/PlaylistAddRounded'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import FollowIcon from '@material-ui/icons/RssFeedOutlined'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import { Map } from 'immutable'
import Slide from '@material-ui/core/Slide'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { getCardSubHeaderProfileSummary } from '../../../util/getCardSubHeaderText'
import getProvider from '../../../util/getProvider'
import getReaction from '../../../util/getReaction'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  smallAvatar: {
    top: '150%',
    width: 22,
    height: 22,
  },
  customBadge: {
    backgroundColor: 'unset !important',
  },
}

class ReactionsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      follower: undefined,
      reactions: [],
    }
  }
  componentDidMount() {
    if (this.props.postId) {
      this.props.getReactions(this.props.type, this.props.postId).then(res => {
        this.setState({
          reactions: res.data,
        })
      })
    }
  }

  handleFollow = async (user, index) => {
    const data = {
      follower: this.props.user._id,
      followee: user._id,
    }
    const reactions = [...this.state.reactions]
    const reaction = reactions[index]
    await this.props.createOrUpdateProfileFollower(data).then(async res => {
      if (!res.data.data) {
        const followers = reaction.user.followers.filter(
          f => f.follower._id !== this.props.user._id,
        )
        reaction.user.followers = followers
        reaction.user.no_of_followers = --reaction.user.no_of_followers
      } else {
        await this.props
          .getProfileFollower(this.props.user._id, user._id)
          .then(followerRes => {
            const follower = followerRes.data
            reaction.user.no_of_followers = ++reaction.user.no_of_followers
            reaction.user.followers.push(follower)
          })
      }
      reactions[index] = reaction
      this.setState(
        {
          reactions,
        },
        () => {},
      )
    })
  }

  renderFollowerColor = followers => {
    if (!followers) {
      return
    }
    return followers.filter(f => f.follower._id === this.props.user._id).length
      ? 'primary'
      : ''
  }

  ifSameUser = reaction => {
    return reaction.user._id === this.props.user._id ? true : false
  }

  render() {
    const { classes, reactionsError, reactionsLoading, user } = this.props
    const { follower, reactions } = this.state
    return (
      <div>
        {!reactionsLoading && reactions.length ? (
          <div className="text-center m-2">
            <Typography variant="h3">People who Reacted</Typography>
          </div>
        ) : null}
        {!reactionsLoading && !reactions.length && (
          <div className="text-center m-2">
            <Typography variant="h3">No reactions found</Typography>
          </div>
        )}
        <List>
          <div className="row mt-10">
            {!reactionsLoading
              ? reactions.map((r, index) => (
                  <Zoom key={r._id} in={true} timeout={2000}>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <ListItem
                        key={r._id}
                        alignItems="flex-start"
                        className="shadow b-r-15 cursor mb-10"
                      >
                        <ListItemAvatar>
                          <Badge
                            classes={{ badge: classes.customBadge }}
                            overlap="circle"
                            badgeContent={
                              <Avatar
                                className={classes.smallAvatar}
                                key={r._id}
                                alt={r.user ? r.user.userName : ''}
                                style={{
                                  backgroundColor:
                                    r.type.toLowerCase() === 'love' ||
                                    r.type.toLowerCase() === 'profile-love'
                                      ? '#ff0016c7'
                                      : '',
                                }}
                              >
                                {getReaction(r ? r.type : '')}
                              </Avatar>
                            }
                          >
                            <Avatar
                              alt={
                                r.user ? r.user.userName.substring(0, 1) : ''
                              }
                              src={r.user.photoURL}
                            />
                          </Badge>
                        </ListItemAvatar>
                        <Tooltip title={r.type} placement="top">
                          <ListItemText
                            primary={
                              <>
                                <Link
                                  className="hyperlink"
                                  to={`/profile/${r.user._id}`}
                                >
                                  {user && user._id === r.user._id
                                    ? 'You'
                                    : r.user.userName}
                                </Link>
                                &nbsp;
                                {getProvider(r.user.providerId)}
                              </>
                            }
                            secondary={
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {getCardSubHeaderProfileSummary(r.user)}
                              </Typography>
                            }
                          />
                        </Tooltip>
                        {!this.ifSameUser(r) ? (
                          <ListItemSecondaryAction>
                            <Tooltip
                              title="Ask For Opinion"
                              placement="right-end"
                            >
                              <IconButton>
                                <AskIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Follow User" placement="right-end">
                              <IconButton
                                onClick={() => this.handleFollow(r.user, index)}
                                color={this.renderFollowerColor(
                                  r.user.followers,
                                )}
                              >
                                <Slide
                                  direction="left"
                                  in={true}
                                  timeout={1500}
                                  mountOnEnter
                                  unmountOnExit
                                >
                                  <FollowIcon />
                                </Slide>
                              </IconButton>
                            </Tooltip>
                          </ListItemSecondaryAction>
                        ) : null}
                      </ListItem>
                    </div>
                  </Zoom>
                ))
              : null}
            {reactionsLoading && !reactions.length && <Loader />}
          </div>
        </List>
      </div>
    )
  }
}

ReactionsList.propTypes = {}

const mapStateToProps = state => {
  const reactions = state.getIn(['Post', 'reactions', 'success'], Map())
  const reactionsLoading = state.getIn(['Post', 'reactions', 'loading'], false)
  const reactionsError = state.getIn(['Post', 'reactions', 'errors'], Map())
  const user = state.getIn(['user', 'data'])
  const profileFollower = state.getIn(
    ['UserProfile', 'follower', 'get', 'success'],
    Map(),
  )
  const postId = state.getIn(['Timeline', 'post', 'id', 'save'])
  return {
    profileFollower,
    reactions,
    reactionsLoading,
    reactionsError,
    user,
    postId,
  }
}

const actionsToProps = {
  getReactions: postActions.getReactions,
  createOrUpdateProfileFollower:
    userProfileActions.createOrUpdateProfileFollower,
  getProfileFollower: userProfileActions.getProfileFollower,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(ReactionsList)),
)
