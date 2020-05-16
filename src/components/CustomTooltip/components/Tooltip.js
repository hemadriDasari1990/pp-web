import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import { Link } from 'react-router-dom'
import Zoom from '@material-ui/core/Zoom'

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
