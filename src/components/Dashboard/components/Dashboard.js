import * as actions from '../../../actions/index'
import * as postActions from '../../Post/actions'

import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import Loader from '../../Loader/components/Loader'
import LoveIcon from '@material-ui/icons/Favorite'
import Metrics from './Metrics'
import PreferencesIcon from '../../SvgIcons/components/Preferences'
import RssFeedOutlinedIcon from '@material-ui/icons/RssFeedOutlined'
import Summary from './Summary'
import arrowIcon from '../../../../assets/arrow.svg'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  async componentDidMount() {
    const { user } = this.props
    user ? await this.props.getUserPreferences(user._id) : null
  }

  handleTimeline = event => {
    this.props.history.push('/incoming')
  }

  render() {
    const {} = this.state
    const { user, classes, userPreferences } = this.props
    return (
      <div className="container">
        {user && userPreferences ? (
          <>
            <div className="row">
              <div className="text-center col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <h5>Hi, {user ? user.userName : ''}!</h5>
                <p>Welcome to your social platform</p>
                <Fab
                  onClick={() => this.handleTimeline()}
                  size="small"
                  color="primary"
                  aria-label="add"
                  variant="extended"
                  className="align-items-center mb-10"
                >
                  View Timeline{' '}
                  <Avatar src={arrowIcon} className="b-s b-w-arrow" />
                </Fab>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <Summary type="incoming" title="Incoming Summary" />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <Summary type="outgoing" title="Outgoing Summary" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-0 col-sm-12 col-xs-12"></div>
              <div className="col-lg-4 col-md-6 col-sm col-xs-12">
                <Metrics
                  icon={<LikeIcon />}
                  title="Likes"
                  name="Like"
                  count={user.no_of_likes}
                />
              </div>
              <div className="col-lg-4 col-md-0 col-sm col-xs-12">
                <Metrics
                  icon={<LoveIcon />}
                  title="Love"
                  name="Love"
                  count={user.no_of_loves}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-0 col-sm-12 col-xs-12"></div>
              <div className="col-lg-4 col-md-6 col-sm col-xs-12">
                <Metrics
                  icon={
                    <RssFeedOutlinedIcon
                      className="icon-display"
                      color="#fff"
                    />
                  }
                  title="Followers"
                  name="Followers"
                  count={user.no_of_followers}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm col-xs-12">
                <Metrics
                  icon={
                    <PreferencesIcon
                      style={{ width: 40, height: 40 }}
                      color="#fff"
                    />
                  }
                  title="Times Updated"
                  name="Preferences"
                  count={
                    userPreferences && userPreferences.pref
                      ? userPreferences.pref.count
                      : 0
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    )
  }
}

DashBoard.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const userPreferences = state.getIn(['Post', 'preferences', 'get', 'success'])
  const userPreferencesLoading = state.getIn([
    'Post',
    'preferences',
    'get',
    'loading',
  ])
  return {
    user,
    userPreferences,
    userPreferencesLoading,
  }
}

const actionsToProps = {
  getUser: actions.getUser,
  getUserPreferences: postActions.getUserPreferences,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(DashBoard)),
)
