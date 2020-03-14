import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List } from 'immutable'

const styles = theme => ({
  
})

class Advice extends Component {
  
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <div className="container">
          <h2 className="h2-header">Coming soon...</h2>
          
        </div>
      </React.Fragment>
    )
  }
}

Advice.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'], List())
  const authenticate = state.getIn(['user', 'auth'], false)

  return {
    user,
    authenticate,
  }
}

export default withRouter(
  connect(mapStateToProps, null)(withStyles(styles)(Advice)),
)
