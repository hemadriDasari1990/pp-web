import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import CodeIcon from '@material-ui/icons/Code'
import FaceIcon from '@material-ui/icons/Face'
import GPSOffIcon from '@material-ui/icons/GpsOff'
import GroupWorkIcon from '@material-ui/icons/GroupWork'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import PublicIcon from '@material-ui/icons/Public'
import Slide from '@material-ui/core/Slide'
import SwapCallsIcon from '@material-ui/icons/SwapCalls'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
  },
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: '#2a7fff !important',
  },
})

class ListComponent extends Component {
  render() {
    const { classes } = this.props
    return (
      <List className={classes.root}>
        <div className="row">
          <Slide
            direction="right"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PublicIcon color="secondary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Impact"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        We're a small team operating at global Web scale. What
                        you do here really matters.
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          </Slide>
          <Zoom in={true} timeout={2000}>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <FaceIcon color="secondary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Curiosity"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Writenpost is not a "that's just the way it is" kind of
                        place.
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          </Zoom>
          <Slide
            direction="left"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <GPSOffIcon color="secondary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="No Jerks"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        This is not just a platitude. We can't overstate how
                        serious we are about this.
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          </Slide>
        </div>
        <div className="row">
          <Slide
            direction="right"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <GroupWorkIcon color="secondary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Inclusion"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        We need a diverse team to serve a diverse global
                        community. We encourage applicants of all genders, ages,
                        abilities, orientations, and ethnicities to apply.
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          </Slide>
          <Zoom in={true} timeout={2000}>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <SwapCallsIcon color="secondary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Flexibility"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Work from anywhere with flexible PTO and generous
                        parental leave policies.
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          </Zoom>
          <Slide
            direction="left"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <CodeIcon color="secondary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Open Source"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        We have a strong preference for using, publishing, and
                        contributing back to open source software.
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          </Slide>
        </div>
      </List>
    )
  }
}

ListComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ListComponent))
