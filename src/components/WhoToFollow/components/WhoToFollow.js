import * as mainActions from '../../../actions/index'
import * as profileActions from '../../UserProfile/actions'

import React, { Component } from 'react'

import ArrowIcon from '@material-ui/icons/ArrowForward'
import AskIcon from '@material-ui/icons/HowToReg'
import Avatar from '@material-ui/core/Avatar'
import AvatarOnline from '../../AvatarOnline/components/AvatarOnline'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import FollowIcon from '@material-ui/icons/RssFeedOutlined'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import LoveIcon from '@material-ui/icons/Favorite'
import { Map } from 'immutable'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import { getCardSubHeaderProfileSummary } from '../../../util/getCardSubHeaderText'
import getCreatedDate from '../../../util/getCreatedDate'
import getProvider from '../../../util/getProvider'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const colors = [
  'linear-gradient(135deg,#97abff 10%,#123597)',
  'linear-gradient(0deg,#ff0844 0,#ffb199)',
  'linear-gradient(180deg,#00b09b,#96c93d)',
  'linear-gradient(-20deg,#2b5876,#4e4376)',
  'linear-gradient(135deg,#667eea,#764ba2)',
  'linear-gradient(180deg,#2af598,#009efd)',
  'linear-gradient(135deg,#f761a1 10%,#8c1bab)',
  'linear-gradient(135deg,#6b73ff 10%,#000dff)',
  'linear-gradient(-20deg,#2b5876,#4e4376)',
  'linear-gradient(135deg,#667eea,#764ba2)',
]
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    padding: '4px !important',
    margin: '0px !important',
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  paper: {
    minHeight: 300,
    marginRight: 8,
    width: '100% !important',
  },
  paperHeader: {
    boxSizing: 'border-box',
    direction: 'ltr',
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
})

class WhoToFollow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: 10,
      offset: 0,
      users: [],
    }
  }

  handleReaction = async (type, followee, index) => {
    const data = {
      likedBy: this.props.user._id,
      user: followee._id,
      type,
    }
    const { user } = this.props
    await this.props.createOrUpdateProfileReaction(data).then(async res => {
      await this.props
        .getProfileReaction(followee._id, user._id)
        .then(response => {
          const users = [...this.state.users]
          const reaction = response.data
          const reactionIndex = users[index].reactions.findIndex(
            reaction => reaction.likedBy._id === user._id,
          )
          users[index].reactions.splice(reactionIndex, 1)
          if (response.data) {
            reaction.likedBy = user
            users[index].reactions.unshift(reaction)
            if (type === 'profile-like') {
              users[index].no_of_likes = ++users[index].no_of_likes
              users[index].no_of_loves =
                users[index].no_of_loves > 0 ? --users[index].no_of_loves : 0
            } else {
              users[index].no_of_loves = ++users[index].no_of_loves
              users[index].no_of_likes =
                users[index].no_of_likes > 0 ? --users[index].no_of_likes : 0
            }
          } else {
            if (type === 'profile-like') {
              users[index].no_of_likes = --users[index].no_of_likes
            } else {
              users[index].no_of_loves = --users[index].no_of_loves
            }
          }
          this.setState(
            {
              users,
            },
            () => {},
          )
        })
    })
  }

  handleFollow = async (followee, index) => {
    const { user } = this.props
    const data = {
      userId: user._id,
      followeeId: followee._id,
    }
    await this.props.createOrUpdateProfileFollower(data).then(async res => {
      await this.props
        .getProfileFollower(user._id, followee._id)
        .then(response => {
          const users = [...this.state.users]
          const follow = response.data
          const followIndex = users[index].followers.findIndex(
            follow => follow._id === user._id,
          )
          users[index].followers.splice(followIndex, 1)
          console.log('check', response)
          if (follow) {
            users[index].followers.unshift(user)
            users[index].no_of_followers = ++users[index].no_of_followers
          } else {
            users[index].no_of_followers = --users[index].no_of_followers
          }
          this.setState(
            {
              users,
            },
            () => {},
          )
        })
    })
  }

  handleOpinionRequest = async (requestedTo, index) => {
    const { user } = this.props
    const data = {
      requestedBy: user._id,
      requestedTo: requestedTo._id,
    }
    await this.props.createOrUpdateOpinionRequest(data).then(async res => {
      const users = [...this.state.users]
      const opinionRequestIndex = users[
        index
      ].opinionRequestsReceived.findIndex(or => or._id === user._id)
      users[index].opinionRequestsReceived.splice(opinionRequestIndex, 1)
      // user.opinionRequestsSent = user.opinionRequestsSent.unshift(users[index]);
      if (res.data.data) {
        users[index].opinionRequestsReceived.unshift(user)
        users[index].no_of_opinion_request_received += 1
      } else {
        users[index].no_of_opinion_request_received -= 1
      }
      this.setState(
        {
          users,
        },
        () => {},
      )
    })
  }

  componentDidMount() {
    const { user } = this.props
    const { limit, offset } = this.state
    if (!user) {
      return
    }
    const newLimit = parseInt(limit) + 10
    const newOffset = newLimit
    this.props.getWhoToFollow(user._id, newLimit, newOffset).then(res => {
      if (res) {
        this.setState({
          users: res.data,
          limit: newLimit,
        })
      }
    })
  }

  componentWillUnmount() {}

  showMoreComments = () => {}

  renderFollowerColor = followers => {
    if (!followers) {
      return
    }
    return followers.filter(f => f._id === this.props.user._id).length
      ? 'primary'
      : ''
  }

  isLoved = profile => {
    const { classes, user } = this.props
    const reactions = profile.reactions
    const reaction = reactions.find(
      reaction =>
        reaction.type === 'profile-love' && reaction.likedBy._id === user._id,
    )
    return reaction ? true : false
  }

  isLiked = profile => {
    const { classes, user } = this.props
    const reactions = profile.reactions
    const reaction = reactions.find(
      reaction =>
        reaction.type === 'profile-like' && reaction.likedBy._id === user._id,
    )
    return reaction ? true : false
  }

  isAsked = profile => {
    const { classes, user } = this.props
    const opinionRequests = profile.opinionRequestsReceived
    const opinionRequest = opinionRequests.find(orr => orr._id === user._id)
    return opinionRequest ? true : false
  }

  isFollowing = profile => {
    const { classes, user } = this.props
    const followers = profile.followers
    const follower = followers.find(follower => follower._id === user._id)
    return follower ? true : false
  }
  render() {
    const { classes, profileReaction, profileFollower, user } = this.props
    const { users } = this.state
    return (
      <React.Fragment>
        <h5 className="mt-3 mb-3">People you may know</h5>
        {users.length ? (
          <Grid
            container
            spacing={1}
            className="of-h w-us"
            disableGutters={true}
          >
            {users.map((u, index) => (
              <Grid item lg={4} md={4} sm={3} xs={12}>
                <Paper key={u._id} className={classes.paper} variant="outlined">
                  <div
                    className={classes.paperHeader}
                    style={{
                      backgroundImage:
                        colors[Math.floor(Math.random() * colors.length)],
                    }}
                  ></div>
                  <div className="text-center">
                    <Zoom in={true} timeout={1500}>
                      <div className="mt-minus-18">
                        <AvatarOnline user={u} />
                      </div>
                    </Zoom>
                    <span className="center-elements p-1">
                      <>
                        <Link className="hyperlink" to="#">
                          {u.userName + ' '}
                        </Link>
                        &nbsp;
                        {getProvider(u.providerId)}&nbsp; &nbsp;
                      </>
                    </span>
                    <span className="center-elements p-1">
                      <span className="grey-color hint-label">
                        Active since {getCreatedDate(u.createdAt)}
                      </span>
                    </span>

                    <Grid container spacing={0}>
                      <Grid item lg={4} xs={4}>
                        <div className="text-center py-3">
                          <Tooltip title="Love">
                            <IconButton
                              aria-label="settings"
                              onClick={() =>
                                this.handleReaction('profile-love', u, index)
                              }
                              style={{
                                color: this.isLoved(u)
                                  ? '#ff0016c7'
                                  : '#0c0b0b5e',
                              }}
                            >
                              <LoveIcon className="icon-display" />
                            </IconButton>
                          </Tooltip>
                          <h6 className="font-weight-bold mt-1 font-size-xl">
                            {formateNumber(u.no_of_loves)}
                          </h6>
                        </div>
                      </Grid>
                      <Grid item lg={4} xs={4}>
                        <div className="text-center py-3">
                          <Tooltip title="Like">
                            <IconButton
                              aria-label="settings"
                              style={{
                                color: this.isLiked(u)
                                  ? '#5383ff'
                                  : '#0c0b0b5e',
                              }}
                              onClick={() =>
                                this.handleReaction('profile-like', u, index)
                              }
                            >
                              <LikeIcon className="icon-display" />
                            </IconButton>
                          </Tooltip>
                          <h6 className="font-weight-bold mt-1 font-size-xl">
                            {formateNumber(u.no_of_likes)}
                          </h6>
                        </div>
                      </Grid>
                      <Grid item lg={4} xs={4}>
                        <div className="text-center py-3">
                          <Tooltip title="Ask for opinion">
                            <IconButton
                              aria-label="opinion"
                              onClick={() =>
                                this.handleOpinionRequest(u, index)
                              }
                              style={{
                                color: this.isAsked(u)
                                  ? '#5383ff'
                                  : '#0c0b0b5e',
                              }}
                            >
                              <AskIcon className="icon-display" />
                            </IconButton>
                          </Tooltip>
                          <h6 className="font-weight-bold mt-1 font-size-xl">
                            {u.no_of_opinion_request_received}
                          </h6>
                        </div>
                      </Grid>
                    </Grid>
                    <span className="center-elements p-4">
                      <Tooltip title={'Follow'}>
                        <Button
                          className="pl-4 pr-4"
                          variant="outlined"
                          color={this.isFollowing(u) ? 'primary' : ''}
                          size="small"
                          onClick={() => this.handleFollow(u, index)}
                        >
                          {this.isFollowing(u) ? 'Following' : 'Follow'}{' '}
                          {formateNumber(u.no_of_followers)}{' '}
                          <DoubleArrowIcon
                            color={this.isFollowing(u) ? 'primary' : ''}
                          />
                        </Button>
                      </Tooltip>
                    </span>
                  </div>
                </Paper>
              </Grid>
            ))}

            {/* <List className={classes.flexContainer}>
                        {users ? users.map((u, index) => (
                        
                            <ListItem
                                key={u._id}
                                alignItems="flex-start"
                                className="b-r-15 mt-10 w-us"
                            >
                                <Zoom
                                    in={true}
                                    timeout={1500}
                                >
                                    <ListItemAvatar>
                                        <AvatarOnline user={u} />
                                    </ListItemAvatar>
                                </Zoom>
                            <Tooltip title={u.userName} placement="bottom-start">
                            <ListItemText
                                primary={
                                <>
                                    <Link
                                    className="hyperlink"
                                    to="#"
                                    >
                                    {u.userName + ' '}
                                    </Link>
                                    &nbsp;
                                    {getProvider(u.providerId)}&nbsp;
                                    <span className="grey-color hint-label">
                                        {getCreatedDate(u.createdAt)}
                                    </span>
                                    &nbsp;
                                </>
                                }
                                secondary={
                                <React.Fragment>
                                    <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                    >
                                    {getCardSubHeaderProfileSummary(u)}
                                    </Typography>
                                </React.Fragment>
                                }
                                />
                                </Tooltip>
                                <ListItemSecondaryAction className="r-5">
                                    <Tooltip title="Ask For Opinion" placement="right-end">
                                    <IconButton size="small">
                                        <Zoom in={true} timeout={2000}>
                                        <AskIcon size="small"/>
                                        </Zoom>
                                    </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Follow User" placement="right-end">
                                    <IconButton  size="small"
                                        onClick={() => this.handleFollow(u, index)}
                                        color={this.renderFollowerColor(u.followers)}
                                    >
                                        <Zoom in={true} timeout={2000}>
                                        <FollowIcon />
                                        </Zoom>
                                    </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            </ListItem>
                    )): null}
                        </List> */}
          </Grid>
        ) : (
          <h4 className="text-center">No users found</h4>
        )}
      </React.Fragment>
    )
  }
}

WhoToFollow.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const profileReaction = state.getIn(
    ['UserProfile', 'userlike', 'get', 'success'],
    Map(),
  )
  return {
    user,
    profileReaction,
  }
}

const actionsToProps = {
  createOrUpdateProfileReaction: profileActions.createOrUpdateProfileReaction,
  getProfileReaction: profileActions.getProfileReaction,
  getUser: mainActions.getUser,
  createOrUpdateProfileFollower: profileActions.createOrUpdateProfileFollower,
  getProfileFollower: profileActions.getProfileFollower,
  getWhoToFollow: mainActions.getWhoToFollow,
  createOrUpdateOpinionRequest: profileActions.createOrUpdateOpinionRequest,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(WhoToFollow)),
)
