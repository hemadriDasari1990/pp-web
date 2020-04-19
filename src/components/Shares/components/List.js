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
import share from '../../../../assets/emojis/share.svg'
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

class SharesList extends Component {
  componentDidMount() {
    if (!this.props.match.params.id && this.props.user) {
      this.props.getShares(this.props.user._id)
    }
    if (this.props.match.params.id) {
      this.props.getShares(this.props.match.params.id)
    }
  }

  getShare = type => {
    let icon = null
    switch (type.toLowerCase()) {
      case 'share':
        icon = share
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
    const { classes, shares, sharesError, sharesLoading } = this.props
    return (
      <React.Fragment>
        <div className="container">
          <Typography variant="h3">People who Shared</Typography>
          <List>
            {!sharesLoading && shares.length
              ? shares.map(r => (
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
                              src={this.getShare('share')}
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
            {!sharesLoading && !shares.length && (
              <Typography variant="h4" className="text-center">
                No reactions found
              </Typography>
            )}
            {sharesLoading && !shares.length && <Loader />}
          </List>
        </div>
      </React.Fragment>
    )
  }
}

SharesList.propTypes = {}

const mapStateToProps = state => {
  const shares = state.getIn(['Post', 'shares', 'success'], Map())
  const sharesLoading = state.getIn(['Post', 'shares', 'loading'], false)
  const sharesError = state.getIn(['Post', 'shares', 'errors'], Map())
  return {
    shares,
    sharesLoading,
    sharesError,
  }
}

const actionsToProps = {
  getShares: postActions.getShares,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(SharesList)),
)
