import * as actions from '../actions'
import * as globalActions from '../../../actions/index'

import { Link, withRouter } from 'react-router-dom'
import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import BackIcon from '@material-ui/icons/ArrowBack'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import { Map } from 'immutable'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { getCardSubHeaderProfileSummary } from '../../../util/getCardSubHeaderText'
import getPastTime from '../../../util/getPastTime'
import getProvider from '../../../util/getProvider'
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

class FollowingView extends Component {
  goBack = () => {
    this.props.saveActionState(this.getPath())
  }

  getPath = () => {
    const { pathname } = this.props.location
    let path
    switch (pathname) {
      case '/timeline/incoming':
        path = 'incoming'
        break
      case '/timeline/outgoing':
        path = 'outgoing'
        break
      case '/timeline/users':
        path = 'users'
        break
      default:
        break
    }
    return path
  }

  viewProfile = (type, userId) => {
    this.props.saveActionState(type)
    this.props.history.push(`/profile/${userId}`)
  }

  renderSubHeader = () => {
    const { view } = this.props
    return view === 'list' ? (
      <div className="row ml-1">
        <IconButton onClick={() => this.goBack()} color="primary">
          <BackIcon />
        </IconButton>
        <ListSubheader component="div" id="nested-list-subheader">
          Profile Following
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
    const hasFollowees =
      profileUser && profileUser.followees.length ? true : false
    return (
      <React.Fragment>
        <Zoom in={true} timeout={2000}>
          <List disablePadding={true} subheader={this.renderSubHeader()}>
            {hasFollowees
              ? profileUser.followees.map(f => (
                  <ListItem key={f._id} className="p-1 w-us">
                    <ListItemAvatar>
                      <Badge
                        classes={{ badge: classes.customBadge }}
                        overlap="circle"
                        badgeContent={
                          <Avatar
                            className={classes.smallAvatar}
                            key={f._id}
                            alt={f ? f.userName : ''}
                          >
                            {getReaction('follow')}
                          </Avatar>
                        }
                      >
                        <Avatar alt={f.userName} src={f.photoURL} />
                      </Badge>
                    </ListItemAvatar>
                    <Tooltip title={f.userName} placement="right-end">
                      <ListItemText
                        primary={
                          <>
                            <Link
                              className="hyperlink"
                              to="#"
                              onClick={() =>
                                this.viewProfile('incoming', f._id)
                              }
                            >
                              {user && user._id === f._id
                                ? 'You '
                                : f.userName
                                ? f.userName.substring(0, 15) + '... '
                                : ''}
                            </Link>
                            {getProvider(f.providerId)}&nbsp;
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
                            {getCardSubHeaderProfileSummary(f)}
                          </Typography>
                        }
                      />
                    </Tooltip>
                    <ListItemSecondaryAction></ListItemSecondaryAction>
                  </ListItem>
                ))
              : null}
            {profileUser && !profileUser.followees.length && (
              <Typography variant="h4" className="text-center">
                No Following
              </Typography>
            )}
          </List>
        </Zoom>
      </React.Fragment>
    )
  }
}

FollowingView.propTypes = {}

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
  saveActionState: actions.saveActionState,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(FollowingView)),
)
