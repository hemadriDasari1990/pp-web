import React, { Component, Suspense } from 'react'

import AskIcon from '@material-ui/icons/HowToReg'
import Avatar from '@material-ui/core/Avatar'
import FollowIcon from '@material-ui/icons/RssFeedOutlined'
import Grid from '@material-ui/core/Grid'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import LoveIcon from '@material-ui/icons/Favorite'
import PropTypes from 'prop-types'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  smallAvatar: {
    width: 23,
    height: 23,
  },
}

class ProfileSummary extends Component {
  async componentDidMount() {}

  render() {
    const { classes, user } = this.props
    return (
      <Suspense>
        <Grid container spacing={0}>
          <Grid item lg={4} xs={4}>
            <div className="text-center py-3">
              <Zoom in={true} timeout={2000}>
                <Avatar variant="square" className="m-auto">
                  <LikeIcon color="secondary" className={classes.icon} />
                </Avatar>
              </Zoom>
              <h3 className="font-weight-bold mt-1 font-size-xl">
                {formateNumber(user.no_of_likes)}
              </h3>
              <p className="text-black-50">Likes</p>
            </div>
          </Grid>
          <Grid item lg={4} xs={4}>
            <div className="text-center py-3">
              <Zoom in={true} timeout={2000}>
                <Avatar
                  variant="square"
                  className="m-auto"
                  style={{ backgroundColor: '#ff0016c7' }}
                >
                  <LoveIcon color="secondary" className={classes.icon} />
                </Avatar>
              </Zoom>
              <h3 className="font-weight-bold mt-1 font-size-xl">
                {formateNumber(user.no_of_loves)}
              </h3>
              <p className="text-black-50">Love</p>
            </div>
          </Grid>
          <Grid item lg={4} xs={4}>
            <div className="text-center py-3">
              <Zoom in={true} timeout={2000}>
                <Avatar variant="square" className="m-auto">
                  <FollowIcon color="secondary" className={classes.icon} />
                </Avatar>
              </Zoom>
              <h3 className="font-weight-bold mt-1 font-size-xl">
                {formateNumber(user.no_of_followers)}
              </h3>
              <p className="text-black-50">Followers</p>
            </div>
          </Grid>
          <Grid item lg={4} xs={4}>
            <div className="text-center py-3">
              <Zoom in={true} timeout={2000}>
                <Avatar variant="square" className="m-auto">
                  <FollowIcon color="secondary" className={classes.icon} />
                </Avatar>
              </Zoom>
              <h3 className="font-weight-bold mt-1 font-size-xl">
                {formateNumber(user.no_of_followees)}
              </h3>
              <p className="text-black-50">Following</p>
            </div>
          </Grid>
          <Grid item lg={4} xs={4}>
            <div className="text-center py-3">
              <Zoom in={true} timeout={2000}>
                <Avatar variant="square" className="m-auto">
                  <AskIcon color="secondary" className={classes.icon} />
                </Avatar>
              </Zoom>
              <h3 className="font-weight-bold mt-1 font-size-xl">
                {formateNumber(user.no_of_opinion_request_received)}
              </h3>
              <p className="text-black-50">Received</p>
            </div>
          </Grid>
          <Grid item lg={4} xs={4}>
            <div className="text-center py-3">
              <Zoom in={true} timeout={2000}>
                <Avatar variant="square" className="m-auto">
                  <AskIcon color="secondary" className={classes.icon} />
                </Avatar>
              </Zoom>
              <h3 className="font-weight-bold mt-1 font-size-xl">
                {formateNumber(user.no_of_opinion_request_sent)}
              </h3>
              <p className="text-black-50">Sent</p>
            </div>
          </Grid>
        </Grid>
      </Suspense>
    )
  }
}

ProfileSummary.propTypes = {
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
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(ProfileSummary)),
)
