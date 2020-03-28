import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import userLiked from '../../../../assets/user-liked.svg'
import preferencesIcon from '../../../../assets/preferences.svg'
import Fab from '@material-ui/core/Fab'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import arrowIcon from '../../../../assets/arrow.svg'
import * as mainActions from '../../../actions/index'
import { Map, List } from 'immutable'
import userLike from '../../../../assets/user-like.svg'
import love from '../../../../assets/love.svg'
import Tooltip from '@material-ui/core/Tooltip'
import loved from '../../../../assets/loved.svg'
import * as profileActions from '../../UserProfile/actions'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    await this.props.getUsers(this.props.user._id, '')
  }

  handleReaction = async (type, profileId) => {
    const data = {
      likedBy: this.props.user._id,
      user: profileId,
      type,
    }
    await this.props.createOrUpdateProfileReaction(data)
  }

  handleViewProfile = userId => {
    this.props.history.push(`/profile/${userId}`)
  }

  render() {
    const { classes, users } = this.props
    const { open, anchorEl } = this.state
    return (
      <>
        {users
          ? users.map(user => (
              <Card key={user._id} style={{ width: '100%', maxWidth: '100%' }}>
                <CardContent>
                  <div className="row f-r">
                    <Tooltip title="Love">
                      <IconButton
                        className="f-r"
                        aria-label="settings"
                        onClick={() => this.handleReaction('love', user._id)}
                      >
                        <Avatar
                          src={loved}
                          style={{
                            marginTop: -5,
                            width: 25,
                            height: 25,
                            boxShadow: 'unset',
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Like">
                      <IconButton
                        aria-label="settings"
                        className="f-r"
                        onClick={() => this.handleReaction('like', user._id)}
                      >
                        <Avatar
                          src={userLiked}
                          style={{
                            marginTop: -5,
                            width: 25,
                            height: 25,
                            boxShadow: 'unset',
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <Avatar className="profile" src={user.photoURL} />
                  <h5 className="text-center">{user.userName}</h5>
                  <p className="text-center">
                    {' '}
                    {user.providerId === 'google.com'
                      ? 'A Google User'
                      : 'A Facebook User'}
                  </p>
                  <div className="text-center">
                    <p>Create usable interface and designs @GraphicSpark</p>
                  </div>
                  <Tooltip title={`View ${user.userName} Profile`}>
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="add"
                      variant="extended"
                      className="align-items-center mb-10"
                      onClick={() => this.handleViewProfile(user._id)}
                    >
                      View Profile
                    </Fab>
                  </Tooltip>
                </CardContent>
                <Divider />
                <CardActions
                  className="actions"
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    marginLeft: 25,
                    marginRight: 15,
                  }}
                >
                  <div>
                    <Tooltip title="No of People Liked">
                      <Fab
                        color="inherit"
                        size="small"
                        aria-label="preferences"
                        color="primary"
                        className="actions"
                      >
                        <Avatar
                          style={{ width: 30, height: 30 }}
                          src={userLike}
                        />
                      </Fab>
                    </Tooltip>
                    <h2 class="title">12.3k</h2>
                    <p class="followers">Likes</p>
                  </div>
                  <div>
                    <Tooltip title="No of People Loves">
                      <Fab
                        color="inherit"
                        size="small"
                        aria-label="love"
                        color="primary"
                        className="actions"
                      >
                        <Avatar style={{ width: 30, height: 30 }} src={love} />
                      </Fab>
                    </Tooltip>
                    <h2 class="title">2.3k</h2>
                    <p class="followers">Loved</p>
                  </div>
                  <div>
                    <Tooltip title="Times Preferences Updated">
                      <Fab
                        color="inherit"
                        size="small"
                        aria-label="preferences"
                        color="primary"
                        className="actions"
                      >
                        <Avatar src={preferencesIcon} />
                      </Fab>
                    </Tooltip>
                    <h2 class="title">4k</h2>
                    <p class="followers">Updated</p>
                  </div>
                </CardActions>
              </Card>
            ))
          : null}
      </>
    )
  }
}

Users.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const users = state.getIn(['user', 'all', 'success'], List())
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
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Users))
