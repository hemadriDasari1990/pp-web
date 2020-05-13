import React, { Component } from 'react'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import isUserActive from '../../../util/isUserActive'

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: '#42b72a',
    color: '#42b72a',
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
    const { classes, user, dynamicClass } = this.props
    const isActive = user ? isUserActive(user.lastActiveTime) : false
    // const isOnline = currentUser && loggedInUser && (currentUser._id ===  loggedInUser._id) ? true: false;
    return (
      <React.Fragment>
        {isActive ? (
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar
              className={dynamicClass}
              alt={user.userName}
              src={user.photoURL}
            />
          </StyledBadge>
        ) : (
          <Avatar
            className={dynamicClass}
            alt={user.userName}
            src={user.photoURL}
          />
        )}
      </React.Fragment>
    )
  }
}

AvatarOnline.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AvatarOnline)
