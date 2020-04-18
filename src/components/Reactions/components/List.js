import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Loader from '../../Loader/components/Loader'
import * as postActions from '../../Post/actions'
import { Map, fromJS } from 'immutable'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import like from '../../../../assets/emojis/like.svg'
import angry from '../../../../assets/emojis/angry.svg'
import love from '../../../../assets/emojis/love.svg'
import silly from '../../../../assets/emojis/silly.svg'
import smiley from '../../../../assets/emojis/smiley.svg'
import wow from '../../../../assets/emojis/surprise.svg'
import sad from '../../../../assets/emojis/sad.svg'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

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
    if (!this.props.match.params.id && this.props.user) {
      this.props.getShares(this.props.user._id)
    }
    if (this.props.match.params.id) {
      this.props.getReactions(this.props.match.params.id)
    }
  }

  getReaction = type => {
    let icon = null
    switch (type.toLowerCase()) {
      case 'like':
        icon = like
        break
      case 'love':
        icon = love
        break
      case 'sad':
        icon = sad
        break
      case 'wow':
        icon = wow
        break
      case 'silly':
        icon = silly
        break
      case 'smiley':
        icon = smiley
        break
      case 'angry':
        icon = angry
        break
        deafult: break
    }
    return icon
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
    const { classes, reactions, reactionsError, reactionsLoading } = this.props
    return (
      <React.Fragment>
        <div className="container">
          <Typography variant="h3">People who Reacted</Typography>
          <List>
            {!reactionsLoading && reactions.length
              ? reactions.map(r => (
                  <>
                    <ListItem key={r._id} alignItems="flex-start">
                      <ListItemAvatar>
                        <Badge
                          classes={{ badge: classes.customBadge }}
                          overlap="circle"
                          badgeContent={
                            <Avatar
                              className={classes.smallAvatar}
                              alt="NA"
                              src={this.getReaction(r.type)}
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
                          primary={r.user.userName}
                          secondary={this.renderUserOrigin(r.user.providerId)}
                        />
                      </Tooltip>
                      <Tooltip title="View Profile" placement="bottom">
                        <Button color="primary">
                          <Link to={`/profile/${r.user._id}`}>
                            View Profile
                          </Link>
                        </Button>
                      </Tooltip>
                    </ListItem>
                  </>
                ))
              : null}
            {!reactionsLoading && !reactions.length && (
              <Typography variant="h4" className="text-center">
                No reactions found
              </Typography>
            )}
            {reactionsLoading && !reactions.length && <Loader />}
          </List>
        </div>
      </React.Fragment>
    )
  }
}

ReactionsList.propTypes = {}

const mapStateToProps = state => {
  const reactions = state.getIn(['Post', 'reactions', 'success'], Map())
  const reactionsLoading = state.getIn(['Post', 'reactions', 'loading'], false)
  const reactionsError = state.getIn(['Post', 'reactions', 'errors'], Map())
  return {
    reactions,
    reactionsLoading,
    reactionsError,
  }
}

const actionsToProps = {
  getReactions: postActions.getReactions,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(ReactionsList)),
)
