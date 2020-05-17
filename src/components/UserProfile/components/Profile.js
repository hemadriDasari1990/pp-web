import * as actions from '../actions'
import * as globalActions from '../../../actions/index'

import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import FollowIcon from '@material-ui/icons/RssFeedOutlined'
import IconButton from '@material-ui/core/IconButton'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import LoveIcon from '@material-ui/icons/Favorite'
import { Map } from 'immutable'
import Slide from '@material-ui/core/Slide'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import getPastTime from '../../../util/getPastTime'
import isUserActive from '../../../util/isUserActive'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  followIcon: {
    width: 150,
    backgroundColor: '#ebf0ff',
    color: '#2b7eff',
    borderRadius: 25,
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    left: '33% !important',
  },
}

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileUser: this.props.profileUser,
    }
  }

  componentDidMount() {
    this.props.user && this.props.profileUser
      ? this.props.getProfileReaction(
          this.props.profileUser._id,
          this.props.user._id,
        )
      : null

    this.props.user && this.props.profileUser
      ? this.props.getProfileFollower(
          this.props.user._id,
          this.props.profileUser._id,
        )
      : null
  }

  handleReaction = async type => {
    const data = {
      likedBy: this.props.user._id,
      user: this.props.profileUser._id,
      type,
    }
    await this.props.createOrUpdateProfileReaction(data).then(async res => {
      await this.props.getProfileReaction(
        this.props.profileUser._id,
        this.props.user._id,
      )
      await this.props.getUser(this.props.match.params.id).then(res => {
        this.setState({
          profileUser: res.data ? res.data.user : {},
        })
      })
    })
  }

  handleFollow = async () => {
    const data = {
      follower: this.props.user._id,
      followee: this.props.profileUser._id,
    }
    await this.props.createOrUpdateProfileFollower(data).then(async res => {
      await this.props.getProfileFollower(
        this.props.user._id,
        this.props.profileUser._id,
      )
      await this.props.getUser(this.props.match.params.id).then(res => {
        this.setState({
          profileUser: res.data ? res.data.user : {},
        })
      })
    })
  }

  render() {
    const { classes, user, profileReaction, profileFollower } = this.props
    const { open, anchorEl, profileUser } = this.state
    const loved =
      profileReaction &&
      profileReaction.type === 'love' &&
      profileReaction.likedBy._id === user._id
    const liked =
      profileReaction &&
      profileReaction.type === 'like' &&
      profileReaction.likedBy._id === user._id
    const following =
      profileFollower &&
      profileFollower.follower &&
      profileFollower.follower._id === user._id
    const isActive = profileUser
      ? isUserActive(profileUser.lastActiveTime)
      : false
    const isSameUser =
      user && profileUser && user._id === profileUser._id ? true : false
    return (
      <>
        <Card>
          <CardContent>
            {profileUser && user && profileUser._id != user._id && (
              <div className="row f-r">
                <Tooltip title="Love">
                  <IconButton
                    className="f-r"
                    aria-label="settings"
                    style={{ color: loved ? '#ff0016c7' : '#0c0b0b5e' }}
                    onClick={() => this.handleReaction('love', profileUser._id)}
                  >
                    <LoveIcon className="icon-display" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Like">
                  <IconButton
                    aria-label="settings"
                    className="f-r"
                    style={{ color: liked ? '#2a7fff' : '#0c0b0b5e' }}
                    onClick={() => this.handleReaction('like', profileUser._id)}
                  >
                    <LikeIcon className="icon-display" />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </CardContent>
          <CardContent className="text-center">
            <Zoom in={true} timeout={2000}>
              <Avatar
                className="profile"
                alt={profileUser.userName}
                src={profileUser.photoURL}
              />
            </Zoom>
            <Slide
              direction="left"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <h5>{isSameUser ? 'You' : profileUser.userName}</h5>
            </Slide>
            <Zoom in={true} timeout={2000}>
              <div>
                {!isActive ? (
                  <small>
                    {' Last Active '}
                    <b style={{ color: '#2b7eff' }}>
                      {getPastTime(profileUser.lastActiveTime)}
                    </b>{' '}
                    {' ago'}
                  </small>
                ) : (
                  <b style={{ color: '#1ad01a' }}>Active Now</b>
                )}
              </div>
            </Zoom>
            {profileUser && user && profileUser._id != user._id && (
              <div className="mt-25">
                <Tooltip title={following ? 'Following' : 'Follow'}>
                  <Button
                    variant="extended"
                    className={classes.followIcon}
                    startIcon={<FollowIcon color="primary" />}
                    onClick={() => this.handleFollow()}
                  >
                    {following ? 'Following' : 'Follow'}
                  </Button>
                </Tooltip>
              </div>
            )}
          </CardContent>
          <Divider />
          <CardActions className="mt-10 p-0 fl-justify-content">
            <div className="row">
              <div className="col align-self-start text-center">
                <Tooltip title="No of People Liked">
                  <Fab
                    color="inherit"
                    size="small"
                    aria-label="preferences"
                    color="primary"
                  >
                    <LikeIcon />
                  </Fab>
                </Tooltip>
                <Slide
                  direction="right"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <p className="title">
                    {formateNumber(profileUser.no_of_likes)}
                  </p>
                </Slide>
                <div className="followers">Likes</div>
              </div>
              <div className="col align-self-center text-center">
                <Tooltip title="No of People Loves">
                  <Fab size="small" aria-label="love" color="primary">
                    <LoveIcon />
                  </Fab>
                </Tooltip>
                <Zoom in={true} timeout={2000}>
                  <p className="title">
                    {formateNumber(profileUser.no_of_loves)}
                  </p>
                </Zoom>
                <div className="followers">Loved</div>
              </div>
              <div className="col align-self-end text-center">
                <Tooltip title="Followers">
                  <Fab size="small" aria-label="followers" color="primary">
                    <FollowIcon color="#fff" />
                  </Fab>
                </Tooltip>
                <Slide
                  direction="left"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <p className="title">
                    {formateNumber(profileUser.no_of_followers)}
                  </p>
                </Slide>
                <div className="followers">Followers</div>
              </div>
            </div>
          </CardActions>
        </Card>
      </>
    )
  }
}

Profile.propTypes = {}

const mapStateToProps = state => {
  const profileReaction = state.getIn(
    ['UserProfile', 'userlike', 'get', 'success'],
    Map(),
  )
  const profileFollower = state.getIn(
    ['UserProfile', 'follower', 'get', 'success'],
    Map(),
  )
  const user = state.getIn(['user', 'data'])
  return {
    user,
    profileReaction,
    profileFollower,
  }
}

const actionsToProps = {
  createOrUpdateProfileReaction: actions.createOrUpdateProfileReaction,
  getProfileReaction: actions.getProfileReaction,
  getUser: globalActions.getUser,
  createOrUpdateProfileFollower: actions.createOrUpdateProfileFollower,
  getProfileFollower: actions.getProfileFollower,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Profile)),
)
