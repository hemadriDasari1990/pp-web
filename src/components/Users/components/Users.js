import * as mainActions from '../../../actions/index'
import * as profileActions from '../../UserProfile/actions'

import { Link, withRouter } from 'react-router-dom'
import React, { Component } from 'react'

import AskIcon from '@material-ui/icons/HowToReg'
import AvatarOnline from '../../AvatarOnline/components/AvatarOnline'
import FollowIcon from '@material-ui/icons/RssFeedOutlined'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import { Map } from 'immutable'
import SearchIcon from '@material-ui/icons/Search'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { getCardSubHeaderProfileSummary } from '../../../util/getCardSubHeaderText'
import getCreatedDate from '../../../util/getCreatedDate'
import getProvider from '../../../util/getProvider'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  input: {
    flex: 1,
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#050505',
      fontSize: 15,
    },
  },
  searchIcon: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 20,
  },
  root: {
    marginTop: 8,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    color: '#606770',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
})

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      filteredUsers: [],
      inputValue: '',
      loading: false,
    }
  }

  async componentDidMount() {
    await this.fetchUsers()
  }

  fetchUsers = async () => {
    this.props.user
      ? await this.props
          .getUsers(this.props.user._id, this.state.inputValue)
          .then(res => {
            this.setState({
              users: res.data,
              filteredUsers: res.data,
              loading: false,
            })
          })
      : null
  }

  handleFollow = async (cUser, index) => {
    const data = {
      userId: this.props.user._id,
      followeeId: cUser._id,
    }
    const users = [...this.state.users]
    const user = users[index]
    await this.props.createOrUpdateProfileFollower(data).then(async res => {
      if (!res.data.data) {
        const followers = user.followers.filter(
          f => f._id !== this.props.user._id,
        )
        user.followers = followers
        user.no_of_followers = --user.no_of_followers
      } else {
        user.no_of_followers = ++user.no_of_followers
        user.followers.push(this.props.user)
      }
      users[index] = user
      this.setState(
        {
          users,
        },
        () => {},
      )
    })
  }

  handleOpinionRequest = async (requestedTo, index) => {
    const { user } = this.props
    const data = {
      requestedBy: user._id,
      requestedTo: requestedTo._id,
    }
    await this.props.createOrUpdateOpinionRequest(data).then(async res => {
      const users = [...this.state.users]
      const opinionRequestIndex = users[
        index
      ].opinionRequestsReceived.findIndex(or => or._id === user._id)
      users[index].opinionRequestsReceived.splice(opinionRequestIndex, 1)
      // user.opinionRequestsSent = user.opinionRequestsSent.unshift(users[index]);
      if (res.data.data) {
        users[index].opinionRequestsReceived.unshift(user)
        users[index].no_of_opinion_request_received += 1
      } else {
        users[index].no_of_opinion_request_received -= 1
      }
      this.setState(
        {
          users,
        },
        () => {},
      )
    })
  }

  isAsked = profile => {
    const { classes, user } = this.props
    const opinionRequests = profile.opinionRequestsReceived
    const opinionRequest = opinionRequests.find(orr => orr._id === user._id)
    return opinionRequest ? true : false
  }

  renderFollowerColor = followers => {
    const { classes, user } = this.props
    if (!followers) {
      return
    }
    return followers.find(f => f._id === user._id) ? 'primary' : ''
  }

  ifSameUser = user => {
    return user._id === this.props.user._id ? true : false
  }

  handleMenu = () => {}

  handleInput = event => {
    const query = event.target.value
    query !== ''
      ? this.setState(prevState => {
          const filteredUsers = prevState.users.filter(element => {
            return element.userName.toLowerCase().includes(query.toLowerCase())
          })

          return {
            filteredUsers,
            inputValue: event.target.value,
          }
        })
      : null
  }

  handleInput = event => {
    event.preventDefault()
    this.setState(
      {
        inputValue: event.target.value,
        loading: true,
      },
      () => {
        if (this.state.inputValue && this.state.inputValue.length > 1) {
          this.usersTimer = setTimeout(async () => {
            await this.fetchUsers()
          }, 500)
        } else {
          this.setState(
            {
              filteredUsers: this.props.users,
              loading: false,
            },
            () => {},
          )
        }
      },
    )
  }

  viewProfile = (type, userId) => {
    this.props.saveActionState(type)
    this.props.history.push(`/profile/${userId}`)
  }

  render() {
    const { classes, usersLoading } = this.props
    const {
      open,
      anchorEl,
      filteredUsers,
      users,
      inputValue,
      loading,
    } = this.state
    return (
      <div>
        <Grid item lg={4} md={4} xs={12} sm={12}>
          <label className={classes.root}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              onChange={e => this.handleInput(e)}
              fullWidth
              value={inputValue}
              InputProps={{
                disableUnderline: true,
                classes: { input: this.props.classes['input'] },
              }}
              placeholder="Search people by name"
            />
          </label>
        </Grid>
        <List>
          {!loading
            ? filteredUsers.map((user, index) => (
                <Grid key={user._id} item lg={4} md={4} xs={12} sm={12}>
                  <ListItem
                    key={user._id}
                    alignItems="flex-start"
                    className="b-r-15 mt-10 w-us"
                  >
                    <ListItemAvatar>
                      <Slide
                        direction="right"
                        in={true}
                        timeout={1500}
                        mountOnEnter
                        unmountOnExit
                      >
                        <AvatarOnline user={user} />
                      </Slide>
                    </ListItemAvatar>
                    <Tooltip title={user.userName} placement="bottom-start">
                      <ListItemText
                        primary={
                          <>
                            <Link
                              className="hyperlink"
                              to="#"
                              onClick={() =>
                                this.viewProfile('incoming', user._id)
                              }
                            >
                              {user.userName + ' '}
                            </Link>
                            &nbsp;
                            {getProvider(user.providerId)}&nbsp;
                            <span className="grey-color hint-label">
                              {getCreatedDate(user.createdAt)}
                            </span>
                            &nbsp;
                          </>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              {getCardSubHeaderProfileSummary(user)}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </Tooltip>
                    {!this.ifSameUser(user) ? (
                      <ListItemSecondaryAction className="r-5">
                        <Tooltip title="Ask For Opinion" placement="right-end">
                          <IconButton
                            aria-label="opinion"
                            onClick={() =>
                              this.handleOpinionRequest(user, index)
                            }
                            style={{
                              color: this.isAsked(user)
                                ? '#5383ff'
                                : '#0c0b0b5e',
                            }}
                          >
                            <AskIcon className="icon-display" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Follow User" placement="right-end">
                          <IconButton
                            size="small"
                            onClick={() => this.handleFollow(user, index)}
                            color={this.renderFollowerColor(user.followers)}
                          >
                            <Zoom in={true} timeout={2000}>
                              <FollowIcon />
                            </Zoom>
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    ) : null}
                  </ListItem>
                </Grid>
              ))
            : null}
          {!loading && (!filteredUsers || !filteredUsers.length) ? (
            <Typography variant="h4" className="m-10 text-center">
              No users found
            </Typography>
          ) : null}
        </List>

        {loading && <Loader />}
      </div>
    )
  }
}

Users.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const users = state.getIn(['user', 'all', 'success'], Map())
  const usersLoading = state.getIn(['user', 'all', 'loading'], false)
  return {
    user,
    users,
    usersLoading,
  }
}

const actionsToProps = {
  getUsers: mainActions.getUsers,
  createOrUpdateProfileReaction: profileActions.createOrUpdateProfileReaction,
  createOrUpdateProfileFollower: profileActions.createOrUpdateProfileFollower,
  saveActionState: profileActions.saveActionState,
  createOrUpdateOpinionRequest: profileActions.createOrUpdateOpinionRequest,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Users)),
)
