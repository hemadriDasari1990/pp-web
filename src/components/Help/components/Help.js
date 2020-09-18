import React, { Component, Suspense } from 'react'

import Divider from '@material-ui/core/Divider'
import HelpList from './List'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  smallAvatar: {
    width: 23,
    height: 23,
  },
}

class Help extends Component {
  async componentDidMount() {}

  render() {
    const { classes, user } = this.props
    return (
      <Suspense>
        <div className="ml-25">
          <div className="text-center mt-3">
            <h3 className="mt-3 mb-3">Learn & Inspire</h3>
            <Divider />
          </div>
        </div>
        <HelpList />
      </Suspense>
    )
  }
}

Help.propTypes = {
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
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Help)),
)
