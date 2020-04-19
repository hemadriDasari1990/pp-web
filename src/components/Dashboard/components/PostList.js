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
import Post from '../../Post/components/Post'
import like from '../../../../assets/emojis/like.svg'
import angry from '../../../../assets/emojis/angry.svg'
import love from '../../../../assets/emojis/love.svg'
import silly from '../../../../assets/emojis/silly.svg'
import smiley from '../../../../assets/emojis/smiley.svg'
import wow from '../../../../assets/emojis/surprise.svg'
import sad from '../../../../assets/emojis/sad.svg'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import advice from '../../../../assets/advice.svg'
import pros from '../../../../assets/pros.svg'
import cons from '../../../../assets/cons.svg'

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
      open: false,
      anchorEl: undefined,
    }
  }

  componentDidMount() {
    this.props.getIncomingPosts(this.props.user._id)
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
        await this.props.getIncomingPosts(this.props.user._id)
        break
      default:
        break
    }
  }

  handleButton = event => {
    this.setState({ open: !this.state.open, anchorEl: event.currentTarget })
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
      case 'like':
        color = '#2078f4'
        break
      case 'love':
        color = '#4de0f9'
        break
      case 'sad':
        color = '#4de0f9'
        break
      case 'wow':
        color = '#4de0f9'
        break
      case 'silly':
        color = '#4de0f9'
        break
      case 'smiley':
        color = '#4de0f9'
        break
      case 'angry':
        color = '#4de0f9'
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
      names += 'You and ' + formateNumber(reactions.length) + 'Other'
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

  render() {
    const {
      incomingPosts,
      incomingPostsError,
      incomingPostsLoading,
      deletePostSuccess,
      deletePostError,
      deletePostLoading,
      iposted,
      ireceived,
      classes,
    } = this.props
    const { open, anchorEl } = this.state
    return (
      <React.Fragment>
        <Post />
        {!incomingPostsLoading && incomingPosts.length
          ? incomingPosts.map(post => (
              <Card key={post._id}>
                <CardHeader
                  avatar={
                    !post.isAnonymous ? (
                      <Avatar
                        alt={
                          iposted
                            ? post.postedTo.userName
                            : ireceived
                            ? post.postedBy.userName
                            : 'Image not Available'
                        }
                        src={
                          iposted
                            ? post.postedTo.photoURL
                            : ireceived
                            ? post.postedBy.photoURL
                            : 'A'
                        }
                      />
                    ) : (
                      <Avatar
                        style={{ color: '#ffffff', backgroundColor: '#1976d2' }}
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
                              ? 'status approved'
                              : post.rejected
                              ? 'status rejected'
                              : 'status pending'
                          }
                        ></span>
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
                    !post.isAnonymous || post.isAnonymous ? (
                      <>
                        <Link
                          className="hyperlink"
                          to={
                            iposted
                              ? `/profile/${post.postedTo._id}`
                              : ireceived
                              ? `/profile/${post.postedBy._id}`
                              : ''
                          }
                        >
                          {iposted
                            ? post.postedTo.userName
                            : ireceived
                            ? post.postedBy.userName
                            : ''}
                        </Link>
                        {ireceived && post.postedBy.likes.length
                          ? ' ' +
                            formateNumber(post.postedBy.likes.length) +
                            ' Liked'
                          : iposted && post.postedTo.likes.length
                          ? ' ' +
                            formateNumber(post.postedTo.likes.length) +
                            ' Liked'
                          : ''}
                      </>
                    ) : (
                      <b>Annonymous User</b>
                    )
                  }
                  subheader={moment(post.createdAt).fromNow()}
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
                  <div className="actions-align mb-10">
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
                                src={this.getReaction(react ? react.type : '')}
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
                          Shares
                        </span>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          : null}
        {!incomingPostsLoading && !incomingPosts.length ? (
          <Typography variant="h3" className="text-center">
            {iposted
              ? `You haven't posted to others`
              : `You haven't received posts `}
          </Typography>
        ) : null}
        {incomingPostsLoading ? <Loader /> : null}
        {incomingPostsError && incomingPostsError.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={incomingPostsError.get('message')}
            status={'error'}
          />
        ) : null}
      </React.Fragment>
    )
  }
}

PostList.propTypes = {
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
  return {
    incomingPosts,
    incomingPostsError,
    incomingPostsLoading,
    deletePostSuccess,
    deletePostError,
    deletePostLoading,
  }
}

const actionsToProps = {
  getIncomingPosts: actions.getIncomingPosts,
  deletePost: actions.deletePost,
  getOutgoingPosts: actions.getOutgoingPosts,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(PostList)),
)
