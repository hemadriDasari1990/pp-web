import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import moment from 'moment'
import MoodIcon from '@material-ui/icons/Mood'
import MoodBadIcon from '@material-ui/icons/MoodBad'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import * as actions from '../actions'
import { Map } from 'immutable'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import { Link } from 'react-router-dom'
import * as dashboardActions from '../../Timeline/actions'
import Loader from '../../Loader/components/Loader'
import like from '../../../../assets/emojis/like.svg'
import angry from '../../../../assets/emojis/angry.svg'
import love from '../../../../assets/emojis/love.svg'
import silly from '../../../../assets/emojis/silly.svg'
import smiley from '../../../../assets/emojis/smiley.svg'
import wow from '../../../../assets/emojis/surprise.svg'
import sad from '../../../../assets/emojis/sad.svg'
import Button from '@material-ui/core/Button'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { withStyles } from '@material-ui/core/styles'
import share from '../../../../assets/emojis/share.svg'

const styles = {
  smallAvatar: {
    width: 20,
    height: 20,
    borderColor: '#fff',
  },
  avatar: {
    marginTop: 0,
    width: '100%',
    textAlign: 'center',
  },
  button: {
    width: '150px !important',
    height: '35px !important',
  },
  rightButton: {
    marginLeft: 'auto',
  },
}

class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likesCount: 0,
      disLikesCount: 0,
      showEmojis: false,
      hint: '',
    }
  }

  async componentDidMount() {
    await this.props.getIncomingPosts(this.props.match.params.id)
    this.renderHint()
  }

  handleApproved = event => {}

  createOrUpdateReaction = async (userId, postId, reaction) => {
    await this.props
      .createOrUpdateReaction(userId, postId, reaction)
      .then(async data => {
        await this.props.getIncomingPosts(this.props.match.params.id)
      })
  }

  createShare = async (userId, postId) => {
    await this.props.createShare(userId, postId).then(async data => {
      await this.props.getIncomingPosts(this.props.match.params.id)
    })
  }

  toggleShow = flag => {
    this.setState({
      showEmojis: flag,
    })
  }

  getReaction = type => {
    let icon = null
    switch (type.toLowerCase()) {
      case 'like':
        icon = like
        break
      case 'love':
        icon = love
        break
      case 'sad':
        icon = sad
        break
      case 'wow':
        icon = wow
        break
      case 'silly':
        icon = silly
        break
      case 'smiley':
        icon = smiley
        break
      case 'angry':
        icon = angry
        break
        deafult: break
    }
    return icon
  }

  getReactionIcon = type => {
    let icon = null
    switch (type.toLowerCase()) {
      case 'like':
        icon = <like />
        break
      case 'love':
        icon = <love />
        break
      case 'sad':
        icon = <sad />
        break
      case 'wow':
        icon = <wow />
        break
      case 'silly':
        icon = <silly />
        break
      case 'smiley':
        icon = <smiley />
        break
      case 'angry':
        icon = <angry />
        break
        deafult: break
    }
    return icon
  }

  renderHint = () => {
    const hintArray = [
      'Be the first to share this',
      'Be the first to like',
      'Be the first to react',
    ]
    let index = 0
    setInterval(() => {
      this.setState({
        hint: hintArray[index],
      })
      index = (index + 1) % hintArray.length
    }, 2000)
  }

  renderColor = type => {
    let color = '#606770'
    switch (type.toLowerCase()) {
      case 'share':
        color = '#2078f4'
        break
      case 'like':
        color = '#2078f4'
        break
      case 'love':
        color = '#ff6f00'
        break
      case 'sad':
        color = '#ff6f00'
        break
      case 'wow':
        color = '#ff6f00'
        break
      case 'silly':
        color = '#ff6f00'
        break
      case 'smiley':
        color = '#ff6f00'
        break
      case 'angry':
        color = '#ff6f00'
        break
        deafult: break
    }
    return color
  }

  renderUserNames = reactions => {
    if (!Array.isArray(reactions)) {
      return ''
    }
    let names = ''
    reactions.forEach(r => {
      names += r.user ? r.user.userName + '\n' : ''
    })
    return names
  }

  renderNames = reactions => {
    if (!reactions.length || !Array.isArray(reactions)) {
      return 'No Reactions'
    }
    let names = ''
    if (
      reactions.filter(
        r =>
          r && r.user && r.user._id === this.props.user && this.props.user._id,
      ).length
    ) {
      names += 'You,'
    }
    if (
      reactions.length > 2 &&
      reactions.filter(
        r =>
          r && r.user && r.user._id === this.props.user && this.props.user._id,
      ).length
    ) {
      names += reactions.filter(
        r =>
          r && r.user && r.user._id === this.props.user && this.props.user._id,
      ).length
        ? 'You and '
        : reactions[0].user
        ? reactions[0].user.userName
        : formateNumber(reactions.slice(2).length) + 'Others'
    }
    if (
      reactions.length > 2 &&
      !reactions.filter(
        r =>
          r && r.user && r.user._id === this.props.user && this.props.user._id,
      ).length
    ) {
      names += reactions[0].user
        ? reactions[0].user.userName +
          ' and ' +
          formateNumber(reactions.slice(1).length) +
          ' Others'
        : formateNumber(reactions.length)
    }
    if (
      reactions.length <= 2 &&
      reactions.filter(
        r =>
          r && r.user && r.user._id === this.props.user && this.props.user._id,
      ).length
    ) {
      names += 'You and ' + reactions.length + 'Other'
    }

    if (
      reactions.length &&
      reactions.length <= 2 &&
      !reactions.filter(
        r =>
          r && r.user && r.user._id === this.props.user && this.props.user._id,
      ).length
    ) {
      names += reactions[0].user
        ? reactions[0].user.userName +
          ' and ' +
          formateNumber(reactions.slice(1).length) +
          ' Other'
        : formateNumber(reactions.length)
    }
    return names
  }

  handleMenuItem = (text, postId) => {}
  render() {
    const {
      classes,
      incomingPosts,
      incomingPostsError,
      incomingPostsLoading,
      searchUser,
      user,
    } = this.props
    const { showEmojis, open, hint } = this.state
    return (
      <React.Fragment>
        {searchUser && incomingPosts.length
          ? incomingPosts
              .filter(p => p.approved)
              .map(post => (
                <Card key={post._id}>
                  <CardHeader
                    avatar={
                      !post.isAnonymous ? (
                        <Avatar
                          alt={
                            post.postedBy.userName
                              ? post.postedBy.userName.substring(1, 1)
                              : 'Image not Available'
                          }
                          src={!post.isAnonymous ? post.postedBy.photoURL : 'A'}
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
                      )
                    }
                    title={
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
                          {post.postedBy.likes.length
                            ? ' ' +
                              formateNumber(post.postedBy.likes.length) +
                              ' Likes'
                            : ''}
                        </>
                      ) : (
                        <b>Annonymous User</b>
                      )
                    }
                    subheader={moment(post.createdAt).fromNow()}
                  />
                  <CardContent>
                    <List>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <MoodIcon />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Pros"
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="p"
                                variant="body2"
                                color="textPrimary"
                              >
                                {post.pros}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <MoodBadIcon />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Cons"
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="p"
                                variant="body2"
                                color="textPrimary"
                              >
                                {post.cons}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <SentimentSatisfiedIcon />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Advice"
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="p"
                                variant="body2"
                                color="textPrimary"
                              >
                                {post.advice}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </List>

                    <div className="actions-align">
                      <AvatarGroup>
                        {post.reactions.length > 0
                          ? post.reactions.slice(0, 3).map(react => (
                              <Tooltip
                                title={this.renderUserNames(post.reactions)}
                                placement="bottom"
                              >
                                <Avatar
                                  className={classes.smallAvatar}
                                  key={react._id}
                                  alt="Image Not Available"
                                  src={this.getReaction(
                                    react ? react.type : '',
                                  )}
                                />
                              </Tooltip>
                            ))
                          : 'No Reactions'}
                      </AvatarGroup>
                      <Tooltip
                        title={this.renderUserNames(post.reactions)}
                        placement="bottom"
                      >
                        <Link
                          to={`/post/${post._id}/reactions`}
                          className="actions-text"
                        >
                          <span>{formateNumber(post.reactions.length)}</span>
                        </Link>
                      </Tooltip>
                      <div className={classes.rightButton}>
                        <Link
                          to={`/post/${post._id}/shares`}
                          className="actions-text"
                        >
                          <span>
                            {post.shares.length
                              ? formateNumber(post.shares.length)
                              : 'No'}{' '}
                            shares
                          </span>
                        </Link>
                      </div>
                    </div>

                    <Divider />
                  </CardContent>

                  {/*<CardActions style={{ height: 10 }} disableSpacing>
                    <Typography display="block" gutterBottom>
                      {formateNumber(
                        post.likes > 0
                          ? post.likes
                          : likesCount
                          ? likesCount
                          : 0,
                      )}{' '}
                      Likes
                    </Typography>
                      </CardActions>
                      <Divider variant="middle" />*/}

                  <CardActions disableSpacing>
                    <Tooltip
                      title={
                        post.reactions.filter(r => r.user._id === user._id)
                          .length
                          ? post.reactions
                              .filter(r => r.user._id === user._id)[0]
                              .type.toLowerCase()
                          : 'like'
                      }
                    >
                      <div
                        className="feed"
                        onMouseEnter={() => this.toggleShow(true)}
                        onMouseLeave={() => this.toggleShow(false)}
                      >
                        <a className="like-btn">
                          <Button
                            style={{
                              color: this.renderColor(
                                post.reactions.filter(
                                  r => r.user._id === user._id,
                                ).length
                                  ? post.reactions
                                      .filter(r => r.user._id === user._id)[0]
                                      .type.toLowerCase()
                                  : '#606770',
                              ),
                            }}
                            className={classes.button}
                            onClick={() =>
                              this.createOrUpdateReaction(
                                user._id,
                                post._id,
                                post.reactions.filter(
                                  r => r.user._id === user._id,
                                ).length
                                  ? post.reactions
                                      .filter(r => r.user._id === user._id)[0]
                                      .type.toLowerCase()
                                  : 'like',
                              )
                            }
                          >
                            <Avatar
                              className={classes.smallAvatar}
                              src={
                                post.reactions.filter(
                                  r => r.user._id === user._id,
                                ).length
                                  ? this.getReaction(
                                      post.reactions.filter(
                                        r => r.user._id === user._id,
                                      )[0].type,
                                    )
                                  : like
                              }
                            />
                            <span style={{ marginLeft: 7 }}>
                              {post.reactions.filter(
                                r => r.user._id === user._id,
                              ).length
                                ? post.reactions
                                    .filter(r => r.user._id === user._id)[0]
                                    .type.toLowerCase()
                                : 'Like'}{' '}
                            </span>
                          </Button>

                          {/*<Tooltip title={post.reactions.filter(r => r.user._id === user._id).length ? post.reactions.filter(r => r.user._id === user._id)[0].type.toLowerCase(): 'like'}>
                            <IconButton
                              aria-label="like"
                              onClick={() => this.createOrUpdateReaction(user._id, post._id, post.reactions.filter(r => r.user._id === user._id).length ? post.reactions.filter(r => r.user._id === user._id)[0].type.toLowerCase(): 'like')}
                            >
                              <LikeIcon 
                              color={this.renderColor(post.reactions.filter(r => r.user._id === user._id).length ? post.reactions.filter(r => r.user._id === user._id)[0].type.toLowerCase(): '#606770')}
                              
                              />
                            </IconButton>
                          </Tooltip>
                          <span className="span-name" style={{marginLeft: 7}}>{post.reactions.filter(r => r.user._id === user._id).length ? post.reactions.filter(r => r.user._id === user._id)[0].type.toLowerCase(): 'Like'}  </span>
                    */}

                          {showEmojis && (
                            <div className="reaction-box">
                              <div
                                className="reaction-icon"
                                onClick={() =>
                                  this.createOrUpdateReaction(
                                    user._id,
                                    post._id,
                                    'like',
                                  )
                                }
                              >
                                <Tooltip title="Like" placement="top">
                                  <img src={like} width={43} height={38} />
                                </Tooltip>
                              </div>
                              <div
                                className="reaction-icon"
                                onClick={() =>
                                  this.createOrUpdateReaction(
                                    user._id,
                                    post._id,
                                    'love',
                                  )
                                }
                              >
                                <Tooltip title="Love" placement="top">
                                  <img src={love} width={40} height={40} />
                                </Tooltip>
                              </div>
                              <div
                                className="reaction-icon"
                                onClick={() =>
                                  this.createOrUpdateReaction(
                                    user._id,
                                    post._id,
                                    'angry',
                                  )
                                }
                              >
                                <Tooltip title="Angry" placement="top">
                                  <img src={angry} width={40} height={40} />
                                </Tooltip>
                              </div>
                              <div
                                className="reaction-icon"
                                onClick={() =>
                                  this.createOrUpdateReaction(
                                    user._id,
                                    post._id,
                                    'silly',
                                  )
                                }
                              >
                                <Tooltip title="Silly" placement="top">
                                  <img src={silly} width={40} height={40} />
                                </Tooltip>
                              </div>
                              <div
                                className="reaction-icon"
                                onClick={() =>
                                  this.createOrUpdateReaction(
                                    user._id,
                                    post._id,
                                    'smiley',
                                  )
                                }
                              >
                                <Tooltip title="Smiley" placement="top">
                                  <img src={smiley} width={40} height={40} />
                                </Tooltip>
                              </div>
                              <div
                                className="reaction-icon"
                                onClick={() =>
                                  this.createOrUpdateReaction(
                                    user._id,
                                    post._id,
                                    'wow',
                                  )
                                }
                              >
                                <Tooltip title="Wow" placement="top">
                                  <img src={wow} width={40} height={40} />
                                </Tooltip>
                              </div>
                              <div
                                className="reaction-icon"
                                onClick={() =>
                                  this.createOrUpdateReaction(
                                    user._id,
                                    post._id,
                                    'sad',
                                  )
                                }
                              >
                                <Tooltip title="Sad" placement="top">
                                  <img src={sad} width={40} height={40} />
                                </Tooltip>
                              </div>
                            </div>
                          )}
                        </a>
                      </div>
                      {/*<LikeIcon
                          color={
                            post.postDetails &&
                            post.postDetails.filter(d => d.userId == user.uid)
                              .length
                              ? 'primary'
                              : ''
                          }
                        />*/}
                    </Tooltip>
                    {/*<Button style={{float: 'right !important'}} className={classes.button}>
                      <Avatar className={classes.smallAvatar} src={share} />
                      <span style={{marginLeft: 7}}>Share</span>
                    </Button>*/}
                    <div className={classes.rightButton}>
                      <Tooltip title="Share">
                        <Button
                          style={{
                            color: this.renderColor(
                              post.shares.filter(s => s.user._id === user._id)
                                .length
                                ? 'share'
                                : '#606770',
                            ),
                          }}
                          className={classes.button}
                          onClick={() => this.createShare(user._id, post._id)}
                        >
                          <Avatar className={classes.smallAvatar} src={share} />
                          <span style={{ marginLeft: 3 }}>{'Share'} </span>
                        </Button>
                      </Tooltip>
                    </div>
                  </CardActions>
                  {post.reactions.length == 0 && (
                    <Typography paragraph className="hint-area">
                      {hint}
                    </Typography>
                  )}
                </Card>
              ))
          : null}
        {!incomingPosts.length ||
        (incomingPosts.length &&
          !incomingPosts.filter(p => p.approved).length) ? (
          <Typography variant="h3" className="text-center">
            No Approved posts found to show
          </Typography>
        ) : null}
        {incomingPostsLoading ? <Loader /> : null}
      </React.Fragment>
    )
  }
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const incomingPosts = state.getIn(['Timeline', 'incoming', 'success'], Map())
  const incomingPostsLoading = state.getIn(
    ['Timeline', 'incoming', 'loading'],
    false,
  )
  const incomingPostsError = state.getIn(
    ['Timeline', 'incoming', 'errors'],
    Map(),
  )
  return {
    user,
    incomingPosts,
    incomingPostsError,
    incomingPostsLoading,
  }
}

const actionsToProps = {
  createOrUpdateReaction: actions.createOrUpdateReaction,
  getIncomingPosts: dashboardActions.getIncomingPosts,
  createShare: actions.createShare,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(PostList)),
)
