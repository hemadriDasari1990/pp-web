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
    const { classes, feedbacks, feedbacksLoading } = this.props
    return (
      <>
        {!feedbacksLoading && feedbacks && (
          <div className="col-lg-12">
            <h2>Feedbacks from our people</h2>
            <p className="margin-bottom">
              We are really thankful to them who are helping us to improve the
              system.
            </p>
          </div>
        )}
        <List className={classes.root}>
          <div className="row">
            {!feedbacksLoading &&
              feedbacks &&
              feedbacks.map(feedback => (
                <div
                  key={feedback._id}
                  className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
                >
                  <ListItem
                    alignItems="flex-start"
                    className="shadow b-r-15 cursor mb-10"
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
                            backgroundColor: '#2a7fff',
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
                          <LikeIcon color="#2a7fff" />
                        </Tooltip>
                      ) : null}
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              ))}
            {feedbacksLoading && <Loader />}
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
  const feedbacks = state.getIn(['Footer', 'feedbacks', 'get', 'success'])
  const feedbacksLoading = state.getIn(
    ['Footer', 'feedbacks', 'get', 'loading'],
    false,
  )
  return {
    feedbacks,
    feedbacksLoading,
  }
}

const actionsToProps = {}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(FeedbackList)),
)
