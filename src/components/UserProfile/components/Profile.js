import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import preferencesIcon from '../../../../assets/preferences.svg'
import Fab from '@material-ui/core/Fab'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import arrowIcon from '../../../../assets/arrow.svg'
import * as mainActions from '../../../actions/index'
import { Map, List } from 'immutable'
import userLike from '../../../../assets/user-like.svg'
import love from '../../../../assets/love.svg'
import Tooltip from '@material-ui/core/Tooltip'
import * as profileActions from '../../UserProfile/actions'
import LoveIcon from '../../SvgIcons/components/Love'
import LikeIcon from '../../SvgIcons/components/Like'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.user && this.props.profileUser
      ? this.props.getProfileReaction(
          this.props.profileUser._id,
          this.props.user._id,
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
    })
  }

  render() {
    const { classes, profileUser, user, profileReaction } = this.props
    const { open, anchorEl } = this.state
    const loved =
      profileReaction &&
      profileReaction.type === 'love' &&
      profileReaction.likedBy._id === user._id
    const liked =
      profileReaction &&
      profileReaction.type === 'like' &&
      profileReaction.likedBy._id === user._id
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
              <span>Create usable interface and designs @GraphicSpark</span>
            </div>
            <br />
          </CardContent>
          <Divider />
          <CardActions
            className="actions"
            style={{
              margin: '20px 15px 20px 25px',
            }}
          >
            <div>
              <Tooltip title="No of People Liked">
                <Fab
                  color="inherit"
                  size="small"
                  aria-label="preferences"
                  color="primary"
                  className="actions"
                >
                  <Avatar style={{ width: 30, height: 30 }} src={userLike} />
                </Fab>
              </Tooltip>
              <h2 class="text-center title">12.3k</h2>
              <div class="text-center followers">Likes</div>
            </div>
            <div>
              <Tooltip title="No of People Loves">
                <Fab
                  color="inherit"
                  size="small"
                  aria-label="love"
                  color="primary"
                  className="actions"
                >
                  <Avatar style={{ width: 30, height: 30 }} src={love} />
                </Fab>
              </Tooltip>
              <h2 class="text-center title">2.3k</h2>
              <div class="text-center followers">Loved</div>
            </div>
            <div>
              <Tooltip title="Times Preferences Updated">
                <Fab
                  color="inherit"
                  size="small"
                  aria-label="preferences"
                  color="primary"
                  className="actions"
                >
                  <Avatar src={preferencesIcon} />
                </Fab>
              </Tooltip>
              <h2 class="text-center title">4k</h2>
              <div class="text-center followers">Updated</div>
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
  const user = state.getIn(['user', 'data'])
  return {
    user,
    profileReaction,
  }
}

const actionsToProps = {
  createOrUpdateProfileReaction: profileActions.createOrUpdateProfileReaction,
  getProfileReaction: profileActions.getProfileReaction,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Profile))
