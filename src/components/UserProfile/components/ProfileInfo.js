import * as actions from '../actions'

import React, { Component, Suspense, lazy } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'
import Slide from '@material-ui/core/Slide'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const ProfileFollowersStepper = lazy(() => import('./ProfileFollowersStepper'))
const ProfileFollowingStepper = lazy(() => import('./ProfileFollowingStepper'))
const ProfileReactionsActivity = lazy(() =>
  import('./ProfileReactionsActivity'),
)
const ProfileSummary = lazy(() => import('./ProfileSummary'))
const OpinionRequestSent = lazy(() => import('./OpinionRequestSent'))
const OpinionRequestReceived = lazy(() => import('./OpinionRequestReceived'))
// const SkeletonListCard = lazy(() => import('./SkeletonListCard'))

const styles = {
  avatar: {
    width: 110,
    height: 110,
    margin: 'auto',
  },
}

class ProfileInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
    }
  }
  async componentDidMount() {}

  viewProfile = (type, userId) => {
    this.props.saveActionState(type)
    this.props.history.push(`/profile/${userId}`)
  }

  componentWillUnmount() {
    this.setState({
      open: false,
    })
  }

  render() {
    const { classes, user } = this.props
    const { open } = this.state
    return (
      <Suspense>
        <div className="ml-25">
          {user && (
            <div className="text-center mt-3">
              <Zoom in={open} timeout={2000}>
                <Avatar
                  alt={user.userName}
                  src={user.photoURL}
                  className={classes.avatar}
                />
              </Zoom>
              <h3 className="mt-3 mb-3">{user.userName}</h3>
              <Divider />
            </div>
          )}
          <div className="mt-3">
            <Slide
              direction="right"
              in={open}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <h4 className="mt-3 mb-2">Your profile summary</h4>
            </Slide>
            <span className="text-black-50">
              Know your profile reactions summary
            </span>
            <ProfileSummary />
          </div>
          <div className="mt-3">
            <Slide
              direction="right"
              in={open}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <h4 className="mt-3 mb-2">Reactions</h4>
            </Slide>
            <span className="text-black-50">
              Know your profile reactions starting from recent
            </span>
            <ProfileReactionsActivity viewProfile={this.viewProfile} />
          </div>
          <div className="mt-3">
            <Slide
              direction="right"
              in={open}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <h4 className="mt-3 mb-2">Followers</h4>
            </Slide>
            <span className="text-black-50">
              Know your followers starting from recent
            </span>
            <ProfileFollowersStepper viewProfile={this.viewProfile} />
          </div>
          <div className="mt-3">
            <Slide
              direction="right"
              in={open}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <h4 className="mt-3 mb-2">Following</h4>
            </Slide>
            <span className="text-black-50">
              Know whom you are following starting from recent
            </span>
            <ProfileFollowingStepper viewProfile={this.viewProfile} />
          </div>
          <div className="mt-3">
            <Slide
              direction="right"
              in={open}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <h4 className="mt-3 mb-2">Opinion requests sent</h4>
            </Slide>
            <span className="text-black-50">
              Know who requested for your opinion
            </span>
            <OpinionRequestSent viewProfile={this.viewProfile} />
          </div>
          <div className="mt-3">
            <Slide
              direction="right"
              in={open}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <h4 className="mt-3 mb-2">Opinion requests received</h4>
            </Slide>
            <span className="text-black-50">
              Know opinion requests from people
            </span>
            <OpinionRequestReceived viewProfile={this.viewProfile} />
          </div>
        </div>
      </Suspense>
    )
  }
}

ProfileInfo.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  saveActionState: actions.saveActionState,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(ProfileInfo)),
)
