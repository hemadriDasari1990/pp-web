import * as actions from '../actions'
import * as postActions from '../../Post/actions'
import * as profileActions from '../../UserProfile/actions'

import { Link, withRouter } from 'react-router-dom'
import React, { Component, Suspense, lazy } from 'react'
import getCardSubHeaderText, {
  getCardSubHeaderStatus,
} from '../../../util/getCardSubHeaderText'

import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
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
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import Fab from '@material-ui/core/Fab'
import Fade from '@material-ui/core/Fade'
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
import SkeletonCard from '../../Skeletons/components/Card'
import Slide from '@material-ui/core/Slide'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import advice from '../../../../assets/advice.svg'
import { connect } from 'react-redux'
import cons from '../../../../assets/cons.svg'
import formateNumber from '../../../util/formateNumber'
import getCreatedDate from '../../../util/getCreatedDate'
import getProvider from '../../../util/getProvider'
import getReaction from '../../../util/getReaction'
import getReactionsText from '../../../util/getReactionsText'
import perfect from '../../../../assets/emojis/perfect.svg'
import pros from '../../../../assets/pros.svg'
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

const styles = {
  smallAvatar: {
    width: 20,
    height: 20,
    borderColor: '#fff',
  },
  reactionAvatar: {
    width: 25,
    height: 25,
  },
  emojiAvatar: {
    width: 40,
    height: 40,
  },
  avatar: {
    marginTop: 0,
    width: '100%',
    textAlign: 'center',
  },
  button: {
    width: '250px !important',
    height: '35px !important',
  },
  rightButton: {
    marginLeft: 'auto',
  },
  comment: {
    marginLeft: 'auto',
    width: '250px !important',
    height: '35px !important',
  },
}

class Outgoing extends Component {
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
      items: 2,
      showMore: false,
      showMoreIndex: 0,
    }
    this.hintTimer = null
  }

  async componentDidMount() {
    this.renderHint()
    await this.loadPosts()
    await this.onInfiniteScroll()
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

  loadPosts = async () => {
    this.setState({ isLoading: true })
    if (this.props.match.params.id) {
      await this.props
        .getOutgoingPosts(this.props.match.params.id, '')
        .then(res => {
          this.setState({
            posts: [...this.state.posts, ...res.data],
            isLoading: false,
          })
        })
    } else {
      await this.props.getOutgoingPosts(this.props.user._id, '').then(res => {
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

  loadMoreItems = () => {
    if (this.state.isLoading) {
      return
    }
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.setState(prevState => ({
        items: prevState.items + 2,
        isLoading: false,
      }))
    }, 1000)
    this.loadPosts()
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
        await this.props.getOutgoingPosts(this.props.user._id)
        await this.props.getRecentPosts(this.props.user._id)
        break
      default:
        break
    }
  }

  handleButton = event => {
    this.setState({ open: !this.state.open, anchorEl: event.currentTarget })
  }

  renderHint = () => {
    const hintArray = [
      'Be the first to like',
      'Be the first to react',
      'Be the first to comment on this',
    ]
    let index = 0
    setInterval(() => {
      this.setState({
        hint: hintArray[index],
      })
      index = (index + 1) % hintArray.length
    }, 2000)
  }

  toggleShow = flag => {
    this.setState({
      showEmojis: flag,
    })
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

  showCommentInput = () => {
    this.setState({
      showCommentInput: !this.state.showCommentInput,
    })
  }

  hideComment = () => {
    this.setState({
      showCommentInput: !this.state.showCommentInput,
    })
  }

  handleComment = event => {
    this.setState({
      comment: event.target.value,
    })
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
        TransitionComponent={Fade}
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
            secondary="Once deleted and will be deleted"
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
        <ListItem className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item">
          <ListItemAvatar style={{ minWidth: 35 }}>
            <EditOutlinedIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>Edit Post</b>}
            secondary="Update the post"
          />
        </ListItem>
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
    return (
      <>
        <Link
          className="hyperlink"
          to="#"
          onClick={() => this.viewProfile('incoming', post.postedTo._id)}
        >
          {post.isAnonymous
            ? post.postedTo.userName + ' (A)'
            : post.postedTo.userName}
        </Link>
        &nbsp;
        {getProvider(post.postedTo.providerId)}&nbsp;
        <span className="grey-color hint-label">
          {'Since ' + getCreatedDate(post.postedTo.createdAt)}
        </span>
        &nbsp;
      </>
    )
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
    return <Avatar alt={post.postedTo.userName} src={post.postedTo.photoURL} />
  }

  renderCardAction = post => {
    return (
      <>
        {post.type === 'Opinion' ? (
          <Tooltip
            title={
              post.rejected
                ? 'Rejected'
                : post.approved
                ? 'Accepted'
                : 'Pending'
            }
          >
            <span
              className={
                post.approved
                  ? 'cursor status accepted '
                  : post.rejected
                  ? 'cursor status rejected '
                  : 'cursor status pending '
              }
            >
              {getCardSubHeaderStatus(post)}
            </span>
          </Tooltip>
        ) : null}
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

  renderCardSubTitle = post => {
    return (
      <>
        {getCardSubHeaderText(post.createdAt)}
        &nbsp;&nbsp;
        {!post.isAnonymous && (
          <>
            <span>
              <b>{formateNumber(post.postedTo.total_followers)}</b>
              &nbsp;Followers&nbsp;
            </span>
          </>
        )}
      </>
    )
  }

  renderCardContent = (post, index) => {
    const { classes } = this.props
    const { isLoading } = this.state
    let elements = []
    elements.push(
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
              <Avatar src={pros} className="avatar" />
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
              <Avatar src={cons} className="avatar" />
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
              <Avatar src={advice} className="avatar" />
            </ListItemAvatar>
            <ListItemText
              primary={<b>Advice</b>}
              secondary={this.renderSecondaryText(post.advice, index)}
            />
          </ListItem>
        </Slide>
      </List>,
    )
    if (post.approved) {
      elements.push(
        <>
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
                          className={classes.reactionAvatar}
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
                className="cursor actions-text v-align-middle grey-color "
              >
                {formateNumber(post.comments.length) + ' Comments'}
              </span>
            </div>
          </Slide>
          <Divider />
        </>,
      )
    }
    return elements
  }

  renderCardActions = (post, index) => {
    const { classes, user } = this.props
    const { showEmojis } = this.state
    return (
      <>
        <Tooltip
          title={getReactionsText(user._id, post.reactions)}
          placement="bottom"
        >
          <div
            className="feed"
            onMouseEnter={() => this.toggleShow(true)}
            onMouseLeave={() => this.toggleShow(false)}
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
                      <Fab className={classes.emojiAvatar} color="primary">
                        <LikeIcon color="secondary" />
                      </Fab>
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
                      <Fab className={classes.emojiAvatar} color="primary">
                        <DisLikeIcon color="secondary" />
                      </Fab>
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
                      <Fab
                        className={classes.emojiAvatar}
                        style={{ backgroundColor: '#ff0016c7' }}
                      >
                        <LoveIcon color="secondary" />
                      </Fab>
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
                      <Fab className={classes.emojiAvatar}>
                        <img src={perfect} />
                      </Fab>
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
                      <Fab className={classes.emojiAvatar}>
                        <img src={tounghout} />
                      </Fab>
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
                      <Fab className={classes.emojiAvatar}>
                        <img src={thinking} />
                      </Fab>
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
      </>
    )
  }

  renderCreateComment = (post, index) => {
    const { showCommentInput, postId } = this.state
    if (showCommentInput && postId == post._id) {
      return (
        <CardActions disableSpacing className="p-0">
          <CreateComment
            post={post}
            showCommentInput={showCommentInput}
            hideComment={this.hideComment}
          />
        </CardActions>
      )
    }
    return null
  }

  renderHintElements = (post, index) => {
    if (
      post.reactionsCount === 0 &&
      post.approved &&
      post.commentsCount === 0
    ) {
      return (
        <>
          <Divider />
          <CardActions disableSpacing className="p-0">
            <span>{hint}</span>
          </CardActions>
        </>
      )
    }
    return null
  }

  renderCommentsList = (post, index) => {
    return <CommentsList key={post._id} postId={post._id} />
  }

  renderNoRecords = () => {
    const { posts, isLoading } = this.state
    if (!isLoading && !posts.length) {
      return (
        <NoRecords
          title="No Outgoing Posts"
          message="You haven't shared opinions to others"
        />
      )
    }
    return null
  }

  renderErrorSnackBar = () => {
    const { outgoingPostsError } = this.props
    if (outgoingPostsError && outgoingPostsError.size > 0) {
      return (
        <CustomizedSnackbars
          open={true}
          message={outgoingPostsError.get('message')}
          status={'error'}
        />
      )
    }
    return null
  }

  render() {
    const {
      outgoingPosts,
      outgoingPostsError,
      outgoingPostsLoading,
      deletePostSuccess,
      deletePostError,
      deletePostLoading,
      user,
      classes,
    } = this.props
    const {
      open,
      anchorEl,
      showEmojis,
      showCommentInput,
      postId,
      hint,
      posts,
      isLoading,
      items,
    } = this.state
    return (
      <Suspense>
        {isLoading ? <SkeletonCard /> : null}
        {!isLoading && posts.length
          ? posts.map((post, index) => (
              <Card key={post._id}>
                <CardHeader
                  avatar={this.renderCardAvatar(post)}
                  action={this.renderCardAction(post)}
                  title={this.renderTitle(post)}
                  subheader={this.renderCardSubTitle(post)}
                />
                <CardContent className="p-0">
                  {this.renderCardContent(post, index)}
                </CardContent>
                {post.approved ? (
                  <CardActions className="card-actions" disableSpacing>
                    {this.renderCardActions(post, index)}
                  </CardActions>
                ) : null}
                {post.comments.length || postId == post._id ? (
                  <Divider />
                ) : null}
                {this.renderCreateComment(post, index)}
                {this.renderHintElements(post, index)}
                <CardActions disableSpacing className="p-0">
                  {this.renderCommentsList(post, index)}
                </CardActions>
              </Card>
            ))
          : null}
        {this.renderNoRecords()}
        {this.renderErrorSnackBar()}
      </Suspense>
    )
  }
}

Outgoing.propTypes = {
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
  const outgoingPosts = state.getIn(['Timeline', 'outgoing', 'success'], Map())
  const outgoingPostsLoading = state.getIn(
    ['Timeline', 'outgoing', 'loading'],
    false,
  )
  const outgoingPostsError = state.getIn(
    ['Timeline', 'outgoing', 'errors'],
    Map(),
  )
  const commentsCount = state.getIn(['Post', 'comments', 'count', 'success'])
  return {
    outgoingPosts,
    outgoingPostsError,
    outgoingPostsLoading,
    deletePostSuccess,
    deletePostError,
    deletePostLoading,
    commentsCount,
  }
}

const actionsToProps = {
  deletePost: actions.deletePost,
  getOutgoingPosts: actions.getOutgoingPosts,
  createOrUpdateReaction: profileActions.createOrUpdateReaction,
  getRecentPosts: actions.getRecentPosts,
  getCommentsCount: postActions.getCommentsCount,
  saveActionState: profileActions.saveActionState,
  savePostId: actions.savePostId,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Outgoing)),
)
