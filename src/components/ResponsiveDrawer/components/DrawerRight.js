import React, { Component } from 'react'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Drawer from '@material-ui/core/Drawer'
import Help from '../../Help/components/Help'
import Notifications from '../../Notifications/components/Notification'
import ProfileInfo from '../../UserProfile/components/ProfileInfo'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 400

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    height: '100%',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
})

class DrawerRight extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {} = this.state
    const { classes, type, open } = this.props
    return (
      <ClickAwayListener onClickAway={() => this.props.handleDrawerClose()}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}></div>
          {type === 'notifications' && <Notifications />}
          {type === 'profile-info' && <ProfileInfo />}
          {type === 'help' && <Help />}
        </Drawer>
      </ClickAwayListener>
    )
  }
}

DrawerRight.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])

  return {
    user,
  }
}

const actionsToProps = {}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(DrawerRight)),
)
