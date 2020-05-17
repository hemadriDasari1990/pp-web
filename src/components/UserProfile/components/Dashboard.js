import * as globalActions from '../../../actions/index'

import React, { Component } from 'react'

import CenterGrid from './CenterGrid'
import Grid from '@material-ui/core/Grid'
import LeftGrid from './LeftGrid'
import Loader from '../../Loader/components/Loader'
import PropTypes from 'prop-types'
import RightGrid from './RightGrid'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: undefined,
    }
  }

  async componentDidMount() {
    this.props.match.params.id
      ? await this.props.getUser(this.props.match.params.id).then(res => {
          this.setState({
            profile: res.data ? res.data.user : {},
          })
        })
      : null
  }

  render() {
    const { classes, path } = this.props
    const { profile } = this.state
    return (
      <>
        {profile && (
          <Grid container spacing={1} className="of-h">
            <LeftGrid profile={profile} path={path} />
            <CenterGrid profile={profile} path={path} />
            <RightGrid profile={profile} path={path} />
          </Grid>
        )}
        {!profile && <Loader />}
      </>
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
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Dashboard))
