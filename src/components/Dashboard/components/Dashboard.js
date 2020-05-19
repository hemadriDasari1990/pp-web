import * as actions from '../../../actions/index'
import * as postActions from '../../Post/actions'

import React, { Component, Suspense, lazy } from 'react'

import Grid from '@material-ui/core/Grid'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import Loader from '../../Loader/components/Loader'
import LoveIcon from '@material-ui/icons/Favorite'
import PreferencesIcon from '@material-ui/icons/Tune'
import RssFeedOutlinedIcon from '@material-ui/icons/RssFeedOutlined'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const WelcomeProfile = lazy(() => import('./WelcomeProfile'))
const Metrics = lazy(() => import('./Metrics'))
const Summary = lazy(() => import('./Summary'))

const styles = theme => ({})

class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    const { user } = this.props
    if (user) {
      await this.props.getUser(user._id)
      await this.props.getUserPreferences(user._id)
    }
  }

  handleTimeline = event => {
    this.props.history.push('/timeline/incoming')
  }

  render() {
    const {} = this.state
    const { user, classes, userPreferences } = this.props
    return (
      <Suspense>
        {user && userPreferences ? (
          <>
            <div className="row">
              <Grid container spacing={1} className="of-h">
                <Grid
                  item
                  lg={3}
                  md={3}
                  xs={12}
                  sm={9}
                  className="middle-content"
                >
                  <WelcomeProfile />
                  {/* <ProfileReactionsCarousel /> */}
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={6}
                  xs={12}
                  sm={9}
                  className="middle-content"
                >
                  <Summary type="incoming" title="Incoming Summary" />
                  <Metrics
                    icon={<LikeIcon />}
                    title="Likes"
                    name="Like"
                    count={user.no_of_likes}
                  />
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
                </Grid>
                <Grid
                  item
                  lg={3}
                  md={6}
                  xs={12}
                  sm={9}
                  className="middle-content"
                >
                  <Summary type="outgoing" title="Outgoing Summary" />
                  <Metrics
                    icon={<LoveIcon />}
                    title="Love"
                    name="Love"
                    count={user.no_of_loves}
                  />
                  <Metrics
                    icon={<PreferencesIcon color="secondary" />}
                    title="Times Updated"
                    name="Preferences"
                    count={
                      userPreferences && userPreferences.pref
                        ? userPreferences.pref.count
                        : 0
                    }
                  />
                </Grid>
              </Grid>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </Suspense>
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
