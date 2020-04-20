import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PostsInfo from '../../Timeline/components/PostsInfo'
import RecentPosts from '../../Timeline/components/RecentPosts'
import TopPosts from '../../Timeline/components/TopPosts'
import * as globalActions from '../../../actions/index'
import Profile from './Profile'
import Reactions from './Reactions'
import Incoming from '../../Timeline/components/Incoming'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
    }
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id).then(res => {
      this.setState({
        user: res.data ? res.data.user : {},
      })
    })
  }

  render() {
    const { classes, loggedInUser } = this.props
    const { user } = this.state
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-3 col-md-5 col-sm-12 col-xs-12">
            {user && loggedInUser && <Profile profileUser={user} />}
            <Reactions />
          </div>
          <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12">
            {user && <Incoming user={user} />}
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
            {user && <PostsInfo user={user} />}
            {user && <RecentPosts user={user} />}
            {user && <TopPosts user={user} />}
          </div>
        </div>
      </React.Fragment>
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
