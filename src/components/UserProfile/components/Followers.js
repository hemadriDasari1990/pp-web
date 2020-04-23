import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Loader from '../../Loader/components/Loader'
import { Map, fromJS } from 'immutable'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import * as globalActions from '../../../actions/index'
import FollowIcon from '../../SvgIcons/components/Follow'
import FollowingIcon from '../../SvgIcons/components/Following'
import { Link } from 'react-router-dom'

class Followers extends Component {
  async componentDidMount() {
    await this.props.getUser(this.props.match.params.id)
  }

  render() {
    const {
      classes,
      profileUser,
      profileUserError,
      profileUserLoading,
      user,
    } = this.props
    return (
      <React.Fragment>
        <Card>
          <CardHeader
            title="Followers"
            action={
              <a>
                View All{' '}
                <b>
                  {formateNumber(
                    profileUser ? profileUser.followers.length : 0,
                  )}
                </b>
              </a>
            }
          ></CardHeader>
          <CardContent
            className={
              !profileUserLoading &&
              profileUser &&
              !profileUser.followers.length
                ? ''
                : 'p-0'
            }
          >
            <List>
              {!profileUserLoading &&
              profileUser &&
              profileUser.followers.length
                ? profileUser.followers.slice(0, 3).map(f => (
                    <ListItem key={f._id} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt={f.follower[0].userName}
                          src={f.follower[0].photoURL}
                        />
                      </ListItemAvatar>
                      <Tooltip
                        title={f.follower[0].userName}
                        placement="right-end"
                      >
                        <ListItemText
                          primary={
                            <Link
                              className="hyperlink"
                              to={`/profile/${f.follower[0]._id}`}
                            >
                              {user && user._id === f.follower[0]._id
                                ? 'You'
                                : f.follower[0].userName}
                            </Link>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                A {f.follower[0].providerId} User
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </Tooltip>
                      <Tooltip
                        placement="bottom"
                        title={f.follower ? 'Following' : 'Follow'}
                      >
                        <IconButton>
                          {f.follower ? (
                            <FollowingIcon
                              color="#2a7fff"
                              className="icon-display"
                            />
                          ) : (
                            <FollowIcon className="icon-display" />
                          )}
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                  ))
                : null}
              {!profileUserLoading &&
                profileUser &&
                !profileUser.followers.length && (
                  <Typography variant="h4" className="text-center">
                    No Followers yet
                  </Typography>
                )}
              {profileUserLoading &&
                profileUser &&
                !profileUser.followers.length && <Loader />}
            </List>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

Followers.propTypes = {}

const mapStateToProps = state => {
  const profileUser = state.getIn(['user', 'success'])
  const profileUserLoading = state.getIn(['user', 'loading'], false)
  const profileUserError = state.getIn(['user', 'errors'], Map())
  const user = state.getIn(['user', 'data'])
  return {
    profileUser: profileUser ? profileUser.user : undefined,
    profileUserError,
    profileUserLoading,
    user,
  }
}

const actionsToProps = {
  getUser: globalActions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Followers))
