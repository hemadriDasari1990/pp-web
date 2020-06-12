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
import ListSubheader from '@material-ui/core/ListSubheader'
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

class CountriesList extends Component {
  componentDidMount() {}

  render() {
    const { classes, user, countries } = this.props
    return (
      <Suspense>
        <List>
          <Grid container spacing={1}>
            {countries &&
              countries.map(country => (
                <Grid
                  key={user._id}
                  item
                  lg={3}
                  md={12}
                  xs={12}
                  sm={12}
                  key={country._id}
                >
                  {/* <ListSubheader>1,23,500 Likes</ListSubheader> */}
                  <ListItem
                    alignItems="flex-start"
                    className="cursor b-r-15 mt-10 w-us"
                  >
                    <ListItemAvatar>
                      <Zoom in={true} timeout={1500}>
                        <Avatar
                          variant="square"
                          className="m-a"
                          src={country.flag}
                        />
                      </Zoom>
                    </ListItemAvatar>
                    <Tooltip title={country.name} placement="bottom-start">
                      <ListItemText
                        primary={
                          country.name.length > 25
                            ? country.name.substring(0, 25) + '...'
                            : country.name
                        }
                        secondary={
                          <>
                            <span>1,23,500 Likes</span>
                          </>
                        }
                      />
                    </Tooltip>
                    <ListItemSecondaryAction className="r-5">
                      {/* <Tooltip title="Total Likes" placement="right-end">
                                    <IconButton>
                                        <Zoom in={true} timeout={2000}>
                                            <Badge badgeContent={4} color="primary">
                                            </Badge>
                                        </Zoom>
                                    </IconButton>
                                </Tooltip> */}
                      <Tooltip title={'Like'} placement="right-end">
                        <Zoom in={true} timeout={2000}>
                          <IconButton>
                            <LikeIcon />
                          </IconButton>
                        </Zoom>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
              ))}
          </Grid>
        </List>
      </Suspense>
    )
  }
}

CountriesList.propTypes = {
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
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(CountriesList)),
)
