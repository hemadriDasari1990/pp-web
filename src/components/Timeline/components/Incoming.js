import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import formateNumber from '../../../util/formateNumber'
import Menu from '@material-ui/core/Menu'
import * as actions from '../actions'
import { Map, fromJS } from 'immutable'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import Loader from '../../Loader/components/Loader'
import { Link } from 'react-router-dom'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import advice from '../../../../assets/advice.svg'
import pros from '../../../../assets/pros.svg'
import cons from '../../../../assets/cons.svg'
import getReaction from '../../../util/getReaction'
import renderUserNames from '../../../util/renderUserNames'
import renderColor from '../../../util/renderColor'
import * as profileActions from '../../UserProfile/actions'
import Button from '@material-ui/core/Button'
// import like from '../../../../assets/emojis/like.svg'
// import dislike from '../../../../assets/emojis/dislike.svg'
import perfect from '../../../../assets/emojis/perfect.svg'
import thinking from '../../../../assets/emojis/thinking.svg'
import love from '../../../../assets/emojis/love.svg'
import tounghout from '../../../../assets/emojis/tounghout.svg'
import wow from '../../../../assets/emojis/surprise.svg'
import Divider from '@material-ui/core/Divider'
import getReactionsText from '../../../util/getReactionsText'
import NoRecords from '../../NoRecords/components/NoRecords'
import commentIcon from '../../../../assets/comment.svg'
import CreateComment from './comments/CreateComment'
import * as postActions from '../../Post/actions'
import CommentsList from './comments/List'
import getCardSubHeaderText from '../../../util/getCardSubHeaderText'
import { getCardSubHeaderStatus } from '../../../util/getCardSubHeaderText'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import DisLikeIcon from '@material-ui/icons/ThumbDown'

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
      comment: '',
    }
  }

  async componentDidMount() {
    await this.props.getIncomingPosts(this.props.user._id, '')
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
    this.setState({
      showEmojis: flag,
    })
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

  createOrUpdateReaction = async (userId, postId, reaction) => {
    await this.props
      .createOrUpdateReaction(userId, postId, reaction)
      .then(async data => {
        await this.props.getIncomingPosts(this.props.user._id, '')
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

  handleComment = event => {
    this.setState({
      comment: event.target.value,
    })
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
    const { open, anchorEl, showEmojis, showCommentInput, comment } = this.state
    return (
      <React.Fragment>
        {incomingPostsLoading && incomingPosts && !incomingPosts.length ? (
          <Loader />
        ) : null}
        {!incomingPostsLoading && incomingPosts.length
          ? incomingPosts.map(post => (
              <Card key={post._id}>
                <CardHeader
                  avatar={
                    !post.isAnonymous ? (
                      <Avatar
                        alt={post.postedBy.userName}
                        src={post.postedBy.photoURL}
                      />
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
                              ? 'accepted ' + 'reactions-subheader'
                              : post.rejected
                              ? 'rejected ' + 'reactions-subheader'
                              : 'pending ' + 'reactions-subheader'
                          }
                        >
                          {getCardSubHeaderStatus(post)}
                        </span>
                      </Tooltip>
                      <Tooltip title="Update">
                        <IconButton
                          aria-label="settings"
                          onClick={this.handleButton}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        open={open}
                        onClose={this.handleClose}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'bottom',
                        }}
                        getContentAnchorEl={null}
                      >
                        <ListItem
                          onClick={() =>
                            this.handleMenuItem('delete', post._id)
                          }
                        >
                          Delete
                        </ListItem>
                      </Menu>
                    </>
                  }
                  title={
                    !post.isAnonymous ? (
                      <>
                        <Link
                          className="hyperlink"
                          to={`/profile/${post.postedBy._id}`}
                        >
                          {post.postedBy.userName}
                        </Link>
                      </>
                    ) : (
                      <b className="hyperlink">Annonymous User</b>
                    )
                  }
                  subheader={getCardSubHeaderText(post.createdAt)}
                />
                <CardContent style={{ minHeight: '300px !important' }}>
                  <List>
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
                              {post.pros ? post.pros : 'No comments added'}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
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
                              {post.cons ? post.cons : 'No comments added'}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
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
                              {post.advice ? post.advice : 'No comments added'}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </List>
                  <div className="row ml-15 mr-15">
                    <AvatarGroup>
                      {post.reactionsCount > 0
                        ? post.reactions.slice(0, 3).map(react => (
                            <Tooltip
                              title={renderUserNames(post.reactions)}
                              placement="bottom"
                            >
                              <Avatar
                                className={classes.smallAvatar}
                                key={react._id}
                                alt="Image Not Available"
                                src={getReaction(react ? react.type : '')}
                              />
                            </Tooltip>
                          ))
                        : 'No Reactions'}
                    </AvatarGroup>
                    <Tooltip
                      title={renderUserNames(post.reactions)}
                      placement="bottom"
                    >
                      <Link
                        to={`/post/${post._id}/reactions`}
                        className="actions-text"
                      ></Link>
                    </Tooltip>
                    <span className="cursor actions-text v-align-middle grey-color ">
                      {formateNumber(post.reactionsCount) + ' - '}
                    </span>
                    <span className="cursor actions-text v-align-middle grey-color ">
                      {formateNumber(post.commentsCount) + ' Comments'}
                    </span>
                  </div>
                  <Divider />
                </CardContent>
                <CardActions disableSpacing>
                  <Tooltip title={getReactionsText(user._id, post.reactions)}>
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
                            )
                          }
                        >
                          <Avatar
                            className={classes.smallAvatar}
                            src={getReaction(
                              getReactionsText(user._id, post.reactions),
                            )}
                          />
                          <span
                            style={{
                              color: renderColor(
                                getReactionsText(user._id, post.reactions),
                              ),
                              marginLeft: 7,
                            }}
                          >
                            {getReactionsText(user._id, post.reactions)}
                          </span>
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
                                <Avatar className={classes.reactionAvatar}>
                                  <LikeIcon color="secondary" />
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
                                <Avatar className={classes.reactionAvatar}>
                                  <DisLikeIcon />
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
                                <Avatar className={classes.reactionAvatar}>
                                  <img src={perfect} />
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
                                <Avatar className={classes.reactionAvatar}>
                                  <img src={thinking} />
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
                                <Avatar className={classes.reactionAvatar}>
                                  <img src={love} />
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
                                <Avatar className={classes.reactionAvatar}>
                                  <img src={tounghout} />
                                </Avatar>
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
                                <Avatar className={classes.reactionAvatar}>
                                  <img src={wow} />
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
                      <img className={classes.smallAvatar} src={commentIcon} />
                      <span style={{ marginLeft: 7 }}>Comment</span>
                    </Button>
                  </Tooltip>
                </CardActions>
                {showCommentInput && (
                  <CardActions disableSpacing style={{ paddingTop: 0 }}>
                    <CreateComment
                      type="parent"
                      post={post}
                      showCommentInput={showCommentInput}
                      hideComment={this.hideComment}
                    />
                  </CardActions>
                )}
                <CardActions disableSpacing style={{ paddingTop: 0 }}>
                  <CommentsList type="parent" post={post} />
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
      </React.Fragment>
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
  return {
    incomingPosts,
    incomingPostsError,
    incomingPostsLoading,
    deletePostSuccess,
    deletePostError,
    deletePostLoading,
    commentsCount,
  }
}

const actionsToProps = {
  getIncomingPosts: actions.getIncomingPosts,
  deletePost: actions.deletePost,
  createOrUpdateReaction: profileActions.createOrUpdateReaction,
  getRecentPosts: actions.getRecentPosts,
  getCommentsCount: postActions.getCommentsCount,
  getComments: postActions.getComments,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Incoming)),
)
