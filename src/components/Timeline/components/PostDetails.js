import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import formateNumber from '../../../util/formateNumber'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import * as timelineActions from '../../Timeline/actions'
import { Map, fromJS } from 'immutable'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import { connect } from 'react-redux'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import Loader from '../../Loader/components/Loader'
import Summary from '../../Dashboard/components/Summary'
import { Link } from 'react-router-dom'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import advice from '../../../../assets/advice.svg'
import pros from '../../../../assets/pros.svg'
import cons from '../../../../assets/cons.svg'
import getReaction from '../../../util/getReaction'
import renderUserNames from '../../../util/renderUserNames'
import textingImage from '../../../../assets/notifications/texting.svg'

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
          <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12">
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
                                ? 'status approved m-t-7 m-r-20'
                                : postDetails.rejected
                                ? 'status rejected m-t-7 m-r-20'
                                : 'status pending m-t-7 m-r-20'
                            }
                          ></span>
                        </Tooltip>
                      )}
                    </>
                  }
                  title={
                    !postDetails.isAnonymous ? (
                      <Link
                        className="hyperlink"
                        to={`/profile/${postDetails.postedBy._id}`}
                      >
                        {postDetails.postedBy.userName}
                      </Link>
                    ) : (
                      <b className="hyperlink">Annonymous User</b>
                    )
                  }
                  subheader={moment(postDetails.createdAt).fromNow()}
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
                  <div className="actions-align">
                    <AvatarGroup>
                      {postDetails.reactions.length > 0
                        ? postDetails.reactions.slice(0, 3).map(react => (
                            <Tooltip
                              title={renderUserNames(postDetails.reactions)}
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
                      title={renderUserNames(postDetails.reactions)}
                      placement="bottom"
                    >
                      <Link
                        to={`/post/${postDetails._id}/reactions`}
                        className="actions-text"
                      >
                        <span>
                          {postDetails.reactions.length
                            ? formateNumber(postDetails.reactions.length)
                            : 'No Reactions'}
                        </span>
                      </Link>
                    </Tooltip>
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