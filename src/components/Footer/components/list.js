import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import PublicIcon from '@material-ui/icons/Public'
import FaceIcon from '@material-ui/icons/Face'
import GPSOffIcon from '@material-ui/icons/GpsOff'
import GroupWorkIcon from '@material-ui/icons/GroupWork'
import SwapCallsIcon from '@material-ui/icons/SwapCalls'
import CodeIcon from '@material-ui/icons/Code'

const styles = theme => ({
  root: {
    width: '100%',
  },
  inline: {
    display: 'inline',
  },
})

class ListComponent extends Component {
  render() {
    const { classes } = this.props
    return (
      <List className={classes.root}>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
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
                      We're a small team operating at global Web scale. What you
                      do here really matters.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp">
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
                      Weesteem is not a "that's just the way it is" kind of
                      place.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp">
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
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
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
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp">
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
                      Work from anywhere with flexible PTO and generous parental
                      leave policies.
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp">
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
        </div>
      </List>
    )
  }
}

ListComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(ListComponent))
