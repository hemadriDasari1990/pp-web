import * as actions from '../../../actions/index'

import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import PopularPosts from '../../Timeline/components/PopularPosts'
import RecentPosts from '../../Timeline/components/RecentPosts'
import Summary from '../../Dashboard/components/Summary'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class RightGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const {} = this.state
    const { profile, path } = this.props
    return (
      <>
        <Grid item lg={4} md={6} xs={12} sm={9} className="of-h">
          <Summary type={path} title="Incoming Summary" />
          <Summary type={path} title="Outgoing Summary" />
          <RecentPosts user={profile} />
          <PopularPosts user={profile} type={path} />
        </Grid>
      </>
    )
  }
}

RightGrid.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(RightGrid))
