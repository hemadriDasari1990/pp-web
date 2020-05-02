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
import MenuItem from '@material-ui/core/MenuItem'
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
import like from '../../../../assets/emojis/like.svg'
import dislike from '../../../../assets/emojis/dislike.svg'
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
}

class Outgoing extends Component {
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
    await this.props.getOutgoingPosts(this.props.user._id)
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

  createOrUpdateReaction = async (userId, postId, reaction) => {
    await this.props
      .createOrUpdateReaction(userId, postId, reaction)
      .then(async data => {
        await this.props.getOutgoingPosts(this.props.user._id)
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
    const { open, anchorEl, showEmojis, showCommentInput, comment } = this.state
    return (
      <React.Fragment>
        {!outgoingPostsLoading && outgoingPosts.length
          ? outgoingPosts.map(post => (
              <Card key={post._id}>
                <CardHeader
                  avatar={
                    <Avatar
                      alt={post.postedTo.userName}
                      src={post.postedTo.photoURL}
                    />
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
                        <MenuItem
                          onClick={() =>
                            this.handleMenuItem('delete', post._id)
                          }
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </>
                  }
                  title={
                    <Link
                      className="hyperlink"
                      to={`/profile/${post.postedTo._id}`}
                    >
                      {post.isAnonymous
                        ? post.postedTo.userName + ' (A)'
                        : post.postedTo.userName}
                    </Link>
                  }
                  subheader={getCardSubHeaderText(post.updatedAt)}
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
                      {post.reactions.length > 0
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
                      {formateNumber(post.reactions.length) + ' - '}
                    </span>
                    <span className="cursor actions-text v-align-middle grey-color ">
                      {formateNumber(post.comments.length) + ' Comments'}
                    </span>
                  </div>
                  <Divider />
                </CardContent>
                <CardActions disableSpacing>
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
                          style={{
                            color: renderColor(
                              getReactionsText(user._id, post.reactions),
                            ),
                          }}
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
                          <span className="ml-7">
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
                                <img src={like} width={43} height={38} />
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
                                <img src={dislike} width={43} height={38} />
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
                                <img src={perfect} width={43} height={38} />
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
                                <img src={thinking} width={43} height={38} />
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
                                <img src={love} width={40} height={40} />
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
                                <img src={tounghout} width={40} height={40} />
                              </Tooltip>
                            </div>
                            <div
                              className="v-align-middle reaction-icon"
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
                      post={post}
                      showCommentInput={showCommentInput}
                      hideComment={this.hideComment}
                    />
                  </CardActions>
                )}
                <CardActions disableSpacing style={{ paddingTop: 0 }}>
                  <CommentsList post={post} />
                </CardActions>
              </Card>
            ))
          : null}
        {!outgoingPostsLoading && !outgoingPosts.length ? (
          <NoRecords
            title="No Outgoing Posts"
            message="Seems You haven't started sharing opinions to others. What are you
          waiting for. Start sharing now and let them know :)"
          />
        ) : null}
        {outgoingPostsLoading && outgoingPosts && !outgoingPosts.length ? (
          <Loader />
        ) : null}
        {outgoingPostsError && outgoingPostsError.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={outgoingPostsError.get('message')}
            status={'error'}
          />
        ) : null}
      </React.Fragment>
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
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Outgoing)),
)
