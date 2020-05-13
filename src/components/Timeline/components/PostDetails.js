import * as timelineActions from '../../Timeline/actions'

import React, { Component } from 'react'
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter,
} from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import advice from '../../../../assets/advice.svg'
import { connect } from 'react-redux'
import cons from '../../../../assets/cons.svg'
import formateNumber from '../../../util/formateNumber'
import { getCardSubHeaderStatus } from '../../../util/getCardSubHeaderText'
import getPastTime from '../../../util/getPastTime'
import getReaction from '../../../util/getReaction'
import pros from '../../../../assets/pros.svg'
import renderUserNames from '../../../util/renderUserNames'
import withStyles from '@material-ui/core/styles/withStyles'
import getProvider from '../../../util/getProvider'
import getCardSubHeaderText from '../../../util/getCardSubHeaderText'

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
    if (this.props.match.params.id) {
      this.props.getPostDetails(this.props.match.params.id)
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
        this.props.getPostDetails(this.props.match.params.id)
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
    this.props.getPostDetails(this.props.match.params.id)
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
        <div className="row">
          <div className="col-lg-3 col-md-5 col-sm-12 col-xs-12"></div>
          <div className="col-lg-4 col-md-7 col-sm-12 col-xs-12">
            {!postDetailsLoading && postDetails ? (
              <Card>
                <CardHeader
                  avatar={
                    !postDetails.isAnonymous ? (
                      <Avatar
                        alt={
                          postDetails.postedBy
                            ? postDetails.postedBy.userName.substring(1, 1)
                            : 'Image not Available'
                        }
                        src={
                          postDetails.postedBy
                            ? postDetails.postedBy.photoURL
                            : ''
                        }
                      />
                    ) : (
                      <Avatar
                        style={{
                          color: '#ffffff',
                          backgroundColor: '#2a7fff',
                        }}
                      >
                        A
                      </Avatar>
                    )
                  }
                  action={
                    <>
                      {!postDetails.approved && !postDetails.rejected ? (
                        <>
                          <Tooltip title="Accepted">
                            <Button
                              onClick={() =>
                                this.updatePost(postDetails, 'approve')
                              }
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
                              onClick={() =>
                                this.updatePost(postDetails, 'reject')
                              }
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
                      ) : (
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
                    </>
                  }
                  title={
                    (postDetails.isAnonymous &&
                      postDetails.postedBy._id === user._id) ||
                    !postDetails.isAnonymous ? (
                      <>
                        <Link
                          className="hyperlink"
                          to={`/profile/${postDetails.postedBy._id}`}
                        >
                          {postDetails.isAnonymous &&
                          postDetails.postedBy._id === user._id
                            ? 'You'
                            : postDetails.postedBy.userName}
                        </Link>
                        &nbsp;
                        {getProvider(postDetails.postedBy.providerId)}
                      </>
                    ) : (
                      <b className="hyperlink">Annonymous User</b>
                    )
                  }
                  subheader={
                    <>
                      {getCardSubHeaderText(postDetails.createdAt)}&nbsp;&nbsp;
                      {!postDetails.isAnonymous && (
                        <>
                          <span>
                            <b>
                              {formateNumber(
                                postDetails.postedBy.total_followers,
                              )}
                            </b>
                            &nbsp;Followers&nbsp;
                          </span>
                        </>
                      )}
                    </>
                  }
                />
                <CardContent className="pt-0 pl-0 pr-0">
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
                  <div className="row ml-15 mr-15">
                    <AvatarGroup max={3} className="v-align-middle">
                      {postDetails.reactions.length > 0
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
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>

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
