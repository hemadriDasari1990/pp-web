import * as actions from '../../../actions/index'
import * as postActions from '../../Post/actions'

import React, { Component, Suspense, lazy } from 'react'

import AskIcon from '@material-ui/icons/HowToReg'
import Grid from '@material-ui/core/Grid'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
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
    this.props.history.push('/timeline/feed')
  }

  render() {
    const {} = this.state
    const { user, classes, userPreferences } = this.props
    return (
      <Suspense>
        <Grid container spacing={1}>
          <Grid item xs container>
            <Grid item xs={12} lg={3} className="p-1">
              <WelcomeProfile />
            </Grid>
            <Grid item xs={12} lg={8}>
              <Grid item xs container>
                <Grid item xs={12} lg={12}>
                  <Grid item xs container direction="row" spacing={2}>
                    <Grid item lg={5} xs={12} className="p-1">
                      <Summary
                        type="incoming"
                        title="Incoming Summary"
                        customClass="mb-0"
                      />
                    </Grid>
                    <Grid item lg={5} xs={12} className="p-1">
                      <Summary
                        type="outgoing"
                        title="Outgoing Summary"
                        customClass="mb-0"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Grid item xs container direction="row" spacing={2}>
                    <Grid item lg={5} xs={12} className="p-1">
                      <Metrics
                        icon={<LikeIcon />}
                        title="Likes"
                        name="Like"
                        count={user.no_of_likes}
                      />
                    </Grid>
                    <Grid item lg={5} xs={12} className="p-1">
                      <Metrics
                        icon={<LoveIcon />}
                        title="Love"
                        name="Love"
                        count={user.no_of_loves}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Grid item xs container direction="row" spacing={2}>
                    <Grid item lg={5} xs={12} className="p-1">
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
                    <Grid item lg={5} xs={12} className="p-1">
                      <Metrics
                        icon={
                          <RssFeedOutlinedIcon
                            className="icon-display"
                            color="#fff"
                          />
                        }
                        title="Following"
                        name="Following"
                        count={user.no_of_followees}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Grid item xs container direction="row" spacing={2}>
                    <Grid item lg={5} xs={12} className="p-1">
                      <Metrics
                        icon={
                          <AskIcon className="icon-display" color="secondary" />
                        }
                        title="Sent"
                        name="Opinion Request"
                        count={user.no_of_opinion_request_sent}
                      />
                    </Grid>
                    <Grid item lg={5} xs={12} className="p-1">
                      <Metrics
                        icon={
                          <AskIcon className="icon-display" color="secondary" />
                        }
                        title="Received"
                        name="Opinion Request"
                        count={user.no_of_opinion_request_received}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Grid item xs container direction="row" spacing={2}>
                    <Grid item lg={5} xs={12} className="p-1">
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
