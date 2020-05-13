import * as actions from '../../../actions/index'

import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import Profile from './Profile'
import Reactions from './Reactions'
import Followers from './Followers'

class LeftGrid extends Component {
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
        <Grid item lg={3} md={3} xs={12} sm={9} className="middle-content">
          <Profile profileUser={profile} />
          <Reactions />
          <Followers />
        </Grid>
      </>
    )
  }
}

LeftGrid.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(LeftGrid))
