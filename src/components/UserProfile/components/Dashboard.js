import * as globalActions from '../../../actions/index'

import React, { Component } from 'react'

import Followers from './Followers'
import Incoming from '../../Timeline/components/Incoming'
import Loader from '../../Loader/components/Loader'
import PopularPosts from '../../Timeline/components/PopularPosts'
import Profile from './Profile'
import PropTypes from 'prop-types'
import Reactions from './Reactions'
import RecentPosts from '../../Timeline/components/RecentPosts'
import Summary from '../../Dashboard/components/Summary'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
    }
  }

  async componentDidMount() {
    this.props.match.params.id
      ? await this.props.getUser(this.props.match.params.id).then(res => {
          this.setState({
            user: res.data ? res.data.user : {},
          })
        })
      : null
  }

  render() {
    const { classes, loggedInUser } = this.props
    const { user } = this.state
    return (
      <div className="container">
        <div className="row">
          {loggedInUser && (
            <>
              <div className="col-lg-3 col-md-5 col-sm-12 col-xs-12">
                {user && <Profile profileUser={user} />}
                {user && <Reactions />}
                {user && <Followers />}
              </div>
              <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12">
                {user && <Incoming user={user} type="profile" />}
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                {user && <Summary type="incoming" title="Incoming Summary" />}
                {user && <Summary type="outgoing" title="Outgoing Summary" />}
                {user && <RecentPosts user={user} />}
                {user && <PopularPosts user={user} type="incoming" />}
              </div>
            </>
          )}
          {!loggedInUser || (!user && <Loader />)}
        </div>
      </div>
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
