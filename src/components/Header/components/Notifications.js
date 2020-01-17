import React, { Component } from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Menu from '@material-ui/core/Menu'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import LibraryBooks from '@material-ui/icons/LibraryBooks'

export default class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.openMenu,
      selectedIndex: null,
    }
  }

  handleClose = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  handleListItemClick = (event, value) => {
    this.setState({
      selectedIndex: value,
    })
  }
  render() {
    const { open, selectedIndex } = this.state
    return (
      <div>
        <Menu
          id="fade-menu"
          keepMounted
          open={open}
          onClose={() => this.handleClose()}
        >
          <List component="nav" aria-label="main mailbox folders">
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={event => this.handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={event => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <LibraryBooks />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Menu>
      </div>
    )
  }
}
