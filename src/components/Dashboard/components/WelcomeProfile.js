import * as actions from '../actions'
import * as globalActions from '../../../actions/index'

import { List, Map } from 'immutable'
import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import arrowIcon from '../../../../assets/arrow.svg'
import { connect } from 'react-redux'
import Slide from '@material-ui/core/Slide'
import Zoom from '@material-ui/core/Zoom'

class WelcomeProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  handleTimeline = event => {
    this.props.history.push('/timeline/incoming')
  }

  render() {
    const { classes, user } = this.props
    const { open, anchorEl } = this.state
    return (
      <>
        <Card>
          <CardContent className="text-center">
            <Zoom in={true} timeout={2000}>
              <Avatar
                className="profile"
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
                </Tooltip>
              </div>
            </Slide>
          </CardContent>
        </Card>
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

const actionsToProps = {}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(WelcomeProfile),
)
