import * as globalActions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import FiberNewIcon from '@material-ui/icons/FiberNew'
import FollowIcon from '@material-ui/icons/RssFeedOutlined'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import LiveHelpIcon from '@material-ui/icons/LiveHelp'
import Loader from '../../Loader/components/Loader'
import LoveIcon from '@material-ui/icons/Favorite'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import SkeletonListCard from '../../Skeletons/components/ListCard'
import Slide from '@material-ui/core/Slide'
import StepButton from '@material-ui/core/StepButton'
import StepConnector from '@material-ui/core/StepConnector'
import StepContent from '@material-ui/core/StepContent'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import Tooltip from '@material-ui/core/Tooltip'
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
    width: 33,
    height: 33,
  },
  badge: {
    width: 20,
    height: 20,
  },
}

class HelpList extends Component {
  componentDidMount() {}

  render() {
    const { classes, user } = this.props
    return (
      <Suspense>
        <List>
          <Grid key={user._id} item lg={12} md={12} xs={12} sm={12}>
            <ListItem
              alignItems="flex-start"
              className="cursor b-r-15 mt-10 w-us"
            >
              <ListItemAvatar>
                <Slide
                  direction="right"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <LibraryAddIcon
                    className={classes.smallAvatar}
                    color="primary"
                  />
                </Slide>
              </ListItemAvatar>
              <Tooltip title="Getting Started" placement="bottom-start">
                <ListItemText
                  primary="Getting Started"
                  secondary="Explore key features and possibilities"
                />
              </Tooltip>
              <ListItemSecondaryAction className="r-5">
                <Tooltip title="Ask For Opinion" placement="right-end">
                  <IconButton>
                    <Zoom in={true} timeout={2000}>
                      <Badge badgeContent={4} color="primary"></Badge>
                    </Zoom>
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              alignItems="flex-start"
              className="cursor b-r-15 mt-10 w-us"
            >
              <ListItemAvatar>
                <Slide
                  direction="right"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <FiberNewIcon
                    className={classes.smallAvatar}
                    color="primary"
                  />
                </Slide>
              </ListItemAvatar>
              <Tooltip title={user.userName} placement="bottom-start">
                <ListItemText
                  primary="What's New"
                  secondary="Find out the latest product changes"
                />
              </Tooltip>
              <ListItemSecondaryAction className="r-5">
                <Tooltip title="Ask For Opinion" placement="right-end">
                  <IconButton>
                    <Zoom in={true} timeout={2000}>
                      <Badge badgeContent={6} color="primary"></Badge>
                    </Zoom>
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              alignItems="flex-start"
              className="cursor b-r-15 mt-10 w-us"
            >
              <ListItemAvatar>
                <Slide
                  direction="right"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <LiveHelpIcon
                    className={classes.smallAvatar}
                    color="primary"
                  />
                </Slide>
              </ListItemAvatar>
              <Tooltip title="Get Help" placement="bottom-start">
                <ListItemText
                  primary="Get Help"
                  secondary="Need assistance? We're here to help"
                />
              </Tooltip>
              <ListItemSecondaryAction className="r-5">
                <Tooltip title="Ask For Opinion" placement="right-end">
                  <IconButton>
                    <Zoom in={true} timeout={2000}>
                      <Badge badgeContent={2} color="primary"></Badge>
                    </Zoom>
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          </Grid>
        </List>
      </Suspense>
    )
  }
}

HelpList.propTypes = {
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
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(HelpList)),
)
