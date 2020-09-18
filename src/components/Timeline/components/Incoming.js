import * as actions from '../actions'
import * as postActions from '../../Post/actions'
import * as profileActions from '../../UserProfile/actions'

import { Link, withRouter } from 'react-router-dom'
import React, { Component, Suspense, lazy } from 'react'

import AdviceIcon from '@material-ui/icons/CheckCircle'
import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import AvatarOnline from '../../AvatarOnline/components/AvatarOnline'
import Button from '@material-ui/core/Button'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
// import CommentIcon from '@material-ui/icons/CommentOutlined';
import CommentIcon from '@material-ui/icons/CommentOutlined'
import ConsIcon from '@material-ui/icons/RemoveCircleOutlined'
// import CommentIcon from '@material-ui/icons/ChatBubbleOutline'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import DisLikeIcon from '@material-ui/icons/ThumbDownAlt'
import Divider from '@material-ui/core/Divider'
import FacebookIcon from '@material-ui/icons/Facebook'
import IconButton from '@material-ui/core/IconButton'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import LikeOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import LoveIcon from '@material-ui/icons/Favorite'
import { Map } from 'immutable'
import Menu from '@material-ui/core/Menu'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import PropTypes from 'prop-types'
import ProsIcon from '@material-ui/icons/AddCircleOutlined'
import ScheduleIcon from '@material-ui/icons/Schedule'
import SkeletonCard from '../../Skeletons/components/Card'
import Slide from '@material-ui/core/Slide'
import Tooltip from '@material-ui/core/Tooltip'
import TwitterIcon from '@material-ui/icons/Twitter'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import getCardSubHeaderText from '../../../util/getCardSubHeaderText'
import getCreatedDate from '../../../util/getCreatedDate'
import getProvider from '../../../util/getProvider'
import getReaction from '../../../util/getReaction'
import getReactionsText from '../../../util/getReactionsText'
import perfect from '../../../../assets/emojis/perfect.svg'
import renderColor from '../../../util/renderColor'
import renderUserNames from '../../../util/renderUserNames'
import thinking from '../../../../assets/emojis/thinking.svg'
import tounghout from '../../../../assets/emojis/tounghout.svg'
import { withStyles } from '@material-ui/core/styles'

const CommentsList = lazy(() => import('./comments/List'))
const CreateComment = lazy(() => import('./comments/CreateComment'))
const CustomizedSnackbars = lazy(() =>
  import('../../Snackbar/components/Snackbar'),
)
const NoRecords = lazy(() => import('../../NoRecords/components/NoRecords'))
const ImgesList = lazy(() => import('../../Images/components/List'))
const WhoToFollow = lazy(() =>
  import('../../WhoToFollow/components/WhoToFollow'),
)

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
      posts: [],
      isLoading: false,
      items: 10,
      showMore: false,
      showMoreIndex: 0,
      comment: null,
    }
    this.hintTimer = null
  }

  componentDidMount() {
    this.loadPosts()
    this.onInfiniteScroll()
  }

  componentWillUnmount() {
    clearInterval(this.hintTimer)
  }

  /* code for infinite scroll */
  onInfiniteScroll = () => {
    this.refs.iScroll.addEventListener('scroll', () => {
      if (
        this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
        this.refs.iScroll.scrollHeight - 20
      ) {
        this.loadMoreItems()
      }
    })
  }

  getType = type => {
    if (!type) {
      return ''
    }
    let newType = ''
    switch (type.toLowerCase()) {
      case 'feed':
        newType = 'All'
        break
      case 'meme':
        newType = 'Meme'
        break
      default:
        break
    }
    return newType
  }

  loadPosts = async () => {
    this.setState({ isLoading: true })
    if (this.props.match.params.id) {
      await this.props
        .getIncomingPosts(this.props.match.params.id, '')
        .then(res => {
          this.setState({
            posts: [...this.state.posts, ...res.data],
            isLoading: false,
          })
        })
    } else {
      await this.props
        .getIncomingPosts(this.props.user._id, this.getType(this.props.type))
        .then(res => {
          this.setState(
            {
              posts: [...this.state.posts, ...res.data],
              isLoading: false,
            },
            () => {},
          )
        })
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
    const randomNumber = Math.floor(Math.random() * hintArray.length)
    let hintText = hintArray[randomNumber]
    setInterval(() => {
      hintText = hintArray[randomNumber]
    }, 500)
    return hintText
  }

  createOrUpdateReaction = async (userId, postId, reaction, index) => {
    await this.props
      .createOrUpdateReaction(userId, postId, reaction)
      .then(async res => {
        const newReaction = res.data.reaction
        newReaction.user = this.props.user
        const posts = [...this.state.posts]
        const post = posts.find(post => post._id === postId)
        const reaction = post.reactions.find(
          react => react.user._id === this.props.user._id,
        )
        const reactionIndex = post.reactions.findIndex(
          react => react.user._id === this.props.user._id,
        )
        res.data.reaction != null && reaction
          ? post.reactions.splice(reactionIndex, 1, newReaction)
          : null
        res.data.reaction != null && !reaction
          ? post.reactions.push(newReaction)
          : null
        posts.splice(index, 1, post)
        this.setState({
          posts,
          showEmojis: !this.state.showEmojis,
        })
      })
  }

  showCommentInput = postId => {
    this.setState({
      showCommentInput: true,
      postId,
    })
  }

  getNewComment = comment => {
    // const { posts } = this.state;
    // const index = posts.findIndex(p => p._id === comment.post);
    // posts[index].comments = [comment, ...posts[index].comments]
    this.setState({
      comment,
    })
  }

  getComments = (postId, comments) => {
    const finalComments =
      postId === this.state.postId && this.state.comment
        ? [this.state.comment, ...comments]
        : comments
    return finalComments
  }

  hideComment = postId => {
    this.setState({
      showCommentInput: !this.state.showCommentInput,
    })
    // this.props.getComments(postId)
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
          className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item"
          onClick={() => this.handleMenuItem('delete', post._id)}
        >
          <ListItemAvatar style={{ minWidth: 35 }}>
            <DeleteOutlineIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>Delete Post</b>}
            secondary="Once deleted can't be done"
          />
        </ListItem>
        <ListItem className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item">
          <ListItemAvatar style={{ minWidth: 35 }}>
            <CancelPresentationIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>Hide Post</b>}
            secondary="See fewer posts like this"
          />
        </ListItem>
        {!post.isAnonymous && (
          <ListItem className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item">
            <ListItemAvatar style={{ minWidth: 35 }}>
              <ScheduleIcon />
            </ListItemAvatar>
            <ListItemText
              className="menu-item-text"
              primary={<b>Snooz posts</b>}
              secondary="Temporarily stop seeing posts"
            />
          </ListItem>
        )}
        {this.renderSocialShare()}
      </Menu>
    )
  }

  renderSocialShare = () => {
    let element = null
    switch (this.props.user.providerId.toLowerCase()) {
      case 'facebook.com':
        element = (
          <ListItem className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item">
            <ListItemAvatar style={{ minWidth: 35 }}>
              <FacebookIcon />
            </ListItemAvatar>
            <ListItemText
              className="menu-item-text"
              primary={<b>Share</b>}
              secondary="Share this post to Facebook"
            />
          </ListItem>
        )
        break
      case 'twitter.com':
        element = (
          <ListItem className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item">
            <ListItemAvatar style={{ minWidth: 35 }}>
              <TwitterIcon />
            </ListItemAvatar>
            <ListItemText
              className="menu-item-text"
              primary={<b>Share</b>}
              secondary="Share this post to Twitter"
            />
          </ListItem>
        )
        break
      default:
        break
    }
    return element
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

  loadMoreItems = () => {
    if (this.state.isLoading) {
      return
    }
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.setState(prevState => ({
        items: prevState.items + 5,
        isLoading: false,
      }))
    }, 3000)
    this.loadPosts()
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
            {post.type === 'Generic'
              ? 'Updated status'
              : post.type === 'Meme'
              ? 'Added Meme'
              : 'Since ' + getCreatedDate(post.postedBy.createdAt)}
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

  showMore = index => {
    this.setState({
      showMore: !this.state.showMore,
      showMoreIndex: index,
    })
  }

  renderSecondaryText = (message, index) => {
    const { showMore, showMoreIndex } = this.state
    return (
      <React.Fragment>
        <Typography component="p" variant="body2" color="textPrimary">
          {!showMore && message && message.length > 200
            ? message.slice(0, 200)
            : message}
          {showMore && message && showMoreIndex === index ? message : null}
          {showMore && message && showMoreIndex !== index
            ? message.slice(0, 200)
            : null}
          {message.length > 200 ? (
            <span
              className="grey-color cursor hint-label"
              onClick={() => this.showMore(index)}
            >
              {' '}
              {showMore && showMoreIndex === index
                ? ' Show Less'
                : ' ...Show More'}
            </span>
          ) : null}
        </Typography>
      </React.Fragment>
    )
  }

  renderCardAvatar = post => {
    if (
      (post.isAnonymous && post.postedBy._id == user._id) ||
      !post.isAnonymous
    ) {
      return <AvatarOnline user={post.postedBy} />
    }
    return (
      <Avatar style={{ color: '#ffffff', backgroundColor: '#5383ff' }}>
        A
      </Avatar>
    )
  }

  renderCardAction = post => {
    return (
      <>
        <Tooltip title="Update">
          <IconButton aria-label="settings" onClick={this.handleButton}>
            <Zoom in={true} timeout={2000}>
              <MoreHorizIcon />
            </Zoom>
          </IconButton>
        </Tooltip>
        {this.renderMenu(post)}
      </>
    )
  }

  renderCardTitle = post => {
    if (
      (post.isAnonymous && post.postedBy._id == user._id) ||
      !post.isAnonymous
    ) {
      return this.renderTitle(post)
    }
    return <b className="hyperlink">Annonymous User</b>
  }

  renderCardSubTitle = post => {
    return (
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
    )
  }

  renderCardContent = (post, index) => {
    const { classes } = this.props
    const { isLoading } = this.state
    let elements = []
    if (post.type === 'Generic' || post.type === 'Meme') {
      elements.push(
        <>
          <List>
            <ListItem className="w-us" alignItems="flex-start">
              <Zoom in={true} timeout={2000}>
                <ListItemText
                  primary={this.renderSecondaryText(post.message, index)}
                />
              </Zoom>
            </ListItem>
          </List>
          <ImgesList images={post.images} />
        </>,
      )
    }
    if (post.type === 'Opinion') {
      elements.push(
        <>
          <List>
            <Slide
              direction="right"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <ListItem className="w-us" alignItems="flex-start">
                <ListItemAvatar>
                  <IconButton>
                    <ProsIcon color="primary" />
                  </IconButton>
                </ListItemAvatar>
                <ListItemText
                  primary={<b>Pros</b>}
                  secondary={this.renderSecondaryText(post.pros, index)}
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
              <ListItem className="w-us" alignItems="flex-start">
                <ListItemAvatar>
                  <IconButton>
                    <ConsIcon color="primary" />
                  </IconButton>
                </ListItemAvatar>
                <ListItemText
                  primary={<b>Cons</b>}
                  secondary={this.renderSecondaryText(post.cons, index)}
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
              <ListItem className="w-us" alignItems="flex-start">
                <ListItemAvatar>
                  <IconButton>
                    <AdviceIcon color="primary" />
                  </IconButton>
                </ListItemAvatar>
                <ListItemText
                  primary={<b>Advice</b>}
                  secondary={this.renderSecondaryText(post.advice, index)}
                />
              </ListItem>
            </Slide>
          </List>
        </>,
      )
    }
    elements.push(
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
            <Tooltip title={renderUserNames(post.reactions)} placement="bottom">
              <Link
                to="#"
                onClick={() => this.viewReactions('post-reactions', post._id)}
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
      </Slide>,
    )
    return elements
  }

  renderCardActions = (post, index) => {
    const { classes, user } = this.props
    const { showEmojis } = this.state
    return (
      <React.Fragment>
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
                    index,
                  )
                }
              >
                <Zoom in={true} timeout={2000}>
                  <div className="card-button-text">
                    {post.reactions.filter(r => r.user._id === user._id)
                      .length ? (
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
                            ? getReactionsText(user._id, post.reactions)
                            : '',
                        ),
                      }}
                    >
                      {getReactionsText(user._id, post.reactions) || 'Like'}
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
                        index,
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
                        index,
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
                        index,
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
                        index,
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
                        index,
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
                        index,
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
            onClick={() => this.showCommentInput(post._id)}
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
      </React.Fragment>
    )
  }

  renderCreateComment = (post, index) => {
    const { showCommentInput, postId } = this.state
    if (showCommentInput && postId == post._id) {
      return (
        <CardActions disableSpacing className="p-0">
          <CreateComment
            type="parent"
            post={post}
            showCommentInput={showCommentInput}
            hideComment={this.hideComment}
            getNewComment={this.getNewComment}
          />
        </CardActions>
      )
    }
    return null
  }

  renderHintElements = (post, index) => {
    if (post.reactionsCount === 0 && post.commentsCount === 0) {
      return (
        <>
          <Divider />
          <CardActions disableSpacing>
            <span className="hint-label">{this.renderHint()}</span>
          </CardActions>
        </>
      )
    }
    return null
  }

  renderNoRecords = () => {
    const { type } = this.props
    const { posts, isLoading } = this.state
    if (!isLoading && !posts.length) {
      return (
        <NoRecords
          title={type === 'profile' ? 'No Posts' : 'No Incoming Posts'}
          message={
            type === 'profile'
              ? 'There are no posts to show'
              : 'You have not received posts'
          }
        />
      )
    }
    return null
  }

  renderErrorSnackBar = () => {
    const { incomingPostsError } = this.props
    if (incomingPostsError && incomingPostsError.size > 0) {
      return (
        <CustomizedSnackbars
          open={true}
          message={incomingPostsError.get('message')}
          status={'error'}
        />
      )
    }
    return null
  }

  renderDeletePostSuccessSnackBar = () => {
    const { deletePostSuccess } = this.props
    if (deletePostSuccess && deletePostSuccess.size > 0) {
      return (
        <CustomizedSnackbars
          open={true}
          message={deletePostSuccess.get('message')}
          status={'success'}
        />
      )
    }
    return null
  }

  renderCommentsList = (post, index) => {
    return (
      <CommentsList
        key={post._id}
        postId={post._id}
        totalComments={post.commentsCount}
      />
    )
  }

  renderMainElements = () => {
    const { postId, posts, isLoading, items } = this.state
    const elements = []
    if (!isLoading) {
      const postsElements = posts.slice(0, items).map((post, index) => (
        <Card key={post._id}>
          <CardHeader
            avatar={this.renderCardAvatar(post)}
            action={this.renderCardAction(post)}
            title={this.renderCardTitle(post)}
            subheader={this.renderCardSubTitle(post)}
          />
          <CardContent className="p-0">
            {this.renderCardContent(post, index)}
            <Divider />
          </CardContent>
          <CardActions className="card-actions p-0" disableSpacing>
            {this.renderCardActions(post, index)}
          </CardActions>
          {post.comments.length || postId == post._id ? <Divider /> : null}
          {this.renderCreateComment(post, index)}
          {this.renderHintElements(post, index)}
          <CardActions disableSpacing className="p-0">
            {this.renderCommentsList(post, index)}
          </CardActions>
        </Card>
      ))
      elements.push(postsElements)
    }
    // elements.splice(5, 0, <WhoToFollow key={'key-'+1}/>);
    return elements
  }

  render() {
    const {} = this.props
    const { postId, posts, isLoading, items } = this.state
    return (
      <Suspense>
        <div className="center-grid" ref="iScroll">
          {isLoading ? <SkeletonCard loading={isLoading} /> : null}
          {this.renderMainElements()}
        </div>
        {!isLoading ? this.renderNoRecords() : null}
        {this.renderErrorSnackBar()}
        {this.renderDeletePostSuccessSnackBar()}
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
  // const posts = state.getIn(['Timeline', 'incoming', 'success'], Map())
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
    // posts,
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
