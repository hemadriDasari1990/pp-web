import * as globalActions from '../../../actions/index'

import { Map, fromJS } from 'immutable'
import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import getPastTime from '../../../util/getPastTime'
import getReaction from '../../../util/getReaction'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  smallAvatar: {
    width: 23,
    height: 23,
  },
  customBadge: {
    top: '90%',
    width: 35,
    height: 35,
    backgroundColor: 'unset !important',
  },
}

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
                        <Badge
                          classes={{ badge: classes.customBadge }}
                          overlap="circle"
                          badgeContent={
                            <Avatar
                              className={classes.smallAvatar}
                              key={f._id}
                              alt={f.follower[0] ? f.follower[0].userName : ''}
                            >
                              {getReaction('follow')}
                            </Avatar>
                          }
                        >
                          <Avatar
                            alt={f.follower[0].userName.substring(0, 1)}
                            src={f.follower[0].photoURL}
                          />
                        </Badge>
                      </ListItemAvatar>
                      <Tooltip
                        title={f.follower[0].userName}
                        placement="right-end"
                      >
                        <ListItemText
                          primary={
                            <>
                              <Link
                                className="hyperlink"
                                to={`/profile/${f.follower[0]._id}`}
                              >
                                {user && user._id === f.follower[0]._id
                                  ? 'You '
                                  : f.follower[0].userName + ' '}
                              </Link>
                              <small className="grey-color ">
                                {getPastTime(f.updatedAt)}
                              </small>
                            </>
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
                      <ListItemSecondaryAction></ListItemSecondaryAction>
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

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Followers)),
)
