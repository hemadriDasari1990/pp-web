import React, { Component } from 'react'

import FeedbackList from '../../Footer/components/FeedbackList'
import { List } from 'immutable'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
})

class Feedbacks extends Component {
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <div className={classes.root}>
          <FeedbackList />
        </div>
      </React.Fragment>
    )
  }
}

Feedbacks.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'], List())

  return {
    user,
  }
}

export default withRouter(
  connect(mapStateToProps, null)(withStyles(styles)(Feedbacks)),
)
