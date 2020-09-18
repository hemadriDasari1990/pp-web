import * as actions from '../actions'
import * as globalActions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import Loader from '../../Loader/components/Loader'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const MainGrid = lazy(() => import('./MainGrid'))

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: undefined,
    }
  }

  async componentDidMount() {
    // this.props.match.params.id
    //   ? await this.props.getUser(this.props.match.params.id).then(res => {
    //       this.setState({
    //         profile: res.data ? res.data.user : {},
    //       })
    //     })
    //   : null
  }

  render() {
    const { classes, path } = this.props
    const { profile } = this.state
    return (
      <Suspense fallback={<Loader />}>
        <MainGrid />
      </Suspense>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const loggedInUser = state.getIn(['user', 'data'])
  return {
    loggedInUser,
  }
}

const actionsToProps = {
  getUser: globalActions.getUser,
  saveActionState: actions.saveActionState,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Dashboard))
