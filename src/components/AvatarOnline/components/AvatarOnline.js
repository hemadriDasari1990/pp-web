import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import amber from '@material-ui/core/colors/amber'
import isUserActive from '../../../util/isUserActive'
import withStyles from '@material-ui/core/styles/withStyles'

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: props => props.bgColor,
    color: props => props.color,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge)

const styles = {
  smallAvatar: {
    width: 22,
    height: 22,
  },
}

class AvatarOnline extends Component {
  render() {
    const { classes, user, externalClass } = this.props
    const isActive = user ? isUserActive(user.lastActiveTime) : false
    // const isOnline = currentUser && loggedInUser && (currentUser._id ===  loggedInUser._id) ? true: false;
    return (
      <React.Fragment>
        <Tooltip title={isActive ? 'Online' : 'Away'} aria-label="status">
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
            color={isActive ? '#42b72a' : amber[700]}
            bgColor={isActive ? '#42b72a' : amber[700]}
          >
            <Avatar
              className={externalClass}
              alt={user.userName}
              src={user.photoURL}
            />
          </StyledBadge>
        </Tooltip>
      </React.Fragment>
    )
  }
}

AvatarOnline.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AvatarOnline)
