import * as actions from '../actions'
import * as globalActions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import FollowIcon from '@material-ui/icons/RssFeedOutlined'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import { Link } from 'react-router-dom'
import Loader from '../../Loader/components/Loader'
import LoveIcon from '@material-ui/icons/Favorite'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import SkeletonListCard from '../../Skeletons/components/ListCard'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import StepConnector from '@material-ui/core/StepConnector'
import StepContent from '@material-ui/core/StepContent'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import { getCardSubHeaderProfileSummary } from '../../../util/getCardSubHeaderText'
import getCreatedDate from '../../../util/getCreatedDate'
import getPastTime from '../../../util/getPastTime'
import getProvider from '../../../util/getProvider'
import { withRouter } from 'react-router-dom'

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

class OpinionRequestSent extends Component {
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
          {!user.opinionRequestsSent || !user.opinionRequestsSent.length ? (
            <h5>No opinion requests sent</h5>
          ) : null}
          {user.opinionRequestsSent.map((ors, index) => (
            <Step key={ors._id} connector={<ColorlibConnector />}>
              <StepLabel
                optional={
                  <>
                    {getPastTime(ors.createdAt)}
                    {getCardSubHeaderProfileSummary(ors)}
                  </>
                }
                icon={
                  <Avatar className={classes.smallAvatar} alt={ors.userName}>
                    {this.renderReaction('follow')}
                  </Avatar>
                }
              >
                {this.renderUsername(ors)}
              </StepLabel>
              <StepContent></StepContent>
            </Step>
          ))}
        </Stepper>
      </Suspense>
    )
  }
}

OpinionRequestSent.propTypes = {
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
  )(withStyles(styles)(OpinionRequestSent)),
)
