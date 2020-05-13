import * as globalActions from '../../../actions/index'

import { Map, fromJS } from 'immutable'
import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
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
import getPastTime from '../../../util/getPastTime'
import getReaction from '../../../util/getReaction'
import { withStyles } from '@material-ui/core/styles'
import getProvider from '../../../util/getProvider'
import { getCardSubHeaderProfileSummary } from '../../../util/getCardSubHeaderText'
import ListSubheader from '@material-ui/core/ListSubheader'
import BackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'

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

class ReactionsView extends Component {
  async componentDidMount() {
    await this.props.getUser(this.props.match.params.id)
  }

  goBack = () => {
    this.props.history.push(this.props.fallBackTo)
  }

  renderSubHeader = () => {
    const locationPath = this.props.location.pathname
    const { view } = this.props
    return locationPath === '/user/reactions' && view === 'list' ? (
      <div className="row ml-1">
        <IconButton onClick={() => this.goBack()} color="primary">
          <BackIcon />
        </IconButton>
        <ListSubheader component="div" id="nested-list-subheader">
          Profile Reactions
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
    const hasReactions =
      (!profileUserLoading && profileUser && !profileUser.reactions.length) ||
      (!profileUserLoading && !profileUser) ||
      !profileUser
        ? false
        : true
    const viewPath = profileUser ? `/user/reactions` : '#'
    return (
      <React.Fragment>
        <List disablePadding={true} subheader={this.renderSubHeader()}>
          {hasReactions
            ? profileUser.reactions.map(pu => (
                <ListItem key={pu._id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Badge
                      classes={{ badge: classes.customBadge }}
                      overlap="circle"
                      badgeContent={
                        <Avatar
                          className={classes.smallAvatar}
                          key={pu._id}
                          alt={pu.likedBy ? pu.likedBy.userName : ''}
                          style={{
                            backgroundColor:
                              pu.type.toLowerCase() === 'love' ||
                              pu.type.toLowerCase() === 'profile-love'
                                ? '#ff0016c7'
                                : '',
                          }}
                        >
                          {getReaction(pu ? pu.type : '')}
                        </Avatar>
                      }
                    >
                      <Avatar
                        alt={pu.likedBy.userName}
                        src={pu.likedBy.photoURL}
                      />
                    </Badge>
                  </ListItemAvatar>
                  <Tooltip title={pu.likedBy.userName} placement="right-end">
                    <ListItemText
                      primary={
                        <>
                          <Link
                            className="hyperlink"
                            to={`/profile/${pu.likedBy._id}`}
                          >
                            {user && user._id === pu.likedBy._id
                              ? 'You '
                              : pu.likedBy.userName
                              ? pu.likedBy.userName.substring(0, 15) + '... '
                              : ''}
                          </Link>
                          {getProvider(pu.likedBy.providerId)}&nbsp;
                          <small className="grey-color ">
                            {getPastTime(pu.createdAt)}
                          </small>
                        </>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {getCardSubHeaderProfileSummary(pu.likedBy)}
                        </Typography>
                      }
                    />
                  </Tooltip>
                  <ListItemSecondaryAction></ListItemSecondaryAction>
                </ListItem>
              ))
            : null}
          {!hasReactions ? (
            <Typography variant="h4" className="text-center">
              No reactions
            </Typography>
          ) : null}
          {profileUserLoading &&
            profileUser &&
            !profileUser.reactions.length && <Loader />}
        </List>
      </React.Fragment>
    )
  }
}

ReactionsView.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const profileUser = state.getIn(['user', 'success'])
  const profileUserLoading = state.getIn(['user', 'loading'], false)
  const profileUserError = state.getIn(['user', 'errors'], Map())
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
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(ReactionsView)),
)
