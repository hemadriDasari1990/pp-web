import { Link, withRouter } from 'react-router-dom'
import React, { Component, Suspense } from 'react'

import Avatar from '@material-ui/core/Avatar'
import FollowIcon from '@material-ui/icons/RssFeedOutlined'
import PropTypes from 'prop-types'
import Step from '@material-ui/core/Step'
import StepConnector from '@material-ui/core/StepConnector'
import StepContent from '@material-ui/core/StepContent'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import { connect } from 'react-redux'
import { getCardSubHeaderProfileSummary } from '../../../util/getCardSubHeaderText'
import getCreatedDate from '../../../util/getCreatedDate'
import getPastTime from '../../../util/getPastTime'
import getProvider from '../../../util/getProvider'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  smallAvatar: {
    width: 23,
    height: 23,
  },
}

const ColorlibConnector = withStyles({
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector)

class ProfileFolowingStepper extends Component {
  async componentDidMount() {}

  renderReaction = type => {
    let element = null
    switch (type.toLowerCase()) {
      case 'follow':
        element = <FollowIcon style={{ fontSize: 12 }} color="secondary" />
        break
      default:
        break
    }

    return element
  }

  renderUsername = user => {
    return (
      <>
        <Link
          className="hyperlink"
          to="#"
          onClick={() => this.props.viewProfile('incoming', user._id)}
        >
          {user.userName + ' '}
        </Link>
        &nbsp;
        {getProvider(user.providerId)}&nbsp;
        <span className="grey-color hint-label">
          Since {getCreatedDate(user.createdAt)}
        </span>
        &nbsp;
      </>
    )
  }

  render() {
    const { classes, user } = this.props
    return (
      <Suspense>
        <Stepper orientation="vertical">
          {!user.followees || !user.followees.length ? (
            <h5>No following history found</h5>
          ) : null}
          {user.followees.map((followee, index) => (
            <Step key={followee._id} connector={<ColorlibConnector />}>
              <StepLabel
                optional={
                  <>
                    {getPastTime(followee.createdAt)}
                    {getCardSubHeaderProfileSummary(followee)}
                  </>
                }
                icon={
                  <Avatar
                    className={classes.smallAvatar}
                    alt={followee.userName}
                  >
                    {this.renderReaction('follow')}
                  </Avatar>
                }
              >
                {this.renderUsername(followee)}
              </StepLabel>
              <StepContent></StepContent>
            </Step>
          ))}
        </Stepper>
      </Suspense>
    )
  }
}

ProfileFolowingStepper.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {}

export default withRouter(
  connect(
    mapStateToProps,
    actionsToProps,
  )(withStyles(styles)(ProfileFolowingStepper)),
)
