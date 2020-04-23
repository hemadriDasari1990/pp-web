import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'
import userLike from '../../../../assets/user-like.svg'
import love from '../../../../assets/love.svg'
import Tooltip from '@material-ui/core/Tooltip'
import * as actions from '../actions'
import LoveIcon from '../../SvgIcons/components/Love'
import LikeIcon from '../../SvgIcons/components/Like'
import Button from '@material-ui/core/Button'
import FollowIcon from '../../SvgIcons/components/Follow'
import * as globalActions from '../../../actions/index'
import formateNumber from '../../../util/formateNumber'
import FollowingIcon from '../../SvgIcons/components/Following'

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
    return (
      <>
        <Card style={{ width: '100%', maxWidth: '100%' }}>
          <CardContent>
            <div className="row f-r">
              <Tooltip title="Love">
                <IconButton
                  className="f-r"
                  aria-label="settings"
                  onClick={() => this.handleReaction('love', profileUser._id)}
                >
                  <LoveIcon
                    className="icon-display"
                    color={loved ? '#f10571' : '#6c757d'}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Like">
                <IconButton
                  aria-label="settings"
                  className="f-r"
                  onClick={() => this.handleReaction('like', profileUser._id)}
                >
                  <LikeIcon
                    className="icon-display"
                    color={liked ? '#2a7fff' : '#6c757d'}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <Avatar
              className="profile"
              alt={profileUser.userName}
              src={profileUser.photoURL}
            />
            <h5 className="text-center">{profileUser.userName}</h5>
            <div className="text-center">
              {' '}
              {profileUser.providerId === 'google.com'
                ? 'A Google User'
                : 'A Facebook User'}
            </div>
            <br />
            <div className="text-center">
              <Tooltip title={following ? 'Following' : 'Follow'}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ backgroundColor: '#fff' }}
                  startIcon={
                    following ? (
                      <FollowingIcon color="#2a7fff" />
                    ) : (
                      <FollowIcon />
                    )
                  }
                  onClick={() => this.handleFollow()}
                >
                  {following ? 'Following' : 'Follow'}
                </Button>
              </Tooltip>
            </div>
            <br />
          </CardContent>
          <Divider />
          <CardActions className="mt-10 p-0">
            <div className="text-center ml-25">
              <Tooltip title="No of People Liked">
                <Fab
                  color="inherit"
                  size="small"
                  aria-label="preferences"
                  color="primary"
                >
                  <Avatar style={{ width: 30, height: 30 }} src={userLike} />
                </Fab>
              </Tooltip>
              <p className="title">{formateNumber(profileUser.no_of_likes)}</p>
              <div className="followers">Likes</div>
            </div>
            <div className="text-center ml-25">
              <Tooltip title="No of People Loves">
                <Fab
                  color="inherit"
                  size="small"
                  aria-label="love"
                  color="primary"
                >
                  <Avatar style={{ width: 30, height: 30 }} src={love} />
                </Fab>
              </Tooltip>
              <p className="title">{formateNumber(profileUser.no_of_loves)}</p>
              <div className="followers">Loved</div>
            </div>
            <div className="text-center ml-25">
              <Tooltip title="Followers">
                <Fab
                  color="inherit"
                  size="small"
                  aria-label="followers"
                  color="primary"
                >
                  <FollowingIcon color="#fff" />
                </Fab>
              </Tooltip>
              <p className="title">
                {formateNumber(profileUser.no_of_followers)}
              </p>
              <div className="followers">Followers</div>
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

export default withRouter(connect(mapStateToProps, actionsToProps)(Profile))
