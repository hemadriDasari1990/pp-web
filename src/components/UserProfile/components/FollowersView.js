import * as globalActions from '../../../actions/index'

import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import BackIcon from '@material-ui/icons/ArrowBack'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Loader from '../../Loader/components/Loader'
import { Map } from 'immutable'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { getCardSubHeaderProfileSummary } from '../../../util/getCardSubHeaderText'
import getPastTime from '../../../util/getPastTime'
import getProvider from '../../../util/getProvider'
import getReaction from '../../../util/getReaction'
import { withRouter } from 'react-router-dom'
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

class FollowersView extends Component {
  async componentDidMount() {}

  goBack = () => {
    this.props.history.push(this.props.fallBackTo)
  }

  renderSubHeader = () => {
    const locationPath = this.props.location.pathname
    const { view } = this.props
    return locationPath.includes('/followers') && view === 'list' ? (
      <div className="row ml-1">
        <IconButton onClick={() => this.goBack()} color="primary">
          <BackIcon />
        </IconButton>
        <ListSubheader component="div" id="nested-list-subheader">
          Profile Followers
        </ListSubheader>
      </div>
    ) : null
  }

  render() {
    const {
      classes,
      profileUser,
      profileUserError,
      profileUserLoading,
      user,
    } = this.props
    const hasFollowers =
      profileUser && profileUser.followers.length ? true : false
    return (
      <React.Fragment>
        <Zoom in={true} timeout={2000}>
          <List disablePadding={true} subheader={this.renderSubHeader()}>
            {hasFollowers
              ? profileUser.followers.map(f => (
                  <ListItem key={f._id} className="p-1">
                    <ListItemAvatar>
                      <Badge
                        classes={{ badge: classes.customBadge }}
                        overlap="circle"
                        badgeContent={
                          <Avatar
                            className={classes.smallAvatar}
                            key={f._id}
                            alt={f.follower ? f.follower.userName : ''}
                          >
                            {getReaction('follow')}
                          </Avatar>
                        }
                      >
                        <Avatar
                          alt={f.follower.userName}
                          src={f.follower.photoURL}
                        />
                      </Badge>
                    </ListItemAvatar>
                    <Tooltip title={f.follower.userName} placement="right-end">
                      <ListItemText
                        primary={
                          <>
                            <Link
                              className="hyperlink"
                              to={`/profile/${f.follower._id}`}
                            >
                              {user && user._id === f.follower._id
                                ? 'You '
                                : f.follower.userName
                                ? f.follower.userName.substring(0, 15) + '... '
                                : ''}
                            </Link>
                            {getProvider(f.follower.providerId)}&nbsp;
                            <small className="grey-color">
                              {getPastTime(f.createdAt)}
                            </small>
                          </>
                        }
                        secondary={
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {getCardSubHeaderProfileSummary(f.follower)}
                          </Typography>
                        }
                      />
                    </Tooltip>
                    <ListItemSecondaryAction></ListItemSecondaryAction>
                  </ListItem>
                ))
              : null}
            {profileUser && !profileUser.followers.length && (
              <Typography variant="h4" className="text-center">
                No Followers
              </Typography>
            )}
            {profileUser && !profileUser.followers.length && <Loader />}
          </List>
        </Zoom>
      </React.Fragment>
    )
  }
}

FollowersView.propTypes = {}

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
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(FollowersView)),
)
