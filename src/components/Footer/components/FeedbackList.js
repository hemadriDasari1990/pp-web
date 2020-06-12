import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

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
      <>
        <List className={classes.root}>
          <div className="row">
            {feedbacks &&
              feedbacks.map(feedback => (
                <div
                  key={feedback._id}
                  className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
                >
                  <ListItem
                    alignItems="flex-start"
                    className="b-r-15 cursor mb-10"
                  >
                    <ListItemAvatar>
                      {!feedback.annonymous ? (
                        <Avatar
                          alt={feedback.userName}
                          src={feedback.photoURL}
                        />
                      ) : (
                        <Avatar
                          style={{
                            color: '#ffffff',
                            backgroundColor: '#5383ff',
                          }}
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
                          </Typography>{' '}
                          - {' ' + feedback.comment}
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction>
                      {feedback.good || feedback.vGood ? (
                        <Tooltip title={feedback.isInteresting}>
                          <LikeIcon color="#5383ff" />
                        </Tooltip>
                      ) : null}
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              ))}
          </div>
        </List>
      </>
    )
  }
}

FeedbackList.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {}
}

const actionsToProps = {}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(FeedbackList)),
)
