import React, { Component, Suspense } from 'react'

import Badge from '@material-ui/core/Badge'
import FiberNewIcon from '@material-ui/icons/FiberNew'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import LiveHelpIcon from '@material-ui/icons/LiveHelp'
import PropTypes from 'prop-types'
import Slide from '@material-ui/core/Slide'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  smallAvatar: {
    width: 33,
    height: 33,
  },
  badge: {
    width: 20,
    height: 20,
  },
}

class HelpList extends Component {
  componentDidMount() {}

  render() {
    const { classes, user } = this.props
    return (
      <Suspense>
        <List>
          <Grid key={user._id} item lg={12} md={12} xs={12} sm={12}>
            <ListItem
              alignItems="flex-start"
              className="cursor b-r-15 mt-10 w-us"
            >
              <ListItemAvatar>
                <Slide
                  direction="right"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <LibraryAddIcon
                    className={classes.smallAvatar}
                    color="primary"
                  />
                </Slide>
              </ListItemAvatar>
              <Tooltip title="Getting Started" placement="bottom-start">
                <ListItemText
                  primary="Getting Started"
                  secondary="Explore key features and possibilities"
                />
              </Tooltip>
              <ListItemSecondaryAction className="r-5">
                <Tooltip title="Ask For Opinion" placement="right-end">
                  <IconButton>
                    <Zoom in={true} timeout={2000}>
                      <Badge badgeContent={4} color="primary"></Badge>
                    </Zoom>
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              alignItems="flex-start"
              className="cursor b-r-15 mt-10 w-us"
            >
              <ListItemAvatar>
                <Slide
                  direction="right"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <FiberNewIcon
                    className={classes.smallAvatar}
                    color="primary"
                  />
                </Slide>
              </ListItemAvatar>
              <Tooltip title={user.userName} placement="bottom-start">
                <ListItemText
                  primary="What's New"
                  secondary="Find out the latest product changes"
                />
              </Tooltip>
              <ListItemSecondaryAction className="r-5">
                <Tooltip title="Ask For Opinion" placement="right-end">
                  <IconButton>
                    <Zoom in={true} timeout={2000}>
                      <Badge badgeContent={6} color="primary"></Badge>
                    </Zoom>
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              alignItems="flex-start"
              className="cursor b-r-15 mt-10 w-us"
            >
              <ListItemAvatar>
                <Slide
                  direction="right"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <LiveHelpIcon
                    className={classes.smallAvatar}
                    color="primary"
                  />
                </Slide>
              </ListItemAvatar>
              <Tooltip title="Get Help" placement="bottom-start">
                <ListItemText
                  primary="Get Help"
                  secondary="Need assistance? We're here to help"
                />
              </Tooltip>
              <ListItemSecondaryAction className="r-5">
                <Tooltip title="Ask For Opinion" placement="right-end">
                  <IconButton>
                    <Zoom in={true} timeout={2000}>
                      <Badge badgeContent={2} color="primary"></Badge>
                    </Zoom>
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          </Grid>
        </List>
      </Suspense>
    )
  }
}

HelpList.propTypes = {
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
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(HelpList)),
)
