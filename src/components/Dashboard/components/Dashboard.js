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
import ProfileReactionsCarousel from './ProfileReactionsCarousel'
import RssFeedOutlinedIcon from '@material-ui/icons/RssFeedOutlined'
import Summary from './Summary'
import WelcomeProfile from './WelcomeProfile'
import arrowIcon from '../../../../assets/arrow.svg'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Slide from '@material-ui/core/Slide'
import Zoom from '@material-ui/core/Zoom'

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
    this.props.history.push('/timeline/incoming')
  }

  render() {
    const {} = this.state
    const { user, classes, userPreferences } = this.props
    return (
      <>
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
                </Grid>
              </Grid>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </>
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
