import * as timelineActions from '../../Timeline/actions'

import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import BackIcon from '@material-ui/icons/ArrowBack'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Loader from '../../Loader/components/Loader'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import advice from '../../../../assets/advice.svg'
import { connect } from 'react-redux'
import cons from '../../../../assets/cons.svg'
import formateNumber from '../../../util/formateNumber'
import { getCardSubHeaderStatus } from '../../../util/getCardSubHeaderText'
import getCardSubHeaderText from '../../../util/getCardSubHeaderText'
import getProvider from '../../../util/getProvider'
import getReaction from '../../../util/getReaction'
import pros from '../../../../assets/pros.svg'
import renderUserNames from '../../../util/renderUserNames'
import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'

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

class PostDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      anchorEl: undefined,
    }
  }

  componentDidMount() {
    if (this.props.notification) {
      this.props.getPostDetails(this.props.notification.resourceId)
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleMenuItem = async (val, postId) => {
    switch (val) {
      case 'delete':
        this.props.deletePost(postId)
        this.setState({
          open: false,
        })
        this.props.getPostDetails(this.props.notification.resourceId)
        break
      default:
        break
    }
  }

  handleButton = event => {
    this.setState({ open: !this.state.open, anchorEl: event.currentTarget })
  }

  updatePost = async (postDetails, value) => {
    switch (value) {
      case 'approve':
        await this.props.updatePost(postDetails._id, {
          approved: true,
        })
        break
      case 'reject':
        await this.props.updatePost(postDetails._id, {
          rejected: true,
        })
        break
      default:
        break
    }
    this.props.getPostDetails(this.props.notification.resourceId)
  }

  render() {
    const {
      classes,
      postDetails,
      postDetailsError,
      postDetailsLoading,
      user,
    } = this.props
    const { open, anchorEl } = this.state
    return (
      <React.Fragment>
        <Grid container spacing={1}>
          <Grid item lg={2} xs={12}>
            <IconButton onClick={() => this.props.goBack()} color="primary">
              <BackIcon />
            </IconButton>
          </Grid>
          <Grid item lg={10} xs={12}>
            <ListSubheader component="div" id="nested-list-subheader">
              {postDetails && !postDetails.isAnonymous ? (
                <>
                  Post From{' '}
                  <Link
                    className="hyperlink"
                    to={`/profile/${postDetails.postedBy._id}`}
                  >
                    {postDetails.postedBy._id === user._id
                      ? 'You'
                      : postDetails.postedBy.userName}
                  </Link>
                  &nbsp;
                  {getProvider(postDetails.postedBy.providerId)}
                </>
              ) : (
                <>
                  Post From <b className="hyperlink">Annonymous User</b>
                </>
              )}
            </ListSubheader>
          </Grid>
          <Grid item lg={12} xs={12} md={12} sm={12} xl={12}>
            {!postDetailsLoading && postDetails ? (
              <>
                {postDetails.type === 'Generic' && (
                  <>
                    <List>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="p"
                                variant="body2"
                                color="textPrimary"
                              >
                                {postDetails.message}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </List>
                  </>
                )}
                {postDetails.type === 'Opinion' && (
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
                              {postDetails.pros}
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
                              {postDetails.cons}
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
                              {postDetails.advice}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </List>
                )}
              </>
            ) : null}
          </Grid>
          <Grid item lg={8} xs={12} md={12} sm={12} xl={12}>
            <AvatarGroup max={3} className="v-align-middle">
              {postDetails && postDetails.reactions.length > 0
                ? postDetails.reactions.slice(0, 3).map(react => (
                    <Tooltip
                      title={renderUserNames(postDetails.reactions)}
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
            {postDetails && (
              <div style={{ display: 'flex' }}>
                <span className="cursor actions-text v-align-middle grey-color ">
                  <Tooltip
                    title={renderUserNames(postDetails.reactions)}
                    placement="bottom"
                  >
                    <Link to={`/post/${postDetails._id}/reactions`}>
                      {formateNumber(postDetails.reactions.length) + ' - '}
                    </Link>
                  </Tooltip>
                </span>
                <span
                  onClick={() => this.showComments(postDetails._id)}
                  className="cursor actions-text v-align-middle grey-color"
                >
                  {formateNumber(postDetails.comments.length) + ' Comments'}
                </span>
              </div>
            )}
          </Grid>
          <Grid item lg={4} xs={12} md={12} sm={12} xl={12}>
            {postDetails && (postDetails.approved || postDetails.rejected) && (
              <Tooltip
                title={
                  postDetails.rejected
                    ? 'Rejected'
                    : postDetails.approved
                    ? 'Accepted'
                    : 'Pending'
                }
              >
                <span
                  className={
                    postDetails.approved
                      ? 'status accepted '
                      : postDetails.rejected
                      ? 'status rejected '
                      : 'status pending '
                  }
                >
                  {getCardSubHeaderStatus(postDetails)}
                </span>
              </Tooltip>
            )}
          </Grid>
          <Grid item lg={12} xs={12} md={12} sm={12} xl={12}>
            {postDetails && !postDetails.approved && !postDetails.rejected && (
              <>
                <Tooltip title="Accepted">
                  <Button
                    onClick={() => this.updatePost(postDetails, 'approve')}
                    variant="outlined"
                    color="primary"
                    tooltipPosition="bottom-left"
                    startIcon={<VerifiedUserIcon />}
                  >
                    Accept
                  </Button>
                </Tooltip>
                <Tooltip title="Reject">
                  <Button
                    onClick={() => this.updatePost(postDetails, 'reject')}
                    variant="outlined"
                    color="primary"
                    tooltipPosition="bottom-left"
                    className="ml-7"
                    startIcon={<VerifiedUserIcon />}
                  >
                    Reject
                  </Button>
                </Tooltip>
              </>
            )}
          </Grid>
        </Grid>
        {postDetailsLoading ? <Loader /> : null}
      </React.Fragment>
    )
  }
}

PostDetails.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const postDetails = state.getIn(['Timeline', 'post', 'details', 'success'])
  const postDetailsLoading = state.getIn(
    ['Timeline', 'post', 'details', 'loading'],
    false,
  )
  const postDetailsError = state.getIn([
    'Timeline',
    'post',
    'details',
    'errors',
  ])
  return {
    user,
    postDetails,
    postDetailsError,
    postDetailsLoading,
    user,
  }
}

const actionsToProps = {
  getIncomingPosts: timelineActions.getIncomingPosts,
  updatePost: timelineActions.updatePost,
  getPostDetails: timelineActions.getPostDetails,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(PostDetails)),
)
