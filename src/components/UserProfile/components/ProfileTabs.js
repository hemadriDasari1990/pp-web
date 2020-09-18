import * as globalActions from '../../../actions/index'
import * as postActions from '../../Post/actions'

import React, { Component, lazy } from 'react'

import AskIcon from '@material-ui/icons/HowToReg'
import AssessmentIcon from '@material-ui/icons/Assessment'
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'
import FollowIcon from '@material-ui/icons/RssFeedOutlined'
import Grid from '@material-ui/core/Grid'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import PropTypes from 'prop-types'
import RecentActorsOutlinedIcon from '@material-ui/icons/RecentActorsOutlined'
import RecentIcon from '@material-ui/icons/AccessAlarm'
// import Reactionslist from './List'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import WorldIcon from '@material-ui/icons/Public'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const Summary = lazy(() => import('../../Dashboard/components/Summary'))
const MyNetworkSummary = lazy(() =>
  import('../../Mynetwork/components/Summary'),
)

const CenterGrid = lazy(() => import('./CenterGrid'))
const LeftGrid = lazy(() => import('./LeftGrid'))
const RightGrid = lazy(() => import('./RightGrid'))
const AboutMe = lazy(() => import('./AboutMe'))

// const Reactions = lazy(() => import('../../Reactions/components/Reactions'))
const CountriesList = lazy(() => import('../../Countries/components/List'))
const ProfileFollowersView = lazy(() => import('./FollowersView'))
const ProfileReactionsView = lazy(() => import('./ReactionsView'))
const ProfileFolloweesView = lazy(() => import('./FollowingView'))
const OpinionRequestSentView = lazy(() => import('./OpinionRequestSentView'))
const OpinionRequestReceivedView = lazy(() =>
  import('./OpinionRequestReceivedView'),
)
const RecentPosts = lazy(() => import('../../Timeline/components/RecentPosts'))

const styles = {
  tab: {
    minWidth: 65, // a number of your choice
    // width: 65, // a number of your choice
  },
  icon: {
    fontSize: 30,
  },
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="subtitle1"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <React.Fragment className="mt-10">{children}</React.Fragment>
      )}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

class ProfileTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
  }

  async componentDidMount() {
    if (this.props.postId) {
      await this.props.getReactionsCount(this.props.postId)
    }
  }

  handleChange = async index => {
    this.setState({
      value: index,
    })
  }

  getStyle(isActive) {
    const { classes } = this.props
    return isActive
      ? {
          color: '#red',
          background:
            'linear-gradient(45deg, #5383ff 1%, #00ff43 80%, #5383ff 96%, #37ff2a 100%) 0% 0% / 150% 150%',
        }
      : {}
  }

  render() {
    const { classes, reactionsCount, postId, profile } = this.props
    const { value } = this.state

    return (
      <React.Fragment>
        <>
          <Tabs
            textColor="primary"
            value={value}
            scrollButtons="auto"
            aria-label="scrollable prevent tabs example"
            initialSelectedIndex={value}
            indicatorColor="primary"
            variant="scrollable"
            fullWidth
          >
            <Tab
              onClick={() => this.handleChange(0)}
              value={0}
              label={'Timeline'}
              aria-label="timeline"
              className="text-capitalize"
              classes={{ root: classes.tab }}
              icon={
                <DynamicFeedIcon
                  color="primary"
                  className={`mr-1 ${classes.icon}`}
                />
              }
            />
            <Tab
              onClick={() => this.handleChange(1)}
              value={1}
              label="About"
              className="text-capitalize"
              icon={
                <InfoOutlinedIcon
                  color="primary"
                  className={`mr-1 ${classes.icon}`}
                />
              }
              aria-label="about"
              classes={{ root: classes.tab }}
            />
            <Tab
              onClick={() => this.handleChange(2)}
              value={2}
              label={
                'Profile Reactions ' + profile
                  ? formateNumber(profile.no_of_likes + profile.no_of_loves)
                  : 0
              }
              className="text-capitalize"
              icon={
                <RecentActorsOutlinedIcon
                  color="primary"
                  className={`mr-1 ${classes.icon}`}
                />
              }
              aria-label="pr"
              classes={{ root: classes.tab }}
            />
            <Tab
              onClick={() => this.handleChange(3)}
              value={3}
              label={
                'Followers ' + profile
                  ? formateNumber(profile.no_of_followers)
                  : 0
              }
              className="text-capitalize"
              icon={
                <FollowIcon
                  color="primary"
                  className={`mr-1 ${classes.icon}`}
                />
              }
              aria-label="followers"
              classes={{ root: classes.tab }}
            />
            <Tab
              onClick={() => this.handleChange(4)}
              value={4}
              label={
                'Following ' + profile
                  ? formateNumber(profile.no_of_followees)
                  : 0
              }
              className="text-capitalize"
              icon={
                <FollowIcon
                  color="primary"
                  className={`mr-1 ${classes.icon}`}
                />
              }
              aria-label="following"
              classes={{ root: classes.tab }}
            />
            <Tab
              onClick={() => this.handleChange(5)}
              value={5}
              label={
                'Opinion Request sent ' + profile
                  ? formateNumber(profile.no_of_opinion_request_sent)
                  : 0
              }
              className="text-capitalize"
              icon={
                <AskIcon color="primary" className={`mr-1 ${classes.icon}`} />
              }
              aria-label="ors"
              classes={{ root: classes.tab }}
            />
            <Tab
              onClick={() => this.handleChange(6)}
              value={6}
              label={
                'Opinion Request received ' + profile
                  ? formateNumber(profile.no_of_opinion_request_received)
                  : 0
              }
              className="text-capitalize"
              icon={
                <AskIcon color="primary" className={`mr-1 ${classes.icon}`} />
              }
              aria-label="orr"
              classes={{ root: classes.tab }}
            />
            <Tab
              onClick={() => this.handleChange(7)}
              value={7}
              label={'Recent Posts'}
              className="text-capitalize"
              icon={
                <RecentIcon
                  color="primary"
                  className={`mr-1 ${classes.icon}`}
                />
              }
              aria-label="rp"
              classes={{ root: classes.tab }}
            />
            <Tab
              onClick={() => this.handleChange(8)}
              value={8}
              label={
                'Countries I Like ' + profile
                  ? formateNumber(profile.no_of_liked_countries)
                  : 0
              }
              className="text-capitalize"
              icon={
                <WorldIcon color="primary" className={`mr-1 ${classes.icon}`} />
              }
              aria-label="orr"
              classes={{ root: classes.tab }}
            />
            <Tab
              onClick={() => this.handleChange(9)}
              value={9}
              label={'Summary'}
              className="text-capitalize"
              icon={
                <AssessmentIcon
                  color="primary"
                  className={`mr-1 ${classes.icon}`}
                />
              }
              aria-label="s"
              classes={{ root: classes.tab }}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Grid container spacing={1} className="of-h w-us">
              <LeftGrid />
              <CenterGrid />
              <RightGrid />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AboutMe />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ProfileReactionsView />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ProfileFollowersView />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ProfileFolloweesView />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <OpinionRequestSentView />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <OpinionRequestReceivedView />
          </TabPanel>
          <TabPanel value={value} index={7}>
            <RecentPosts />
          </TabPanel>
          <TabPanel value={value} index={8}>
            <CountriesList countries={profile.countries} />
          </TabPanel>
          <TabPanel value={value} index={9}>
            <Grid container spacing={1}>
              <Grid item lg={4} xs={12}>
                <MyNetworkSummary />
              </Grid>
              <Grid item lg={4} xs={12}>
                <Summary type="incoming" title="Incoming Summary" />
              </Grid>
              <Grid item lg={4} xs={12}>
                <Summary type="outgoing" title="Outgoing Summary" />
              </Grid>
            </Grid>
          </TabPanel>
        </>
      </React.Fragment>
    )
  }
}

ProfileTabs.propTypes = {}

const mapStateToProps = state => {
  const profile = state.getIn(['user', 'success'])
  const reactionsCount = state.getIn(['Post', 'reactions', 'count', 'success'])
  const postId = state.getIn(['Timeline', 'post', 'id', 'save'])
  return {
    reactionsCount,
    postId,
    profile: profile ? profile.user : undefined,
  }
}

const actionsToProps = {
  getUser: globalActions.getUser,
  getReactionsCount: postActions.getReactionsCount,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(ProfileTabs)),
)
