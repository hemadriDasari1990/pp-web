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

class FeedbackList extends Component {
  render() {
    const { classes, feedbacks } = this.props
    return (
      <List className={classes.root}>
        <div className="row">
          {feedbacks &&
            feedbacks.map(feedback => (
              <div
                key={feedback._id}
                className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={feedback.photoURL}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={feedback.userName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {feedback.about}
                        </Typography>
                        - {feedback.comment}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </div>
            ))}
        </div>
      </List>
    )
  }
}

FeedbackList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(FeedbackList))
