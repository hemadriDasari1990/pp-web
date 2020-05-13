import * as actions from '../../../actions/index'

import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Incoming from '../../Timeline/components/Incoming'
import { connect } from 'react-redux'

class CenterGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const {} = this.state
    const { profile } = this.props
    return (
      <>
        <Grid item lg={5} md={6} xs={12} sm={9} className="middle-content">
          <Incoming user={profile} type="profile" />
        </Grid>
      </>
    )
  }
}

CenterGrid.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(CenterGrid))
