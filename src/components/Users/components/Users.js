import * as mainActions from '../../../actions/index'
import * as profileActions from '../../UserProfile/actions'

import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
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
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { getCardSubHeaderProfileSummary } from '../../../util/getCardSubHeaderText'
import getPastTime from '../../../util/getPastTime'
import getProvider from '../../../util/getProvider'
import AskIcon from '@material-ui/icons/PlaylistAddRounded'
import FollowIcon from '@material-ui/icons/RssFeedOutlined'
import AskedIcon from '@material-ui/icons/PlaylistAddCheckRounded'
import AvatarOnline from '../../AvatarOnline/components/AvatarOnline'
import Fab from '@material-ui/core/Fab'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
    }
  }

  async componentDidMount() {
    await this.props.getUsers(this.props.user._id, '').then(res => {
      this.setState({
        users: res.data,
      })
    })
  }

  handleViewProfile = userId => {
    this.props.history.push(`/profile/${userId}`)
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

  render() {
    const { classes, usersLoading } = this.props
    const { open, anchorEl, users } = this.state
    return (
      <div>
        <List>
          {!usersLoading && users.length ? (
            users.map((user, index) => (
              <Grid item lg={12} md={12} xs={12} sm={12}>
                <ListItem
                  key={user._id}
                  alignItems="flex-start"
                  className="shadow b-r-15 mt-10"
                >
                  <ListItemAvatar>
                    <AvatarOnline user={user} />
                  </ListItemAvatar>
                  <Tooltip title={user.userName} placement="right-end">
                    <ListItemText
                      primary={
                        <>
                          <Link
                            className="hyperlink"
                            to={`/profile/${user._id}`}
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
                          <AskIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Follow User" placement="right-end">
                        <IconButton
                          onClick={() => this.handleFollow(user, index)}
                          color={this.renderFollowerColor(user.followers)}
                        >
                          <FollowIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  ) : null}
                </ListItem>
              </Grid>
            ))
          ) : (
            <Typography variant="h4" className="text-center">
              No profiles found to list
            </Typography>
          )}
        </List>

        {usersLoading && !users.length && <Loader />}
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
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Users))
