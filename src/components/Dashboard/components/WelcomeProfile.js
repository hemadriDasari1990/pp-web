import * as actions from '../actions'
import * as globalActions from '../../../actions/index'

import { List, Map } from 'immutable'
import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import LoveIcon from '@material-ui/icons/Favorite'
import RssFeedOutlinedIcon from '@material-ui/icons/RssFeedOutlined'
import Tooltip from '@material-ui/core/Tooltip'
import arrowIcon from '../../../../assets/arrow.svg'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'

class WelcomeProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  handleTimeline = event => {
    this.props.history.push('/incoming')
  }

  render() {
    const { classes, user } = this.props
    const { open, anchorEl } = this.state
    return (
      <>
        <Card>
          <CardContent className="text-center">
            <Avatar
              className="profile"
              alt={user.userName}
              src={user.photoURL}
            />
            <h5>{user.userName}</h5>
            <span className="mt-25">Welcome to your social platform</span>
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
