import { Link, withRouter } from 'react-router-dom'
import React, { Component, Suspense } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import LoveIcon from '@material-ui/icons/Favorite'
import PropTypes from 'prop-types'
import Step from '@material-ui/core/Step'
import StepConnector from '@material-ui/core/StepConnector'
import StepContent from '@material-ui/core/StepContent'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import Zoom from '@material-ui/core/Zoom'
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
  customBadge: {
    top: '90%',
    width: 35,
    height: 35,
    backgroundColor: 'unset !important',
  },
}

const ColorlibConnector = withStyles({
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector)

class ProfileReactionsActivity extends Component {
  async componentDidMount() {}

  renderReaction = type => {
    let element = null
    switch (type.toLowerCase()) {
      case 'like':
        element = <LikeIcon style={{ fontSize: 15 }} color="secondary" />
        break
      case 'love':
        element = <LoveIcon style={{ fontSize: 15 }} color="secondary" />
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
          {!user.reactions || !user.reactions.length ? (
            <h5>No Reactions history found</h5>
          ) : null}
          {user.reactions.map((reaction, index) => (
            <Step key={reaction._id} connector={<ColorlibConnector />}>
              <StepLabel
                optional={
                  <>
                    {getPastTime(reaction.createdAt)}
                    {getCardSubHeaderProfileSummary(reaction.likedBy)}
                  </>
                }
                icon={
                  <Badge
                    classes={{ badge: classes.customBadge }}
                    overlap="circle"
                    badgeContent={
                      <Zoom in={true} timeout={2000}>
                        <Avatar
                          className={classes.smallAvatar}
                          alt={reaction.likedBy.userName}
                          style={{
                            backgroundColor:
                              reaction.type.toLowerCase() === 'love'
                                ? '#ff0016c7'
                                : '',
                          }}
                        >
                          {this.renderReaction(reaction.type)}
                        </Avatar>
                      </Zoom>
                    }
                  >
                    <Zoom in={true} timeout={2000}>
                      <Avatar
                        src={reaction.likedBy.photoURL}
                        alt={reaction.likedBy.userName}
                      />
                    </Zoom>
                  </Badge>
                }
              >
                {this.renderUsername(reaction.likedBy)}
              </StepLabel>
              <StepContent></StepContent>
            </Step>
          ))}
        </Stepper>
      </Suspense>
    )
  }
}

ProfileReactionsActivity.propTypes = {
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
  )(withStyles(styles)(ProfileReactionsActivity)),
)
