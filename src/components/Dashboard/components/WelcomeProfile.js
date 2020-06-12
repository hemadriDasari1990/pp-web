import * as userProfileActions from '../../UserProfile/actions'

import React, { Component } from 'react'

import ArrowIcon from '@material-ui/icons/ArrowForward'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import SkeletonWelcomeProfile from '../../Skeletons/components/WelcomeProfile'
import Slide from '@material-ui/core/Slide'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class WelcomeProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.timer = null
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 500)
  }

  componentWillUnmount() {
    this.timer ? clearTimeout(this.timer) : null
  }

  handleTimeline = event => {
    this.props.history.push('/timeline/feed')
    this.props.saveActionState('feed')
  }

  render() {
    const { classes, user } = this.props
    const { open, anchorEl, loading } = this.state
    return (
      <>
        {loading ? (
          <SkeletonWelcomeProfile />
        ) : (
          <Card>
            <CardContent className="text-center">
              <Zoom in={true} timeout={2000}>
                <Avatar
                  className="l-35 profile"
                  alt={user.userName}
                  src={user.photoURL}
                />
              </Zoom>
              <Slide
                direction="left"
                in={true}
                timeout={1500}
                mountOnEnter
                unmountOnExit
              >
                <h5>{user.userName}</h5>
              </Slide>
              <span className="mt-25">Welcome to your social platform</span>
              <Slide
                direction="right"
                in={true}
                timeout={2000}
                mountOnEnter
                unmountOnExit
              >
                <div className="mt-25">
                  <Tooltip title="View Timeline">
                    <Button
                      onClick={() => this.handleTimeline()}
                      size="small"
                      aria-label="add"
                      variant="contained"
                      className="align-items-center mb-10"
                      color="primary"
                    >
                      View Timeline&nbsp;
                      <ArrowIcon color="secondary" />
                    </Button>
                  </Tooltip>
                </div>
              </Slide>
            </CardContent>
          </Card>
        )}
      </>
    )
  }
}

WelcomeProfile.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  saveActionState: userProfileActions.saveActionState,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(WelcomeProfile),
)
