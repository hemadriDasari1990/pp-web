import * as actions from '../../../actions/index'

import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import RecentPosts from '../../Timeline/components/RecentPosts'
import Summary from '../../Dashboard/components/Summary'
import PopularPosts from '../../Timeline/components/PopularPosts'

class RightGrid extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const {} = this.state
    const { profile } = this.props
    const type =
      this.props.location.pathname == '/incoming' ? 'incoming' : 'outgoing'
    return (
      <>
        <Grid item lg={4} md={6} xs={12} sm={9} className="of-h">
          <Summary type={type} title="Incoming Summary" />
          <Summary type={type} title="Outgoing Summary" />
          <RecentPosts user={profile} />
          <PopularPosts user={profile} type={type} />
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
