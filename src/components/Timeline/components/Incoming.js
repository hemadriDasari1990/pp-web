import * as actions from '../actions'
import * as postActions from '../../Post/actions'
import * as profileActions from '../../UserProfile/actions'

import React, { Component, Suspense, lazy } from 'react'

import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import AvatarOnline from '../../AvatarOnline/components/AvatarOnline'
import Button from '@material-ui/core/Button'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CommentIcon from '@material-ui/icons/ChatBubbleOutline'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import DisLikeIcon from '@material-ui/icons/ThumbDownAlt'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import LikeOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import LoveIcon from '@material-ui/icons/Favorite'
import { Map } from 'immutable'
import Menu from '@material-ui/core/Menu'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import PropTypes from 'prop-types'
import ScheduleIcon from '@material-ui/icons/Schedule'
import Slide from '@material-ui/core/Slide'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import advice from '../../../../assets/advice.svg'
import { connect } from 'react-redux'
import cons from '../../../../assets/cons.svg'
import formateNumber from '../../../util/formateNumber'
import getCardSubHeaderText from '../../../util/getCardSubHeaderText'
import getProvider from '../../../util/getProvider'
import getReaction from '../../../util/getReaction'
import getReactionsText from '../../../util/getReactionsText'
import perfect from '../../../../assets/emojis/perfect.svg'
import pros from '../../../../assets/pros.svg'
import renderColor from '../../../util/renderColor'
import renderUserNames from '../../../util/renderUserNames'
import thinking from '../../../../assets/emojis/thinking.svg'
import tounghout from '../../../../assets/emojis/tounghout.svg'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const CommentsList = lazy(() => import('./comments/List'))
const CreateComment = lazy(() => import('./comments/CreateComment'))
const CustomizedSnackbars = lazy(() =>
  import('../../Snackbar/components/Snackbar'),
)
const NoRecords = lazy(() => import('../../NoRecords/components/NoRecords'))

const styles = {
  smallAvatar: {
    width: 22,
    height: 22,
    borderColor: '#fff',
  },
  reactionAvatar: {
    width: 25,
    height: 25,
  },
  emojiAvatar: {
    marginRight: 11,
    width: 40,
    height: 40,
  },
  button: {
    width: '150px !important',
    height: '35px !important',
  },
  rightButton: {
    marginLeft: 'auto',
  },
  comment: {
    marginLeft: 'auto',
    width: '150px !important',
    height: '35px !important',
  },
  reactionAvatar: {
    width: 30,
    height: 30,
  },
}

class Incoming extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      anchorEl: undefined,
      showEmojis: false,
      showCommentInput: false,
      postId: null,
      hint: '',
    }
    this.hintTimer = null
  }

  async componentDidMount() {
    await this.getPosts()
    this.renderHint()
  }

  componentWillUnmount() {
    clearInterval(this.hintTimer)
  }

  getPosts = async () => {
    if (this.props.match.params.id) {
      await this.props.getIncomingPosts(this.props.match.params.id, '')
    } else {
      await this.props.getIncomingPosts(this.props.user._id, '')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // this.props.getIncomingPosts(this.props.user._id)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleMenuItem = async (val, postId) => {
    switch (val) {
      case 'delete':
        await this.props.deletePost(postId)
        this.setState({
          open: false,
        })
        await this.props.getIncomingPosts(this.props.user._id, '')
        await this.props.getRecentPosts(this.props.user._id)
        break
      default:
        break
    }
  }

  handleButton = event => {
    this.setState({ open: !this.state.open, anchorEl: event.currentTarget })
  }

  toggleShow = flag => {
    if (flag) {
      this.buttonPressTimer = setTimeout(
        () =>
          this.setState({
            showEmojis: flag,
          }),
        500,
      )
    }
    if (!flag) {
      clearTimeout(this.buttonPressTimer)
    }
  }

  renderHint = () => {
    const hintArray = [
      'Be the first to like',
      'Be the first to react',
      'Be the first to comment on this',
    ]
    let index = 0
    this.hintTimer = setInterval(() => {
      this.setState({
        hint: hintArray[index],
      })
      index = (index + 1) % hintArray.length
    }, 1500)
  }

  createOrUpdateReaction = async (userId, postId, reaction) => {
    await this.props
      .createOrUpdateReaction(userId, postId, reaction)
      .then(async data => {
        await this.getPosts()
      })
  }

  showCommentInput = () => {
    this.setState({
      showCommentInput: !this.state.showCommentInput,
    })
  }

  hideComment = postId => {
    this.setState({
      showCommentInput: !this.state.showCommentInput,
    })
    this.props.getComments(postId)
  }

  renderMenu = post => {
    return (
      <Menu
        id="fade-menu"
        open={this.state.open}
        onClose={this.handleClose}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        getContentAnchorEl={null}
        TransitionComponent={Zoom}
      >
        <ListItem
          className="cursor pt-0 pb-0 pl-2 pr-2 menu-item"
          onClick={() => this.handleMenuItem('delete', post._id)}
        >
          <ListItemAvatar style={{ minWidth: 35 }}>
            <DeleteOutlineIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Delete Post"
            secondary={
              <React.Fragment>
                <Typography
                  component="p"
                  variant="body2"
                  color="textPrimary"
                  className="menu-item-text"
                >
                  Once deleted and will be deleted
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem className="cursor pt-0 pb-0 pl-2 pr-2 menu-item">
          <ListItemAvatar style={{ minWidth: 35 }}>
            <CancelPresentationIcon />
          </ListItemAvatar>
          <ListItemText
            primary="Hide Post"
            secondary={
              <React.Fragment>
                <Typography
                  component="p"
                  variant="body2"
                  color="textPrimary"
                  className="menu-item-text"
                >
                  See fewer posts like this
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        {!post.isAnonymous && (
          <ListItem className="cursor pt-0 pb-0 pl-2 pr-2 menu-item">
            <ListItemAvatar style={{ minWidth: 35 }}>
              <ScheduleIcon />
            </ListItemAvatar>
            <ListItemText
              className="menu-item-text"
              primary={`Snooz posts `}
              secondary={
                <React.Fragment>
                  <Typography
                    component="p"
                    variant="body2"
                    color="textPrimary"
                    className="menu-item-text"
                  >
                    Temporarily stop seeing posts
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        )}
      </Menu>
    )
  }

  showComments = postId => {
    this.setState({
      postId,
    })
  }

  viewReactions = (type, postId) => {
    this.props.savePostId(postId)
    this.props.saveActionState(type)
  }

  viewProfile = (type, userId) => {
    this.props.saveActionState(type)
    this.props.history.push(`/profile/${userId}`)
  }

  renderTitle = post => {
    const { user } = this.props
    if (post.postedBy._id === post.postedTo._id) {
      return (
        <>
          <Link
            className="hyperlink"
            to="#"
            onClick={() => this.viewProfile('incoming', post.postedBy._id)}
          >
            {post.postedBy._id === user._id
              ? 'You'
              : `${post.postedBy.userName}`}
          </Link>
          &nbsp;
          {getProvider(post.postedBy.providerId)}&nbsp;
          <span className="grey-color hint-label">
            {post.postedBy._id !== user._id ? 'Updated status' : ''}
          </span>
          &nbsp;
        </>
      )
    } else {
      return (
        <>
          <Link
            className="hyperlink"
            to="#"
            onClick={() => this.viewProfile('incoming', post.postedBy._id)}
          >
            {post.postedBy._id === user._id
              ? 'You'
              : `${post.postedBy.userName}`}
          </Link>
          &nbsp;
          {getProvider(post.postedBy.providerId)}&nbsp;
          <span className="grey-color hint-label">To</span>&nbsp;
          <Link
            className="hyperlink"
            to="#"
            onClick={() => this.viewProfile('incoming', post.postedTo._id)}
          >
            {post.postedTo._id === user._id
              ? 'You'
              : `${post.postedTo.userName}`}
          </Link>
          &nbsp;
          {getProvider(post.postedTo.providerId)}
        </>
      )
    }
  }

  render() {
    const {
      incomingPosts,
      incomingPostsError,
      incomingPostsLoading,
      deletePostSuccess,
      deletePostError,
      deletePostLoading,
      classes,
      user,
      type,
      commentsCount,
    } = this.props
    const {
      open,
      anchorEl,
      showEmojis,
      showCommentInput,
      postId,
      hint,
    } = this.state
    return (
      <Suspense fallback={<Loader />}>
        {!incomingPostsLoading && incomingPosts.length
          ? incomingPosts.map(post => (
              <Card key={post._id}>
                <CardHeader
                  avatar={
                    (post.isAnonymous && post.postedBy._id == user._id) ||
                    !post.isAnonymous ? (
                      <AvatarOnline user={post.postedBy} />
                    ) : (
                      <Avatar
                        style={{ color: '#ffffff', backgroundColor: '#2a7fff' }}
                      >
                        A
                      </Avatar>
                    )
                  }
                  action={
                    <>
                      <Tooltip title="Update">
                        <IconButton
                          aria-label="settings"
                          onClick={this.handleButton}
                        >
                          <Zoom in={true} timeout={2000}>
                            <MoreHorizIcon />
                          </Zoom>
                        </IconButton>
                      </Tooltip>
                      {this.renderMenu(post)}
                    </>
                  }
                  title={
                    (post.isAnonymous && post.postedBy._id === user._id) ||
                    !post.isAnonymous ? (
                      this.renderTitle(post)
                    ) : (
                      <b className="hyperlink">Annonymous User</b>
                    )
                  }
                  subheader={
                    <>
                      {getCardSubHeaderText(post.createdAt)}&nbsp;&nbsp;
                      {!post.isAnonymous && (
                        <>
                          <span className="grey-color hint-label">
                            {formateNumber(post.postedBy.total_followers)}
                            &nbsp;Followers
                          </span>
                          &nbsp;
                        </>
                      )}
                    </>
                  }
                />
                <CardContent className="p-0">
                  {post.type === 'Generic' && (
                    <>
                      <List>
                        <ListItem alignItems="flex-start">
                          <Zoom in={true} timeout={2000}>
                            <ListItemText
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="p"
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    {post.message}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </Zoom>
                        </ListItem>
                      </List>
                    </>
                  )}
                  {post.type === 'Opinion' && (
                    <>
                      <List>
                        <Slide
                          direction="right"
                          in={true}
                          timeout={1500}
                          mountOnEnter
                          unmountOnExit
                        >
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar src={pros} className="avatar" />
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
                                    {post.pros
                                      ? post.pros
                                      : 'No comments added'}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </Slide>
                        <Slide
                          direction="left"
                          in={true}
                          timeout={1500}
                          mountOnEnter
                          unmountOnExit
                        >
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar src={cons} className="avatar" />
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
                                    {post.cons
                                      ? post.cons
                                      : 'No comments added'}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </Slide>
                        <Slide
                          direction="right"
                          in={true}
                          timeout={1500}
                          mountOnEnter
                          unmountOnExit
                        >
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar src={advice} className="avatar" />
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
                                    {post.advice
                                      ? post.advice
                                      : 'No comments added'}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        </Slide>
                      </List>
                    </>
                  )}
                  <Slide
                    direction="right"
                    in={true}
                    timeout={1500}
                    mountOnEnter
                    unmountOnExit
                  >
                    <div className="row ml-15 mr-15">
                      <AvatarGroup max={3} className="v-align-middle">
                        {post.reactions.length > 0
                          ? post.reactions.slice(0, 3).map(react => (
                              <Tooltip
                                title={renderUserNames(post.reactions)}
                                placement="bottom"
                                key={react._id}
                              >
                                <Avatar
                                  className={classes.smallAvatar}
                                  key={react._id}
                                  alt="Image Not Available"
                                  style={{
                                    backgroundColor:
                                      react.type.toLowerCase() === 'love'
                                        ? '#ff0016c7'
                                        : '',
                                  }}
                                >
                                  {getReaction(react ? react.type : '')}
                                </Avatar>
                              </Tooltip>
                            ))
                          : 'No Reactions'}
                      </AvatarGroup>
                      <span className="m-l-5 cursor actions-text v-align-middle grey-color ">
                        <Tooltip
                          title={renderUserNames(post.reactions)}
                          placement="bottom"
                        >
                          <Link
                            to="#"
                            onClick={() =>
                              this.viewReactions('post-reactions', post._id)
                            }
                          >
                            {formateNumber(post.reactions.length) + ' - '}
                          </Link>
                        </Tooltip>
                      </span>
                      <span
                        onClick={() => this.showComments(post._id)}
                        className="cursor actions-text v-align-middle grey-color"
                      >
                        {formateNumber(post.comments.length) + ' Comments'}
                      </span>
                    </div>
                  </Slide>
                  <Divider />
                </CardContent>
                <CardActions className="card-actions p-0" disableSpacing>
                  <Tooltip
                    title={getReactionsText(user._id, post.reactions)}
                    placement="bottom"
                  >
                    <div
                      className="feed"
                      onTouchStart={() => this.toggleShow(true)}
                      onTouchEnd={() => this.toggleShow(false)}
                      onMouseDown={() => this.toggleShow(false)}
                      onMouseUp={() => this.toggleShow(true)}
                      onMouseLeave={() => this.toggleShow(false)}
                      onMouseEnter={() => this.toggleShow(true)}
                    >
                      <a className="like-btn">
                        <Button
                          className={classes.button}
                          onClick={() =>
                            this.createOrUpdateReaction(
                              user._id,
                              post._id,
                              getReactionsText(user._id, post.reactions),
                            )
                          }
                        >
                          <Zoom in={true} timeout={2000}>
                            <div className="card-button-text">
                              {post.reactions.filter(
                                r => r.user._id === user._id,
                              ).length ? (
                                <Avatar
                                  className={classes.smallAvatar}
                                  alt="Image Not Available"
                                  style={{
                                    backgroundColor:
                                      getReactionsText(
                                        user._id,
                                        post.reactions,
                                      ).toLowerCase() === 'love'
                                        ? '#ff0016c7'
                                        : '',
                                  }}
                                >
                                  {getReaction(
                                    getReactionsText(user._id, post.reactions),
                                  )}
                                </Avatar>
                              ) : (
                                <LikeOutlinedIcon
                                  style={{ fontSize: 20, color: '#606770' }}
                                />
                              )}
                              <span
                                className="ml-7"
                                style={{
                                  color: renderColor(
                                    post.reactions.length
                                      ? getReactionsText(
                                          user._id,
                                          post.reactions,
                                        )
                                      : '',
                                  ),
                                }}
                              >
                                {getReactionsText(user._id, post.reactions) ||
                                  'Like'}
                              </span>
                            </div>
                          </Zoom>
                        </Button>
                        {showEmojis && (
                          <div className="reaction-box">
                            <div
                              className="v-align-middle reaction-icon"
                              onClick={() =>
                                this.createOrUpdateReaction(
                                  user._id,
                                  post._id,
                                  'like',
                                )
                              }
                            >
                              <Tooltip title="Like" placement="top">
                                <Avatar className={classes.emojiAvatar}>
                                  <Zoom in={showEmojis} timeout={2000}>
                                    <LikeIcon color="secondary" />
                                  </Zoom>
                                </Avatar>
                              </Tooltip>
                            </div>
                            <div
                              className="v-align-middle reaction-icon"
                              onClick={() =>
                                this.createOrUpdateReaction(
                                  user._id,
                                  post._id,
                                  'dislike',
                                )
                              }
                            >
                              <Tooltip title="Dis Like" placement="top">
                                <Avatar className={classes.emojiAvatar}>
                                  <Zoom in={showEmojis} timeout={2000}>
                                    <DisLikeIcon color="secondary" />
                                  </Zoom>
                                </Avatar>
                              </Tooltip>
                            </div>
                            <div
                              className="v-align-middle reaction-icon"
                              onClick={() =>
                                this.createOrUpdateReaction(
                                  user._id,
                                  post._id,
                                  'love',
                                )
                              }
                            >
                              <Tooltip title="Love" placement="top">
                                <Avatar
                                  className={classes.emojiAvatar}
                                  style={{ backgroundColor: '#ff0016c7' }}
                                >
                                  <Zoom in={showEmojis} timeout={2000}>
                                    <LoveIcon color="secondary" />
                                  </Zoom>
                                </Avatar>
                              </Tooltip>
                            </div>
                            <div
                              className="v-align-middle reaction-icon"
                              onClick={() =>
                                this.createOrUpdateReaction(
                                  user._id,
                                  post._id,
                                  'perfect',
                                )
                              }
                            >
                              <Tooltip title="Perfect" placement="top">
                                <Avatar className={classes.emojiAvatar}>
                                  <Zoom in={showEmojis} timeout={2000}>
                                    <img src={perfect} />
                                  </Zoom>
                                </Avatar>
                              </Tooltip>
                            </div>
                            <div
                              className="v-align-middle reaction-icon"
                              onClick={() =>
                                this.createOrUpdateReaction(
                                  user._id,
                                  post._id,
                                  'tounghout',
                                )
                              }
                            >
                              <Tooltip title="Toungh Out" placement="top">
                                <Avatar className={classes.emojiAvatar}>
                                  <Zoom in={showEmojis} timeout={2000}>
                                    <img src={tounghout} />
                                  </Zoom>
                                </Avatar>
                              </Tooltip>
                            </div>
                            <div
                              className="v-align-middle reaction-icon"
                              onClick={() =>
                                this.createOrUpdateReaction(
                                  user._id,
                                  post._id,
                                  'thinking',
                                )
                              }
                            >
                              <Tooltip title="Thinking" placement="top">
                                <Avatar className={classes.emojiAvatar}>
                                  <Zoom in={showEmojis} timeout={2000}>
                                    <img src={thinking} />
                                  </Zoom>
                                </Avatar>
                              </Tooltip>
                            </div>
                          </div>
                        )}
                      </a>
                    </div>
                  </Tooltip>
                  <Tooltip title="Comment">
                    <Button
                      className={classes.comment}
                      onClick={() => this.showCommentInput()}
                    >
                      <Zoom in={true} timeout={2000}>
                        <div className="card-button-text">
                          <CommentIcon
                            style={{ color: '#606770' }}
                            style={{ fontSize: 20 }}
                          />
                          <span className="ml-7">Comment</span>
                        </div>
                      </Zoom>
                    </Button>
                  </Tooltip>
                </CardActions>
                {showCommentInput ||
                (post.comments.length && postId !== post._id) ? (
                  <Divider />
                ) : null}
                {showCommentInput && (
                  <CardActions disableSpacing className="p-0">
                    <CreateComment
                      type="parent"
                      post={post}
                      showCommentInput={showCommentInput}
                      hideComment={this.hideComment}
                    />
                  </CardActions>
                )}
                {post.reactionsCount === 0 && post.commentsCount === 0 ? (
                  <>
                    <Divider />
                    <CardActions disableSpacing style={{ paddingTop: 0 }}>
                      <span className="hint-label">{hint}</span>
                    </CardActions>
                  </>
                ) : null}
                <CardActions disableSpacing style={{ paddingTop: 0 }}>
                  {postId !== post._id && (
                    <CommentsList type="parent" post={post} />
                  )}
                </CardActions>
              </Card>
            ))
          : null}
        {!incomingPostsLoading && !incomingPosts.length ? (
          <NoRecords
            title={type === 'profile' ? 'No Posts' : 'No Incoming Posts'}
            message={
              type === 'profile'
                ? 'There are no posts to show'
                : 'You have not received posts'
            }
          />
        ) : null}
        {incomingPostsError && incomingPostsError.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={incomingPostsError.get('message')}
            status={'error'}
          />
        ) : null}
        {deletePostSuccess && deletePostSuccess.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={deletePostSuccess.get('message')}
            status={'success'}
          />
        ) : null}
      </Suspense>
    )
  }
}

Incoming.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const deletePostSuccess = state.getIn(
    ['Timeline', 'post', 'delete', 'success'],
    Map(),
  )
  const deletePostError = state.getIn(
    ['Timeline', 'post', 'delete', 'errors'],
    Map(),
  )
  const deletePostLoading = state.getIn(
    ['Timeline', 'post', 'delete', 'loading'],
    Map(),
  )
  const incomingPosts = state.getIn(['Timeline', 'incoming', 'success'], Map())
  const incomingPostsLoading = state.getIn(
    ['Timeline', 'incoming', 'loading'],
    false,
  )
  const incomingPostsError = state.getIn(
    ['Timeline', 'incoming', 'errors'],
    Map(),
  )
  const commentsCount = state.getIn(['Post', 'comments', 'count', 'success'])
  const user = state.getIn(['user', 'data'])
  return {
    incomingPosts,
    incomingPostsError,
    incomingPostsLoading,
    deletePostSuccess,
    deletePostError,
    deletePostLoading,
    commentsCount,
    user,
  }
}

const actionsToProps = {
  getIncomingPosts: actions.getIncomingPosts,
  deletePost: actions.deletePost,
  createOrUpdateReaction: profileActions.createOrUpdateReaction,
  getRecentPosts: actions.getRecentPosts,
  getCommentsCount: postActions.getCommentsCount,
  getComments: postActions.getComments,
  saveActionState: profileActions.saveActionState,
  savePostId: actions.savePostId,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Incoming)),
)
