import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Loader from '../../Loader/components/Loader'
import * as postActions from '../../Post/actions'
import { Map, fromJS } from 'immutable'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import getReaction from '../../../util/getReaction'

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
      <>
        {!reactionsLoading && reactions.length ? (
          <Typography variant="h3">People who Reacted</Typography>
        ) : null}
        <List>
          <div className="row">
            {!reactionsLoading && reactions.length
              ? reactions.map(r => (
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
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
                              alt="NA"
                              src={getReaction(r.type)}
                            />
                          }
                        >
                          <Avatar
                            alt={r.user.userName.substring(0, 1)}
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
                          secondary={this.renderUserOrigin(r.user.providerId)}
                        />
                      </Tooltip>
                      <Tooltip title="View Profile" placement="right-end">
                        <Button color="primary" className="mt-10">
                          <Link to={`/profile/${r.user._id}`}>
                            View Profile
                          </Link>
                        </Button>
                      </Tooltip>
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
      </>
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
