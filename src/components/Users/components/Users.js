import * as mainActions from '../../../actions/index'
import * as profileActions from '../../UserProfile/actions'

import React, { Component } from 'react'

import AskIcon from '@material-ui/icons/PlaylistAddRounded'
import AvatarOnline from '../../AvatarOnline/components/AvatarOnline'
import FollowIcon from '@material-ui/icons/RssFeedOutlined'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
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
import getProvider from '../../../util/getProvider'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  input: {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      // color: '#2a7fff'
    },
  },
})

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      filteredUsers: [],
    }
  }

  async componentDidMount() {
    await this.fetchUsers()
  }

  fetchUsers = async () => {
    await this.props.getUsers(this.props.user._id, '').then(res => {
      this.setState({
        users: res.data,
        filteredUsers: res.data,
      })
    })
  }

  handleFollow = async (cUser, index) => {
    const data = {
      follower: this.props.user._id,
      followee: cUser._id,
    }
    const users = [...this.state.users]
    const user = users[index]
    await this.props.createOrUpdateProfileFollower(data).then(async res => {
      if (!res.data.data) {
        const followers = user.followers.filter(
          f => f.follower._id !== this.props.user._id,
        )
        user.followers = followers
        user.no_of_followers = --user.no_of_followers
      } else {
        await this.props
          .getProfileFollower(this.props.user._id, user._id)
          .then(followerRes => {
            const follower = followerRes.data
            user.no_of_followers = ++user.no_of_followers
            user.followers.push(follower)
          })
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

  renderFollowerColor = followers => {
    if (!followers) {
      return
    }
    return followers.filter(f => f.follower._id === this.props.user._id).length
      ? 'primary'
      : ''
  }

  ifSameUser = user => {
    return user._id === this.props.user._id ? true : false
  }

  handleMenu = () => {}

  handleInput = e => {
    const query = event.target.value
    query !== ''
      ? this.setState(prevState => {
          const filteredUsers = prevState.users.filter(element => {
            return element.userName.toLowerCase().includes(query.toLowerCase())
          })

          return {
            filteredUsers,
          }
        })
      : null
  }

  viewProfile = (type, userId) => {
    this.props.saveActionState(type)
    this.props.history.push(`/profile/${userId}`)
  }

  render() {
    const { classes, usersLoading } = this.props
    const { open, anchorEl, filteredUsers, users } = this.state
    return (
      <div>
        <Grid item lg={12} md={12} xs={12} sm={12}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              borderRadius: 10,
              // height: 40,
              // width: 270,
              boxShadow: '0 14px 28px rgba(145, 148, 170, 0.25)',
            }}
          >
            <IconButton
              style={{ padding: '2px 2px 0px 2px', marginLeft: 7 }}
              type="submit"
              aria-label="Search people by name"
            >
              <SearchIcon />
            </IconButton>
            <TextField
              onChange={e => this.handleInput(e)}
              fullWidth
              InputProps={{
                disableUnderline: true,
                classes: { input: this.props.classes['input'] },
              }}
              placeholder="Search people by name"
            />
          </div>
        </Grid>
        <List>
          {!usersLoading && filteredUsers.length
            ? filteredUsers.map((user, index) => (
                <Grid item lg={12} md={12} xs={12} sm={12}>
                  <ListItem
                    key={user._id}
                    alignItems="flex-start"
                    className="shadow b-r-15 mt-10"
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
                            {getProvider(user.providerId)}
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
                          <IconButton>
                            <Zoom in={true} timeout={2000}>
                              <AskIcon />
                            </Zoom>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Follow User" placement="right-end">
                          <IconButton
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
          {!usersLoading && !filteredUsers.length ? (
            <Typography variant="h4" className="m-10 text-center">
              No users found
            </Typography>
          ) : null}
        </List>

        {usersLoading && !filteredUsers.length && <Loader />}
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
  getProfileFollower: profileActions.getProfileFollower,
  saveActionState: profileActions.saveActionState,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Users)),
)
