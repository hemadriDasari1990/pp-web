import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import incomingIcon from '../../../../assets/incoming.svg'
import Avatar from '@material-ui/core/Avatar'
import outgoingIcon from '../../../../assets/outgoing.svg'
import usersIcon from '../../../../assets/users.svg'
import Grid from '@material-ui/core/Grid'

const styles = {
  avatar: {
    width: 30,
    height: 30,
  },
}

class DrawerComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleIncoming = () => {
    this.props.history.push('/incoming')
  }

  handleOutgoing = () => {
    this.props.history.push('/outgoing')
  }

  handleUsers = () => {
    this.props.history.push('/users')
  }

  render() {
    const { classes } = this.props
    const {} = this.state
    return (
      <>
        <List>
          <Grid item xs={4} sm={4}>
            <ListItem button key={1} onClick={this.handleIncoming}>
              <ListItemIcon>
                <Avatar className={classes.avatar} src={incomingIcon} />
              </ListItemIcon>
              <ListItemText>Incoming</ListItemText>
            </ListItem>
          </Grid>
          <Grid item xs={4} sm={4}>
            <ListItem button key={2} onClick={this.handleOutgoing}>
              <ListItemIcon>
                <Avatar className={classes.avatar} src={outgoingIcon} />
              </ListItemIcon>
              <ListItemText>Outgoing</ListItemText>
            </ListItem>
          </Grid>
          <Grid item xs={4} sm={4}>
            <ListItem button key={3} onClick={this.handleUsers}>
              <ListItemIcon>
                <Avatar className={classes.avatar} src={usersIcon} />
              </ListItemIcon>
              <ListItemText>Users</ListItemText>
            </ListItem>
          </Grid>
        </List>
      </>
    )
  }
}

DrawerComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {}
}

const actionsToProps = {}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(DrawerComponent)),
)
