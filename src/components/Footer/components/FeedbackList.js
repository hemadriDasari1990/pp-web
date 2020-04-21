import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

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
                    {!feedback.annonymous ? (
                      <Avatar alt={feedback.userName} src={feedback.photoURL} />
                    ) : (
                      <Avatar
                        style={{ color: '#ffffff', backgroundColor: '#1976d2' }}
                      >
                        A
                      </Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      !feedback.annonymous
                        ? feedback.userName
                        : 'Annonymous User'
                    }
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
