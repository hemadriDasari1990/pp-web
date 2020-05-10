import * as postActions from '../../Post/actions'

import { Map, fromJS } from 'immutable'
import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
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
import { getCardSubHeaderProfileSummary } from '../../../util/getCardSubHeaderText'
import getReaction from '../../../util/getReaction'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  smallAvatar: {
    top: '150%',
    width: 22,
    height: 22,
  },
  customBadge: {
    backgroundColor: 'unset !important',
  },
}

class ReactionsList extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getReactions(this.props.type, this.props.match.params.id)
    }
  }

  renderUserOrigin = provider => {
    let name = ''
    switch (provider.toLowerCase()) {
      case 'google.com':
        name = 'Google User'
        break
      case 'facebook.com':
        name = 'facebook.com'
        break
      default:
        break
    }
    return name
  }
  render() {
    const {
      classes,
      reactions,
      reactionsError,
      reactionsLoading,
      user,
    } = this.props
    return (
      <div>
        {!reactionsLoading && reactions.length ? (
          <Typography variant="h3">People who Reacted</Typography>
        ) : null}
        <List>
          <div className="row">
            {!reactionsLoading && reactions.length
              ? reactions.map(r => (
                  <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <ListItem
                      key={r._id}
                      alignItems="flex-start"
                      className="shadow b-r-15 cursor mb-10"
                    >
                      <ListItemAvatar>
                        <Badge
                          classes={{ badge: classes.customBadge }}
                          overlap="circle"
                          badgeContent={
                            <Avatar
                              className={classes.smallAvatar}
                              key={r._id}
                              alt={r.user ? r.user.userName : ''}
                              style={{
                                backgroundColor:
                                  r.type.toLowerCase() === 'love' ||
                                  r.type.toLowerCase() === 'profile-love'
                                    ? '#ff0016c7'
                                    : '',
                              }}
                            >
                              {getReaction(r ? r.type : '')}
                            </Avatar>
                          }
                        >
                          <Avatar
                            alt={r.user ? r.user.userName.substring(0, 1) : ''}
                            src={r.user.photoURL}
                          />
                        </Badge>
                      </ListItemAvatar>
                      <Tooltip title={r.type} placement="top">
                        <ListItemText
                          primary={
                            <Link
                              className="hyperlink"
                              to={`/profile/${r.user._id}`}
                            >
                              {user && user._id === r.user._id
                                ? 'You'
                                : r.user.userName}
                            </Link>
                          }
                          secondary={
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              {getCardSubHeaderProfileSummary(r.user)}
                            </Typography>
                          }
                        />
                      </Tooltip>
                      <ListItemSecondaryAction>
                        <Tooltip title="View Profile" placement="right-end">
                          <Button color="primary">
                            <Link to={`/profile/${r.user._id}`}>
                              View Profile
                            </Link>
                          </Button>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </div>
                ))
              : null}
            {!reactionsLoading && !reactions.length && (
              <Typography variant="h4" className="text-center">
                No reactions found
              </Typography>
            )}
            {reactionsLoading && !reactions.length && <Loader />}
          </div>
        </List>
      </div>
    )
  }
}

ReactionsList.propTypes = {}

const mapStateToProps = state => {
  const reactions = state.getIn(['Post', 'reactions', 'success'], Map())
  const reactionsLoading = state.getIn(['Post', 'reactions', 'loading'], false)
  const reactionsError = state.getIn(['Post', 'reactions', 'errors'], Map())
  const user = state.getIn(['user', 'data'])
  return {
    reactions,
    reactionsLoading,
    reactionsError,
    user,
  }
}

const actionsToProps = {
  getReactions: postActions.getReactions,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(ReactionsList)),
)
