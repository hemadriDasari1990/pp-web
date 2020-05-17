import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {}

class CustomTooltip extends Component {
  render() {
    const { classes, title, placement, user } = this.props
    return (
      <Tooltip title={title} placement={placement}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                variant="square"
                alt={user.userName}
                src={user.photoURL}
              ></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link className="hyperlink" to={`/profile/${user._id}`}>
                  {user.userName.substring(0, 15) + '...'}
                </Link>
              }
            ></ListItemText>
          </ListItem>
        </List>
      </Tooltip>
    )
  }
}

CustomTooltip.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CustomTooltip)
