import * as globalActions from '../../../actions/index'

import React, { Component } from 'react'

import AskIcon from '@material-ui/icons/HowToReg'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import FiberNewIcon from '@material-ui/icons/FiberNew'
import FollowIcon from '@material-ui/icons/RssFeedOutlined'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import LiveHelpIcon from '@material-ui/icons/LiveHelp'
import LoveIcon from '@material-ui/icons/Favorite'
import { Map } from 'immutable'
import SkeletonProfile from '../../Skeletons/components/Profile'
import Slide from '@material-ui/core/Slide'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import getPastTime from '../../../util/getPastTime'
import isUserActive from '../../../util/isUserActive'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  followIcon: {
    width: 150,
    backgroundColor: '#ebf0ff',
    color: '#2b7eff',
    borderRadius: 25,
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    left: '33% !important',
  },
}

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.timer = null
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.timer ? clearTimeout(this.timer) : null
  }

  render() {
    const { classes, user } = this.props
    const { open, anchorEl, loading } = this.state
    return (
      <>
        {false ? null : (
          <Card>
            <CardContent>
              <h5 className="text-center mt-4 mb-4">My Network Summary</h5>
              <List>
                <ListItem
                  alignItems="flex-start"
                  className="cursor b-r-15 pr-0 pl-0 w-us"
                >
                  <ListItemAvatar>
                    <Slide
                      direction="right"
                      in={true}
                      timeout={1500}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Avatar variant="square" className="m-a">
                        <FollowIcon
                          className={classes.smallAvatar}
                          color="secondary"
                        />
                      </Avatar>
                    </Slide>
                  </ListItemAvatar>
                  <Tooltip title="People Follwing Me" placement="bottom-start">
                    <ListItemText
                      primary="People Follwing Me"
                      secondary="Many people following you"
                    />
                  </Tooltip>
                  <ListItemSecondaryAction className="r-5">
                    <Tooltip title="Opinion" placement="right-end">
                      <IconButton>
                        <Zoom in={true} timeout={2000}>
                          <Badge
                            badgeContent={formateNumber(user.no_of_followers)}
                            color="primary"
                          ></Badge>
                        </Zoom>
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem
                  alignItems="flex-start"
                  className="cursor b-r-15 pr-0 pl-0 w-us"
                >
                  <ListItemAvatar>
                    <Slide
                      direction="right"
                      in={true}
                      timeout={1500}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Avatar variant="square" className="m-a">
                        <FollowIcon
                          className={classes.smallAvatar}
                          color="secondary"
                        />
                      </Avatar>
                    </Slide>
                  </ListItemAvatar>
                  <Tooltip title="People I Follow" placement="bottom-start">
                    <ListItemText
                      primary="People I Follow"
                      secondary="You are good at following others"
                    />
                  </Tooltip>
                  <ListItemSecondaryAction className="r-5">
                    <Tooltip title="Ask For Opinion" placement="right-end">
                      <IconButton>
                        <Zoom in={true} timeout={2000}>
                          <Badge
                            badgeContent={formateNumber(user.no_of_followees)}
                            color="primary"
                          ></Badge>
                        </Zoom>
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem
                  alignItems="flex-start"
                  className="cursor b-r-15 pr-0 pl-0 w-us"
                >
                  <ListItemAvatar>
                    <Slide
                      direction="right"
                      in={true}
                      timeout={1500}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Avatar variant="square" className="m-a">
                        <AskIcon
                          className={classes.smallAvatar}
                          color="secondary"
                        />
                      </Avatar>
                    </Slide>
                  </ListItemAvatar>
                  <Tooltip
                    title="Opinion Requests Received"
                    placement="bottom-start"
                  >
                    <ListItemText
                      primary="Opinion Requests Received"
                      secondary="People seeking your opinion"
                    />
                  </Tooltip>
                  <ListItemSecondaryAction className="r-5">
                    <Tooltip
                      title="Total Opinion Requests"
                      placement="right-end"
                    >
                      <IconButton>
                        <Zoom in={true} timeout={2000}>
                          <Badge
                            badgeContent={formateNumber(
                              user.no_of_opinion_request_received,
                            )}
                            color="primary"
                          ></Badge>
                        </Zoom>
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem
                  alignItems="flex-start"
                  className="cursor b-r-15 pr-0 pl-0 w-us"
                >
                  <ListItemAvatar>
                    <Slide
                      direction="right"
                      in={true}
                      timeout={1500}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Avatar variant="square" className="m-a">
                        <AskIcon
                          className={classes.smallAvatar}
                          color="secondary"
                        />
                      </Avatar>
                    </Slide>
                  </ListItemAvatar>
                  <Tooltip
                    title="Opinion Requests Sent"
                    placement="bottom-start"
                  >
                    <ListItemText
                      primary="Opinion Requests Sent"
                      secondary="People you reached out to"
                    />
                  </Tooltip>
                  <ListItemSecondaryAction className="r-5">
                    <Tooltip
                      title="Total Opinion Requests"
                      placement="right-end"
                    >
                      <IconButton>
                        <Zoom in={true} timeout={2000}>
                          <Badge
                            badgeContent={formateNumber(
                              user.no_of_opinion_request_sent,
                            )}
                            color="primary"
                          ></Badge>
                        </Zoom>
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem
                  alignItems="flex-start"
                  className="cursor b-r-15 pr-0 pl-0 w-us"
                >
                  <ListItemAvatar>
                    <Slide
                      direction="right"
                      in={true}
                      timeout={1500}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Avatar variant="square" className="m-a">
                        <LikeIcon
                          className={classes.smallAvatar}
                          color="secondary"
                        />
                      </Avatar>
                    </Slide>
                  </ListItemAvatar>
                  <Tooltip title="People Like You" placement="bottom-start">
                    <ListItemText
                      primary="People Like You"
                      secondary="Know how many people likes you"
                    />
                  </Tooltip>
                  <ListItemSecondaryAction className="r-5">
                    <Tooltip title="Total Likes" placement="right-end">
                      <IconButton>
                        <Zoom in={true} timeout={2000}>
                          <Badge
                            badgeContent={formateNumber(user.no_of_likes)}
                            color="primary"
                          ></Badge>
                        </Zoom>
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem
                  alignItems="flex-start"
                  className="cursor b-r-15 pr-0 pl-0 w-us"
                >
                  <ListItemAvatar>
                    <Slide
                      direction="right"
                      in={true}
                      timeout={1500}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Avatar variant="square" className="m-a">
                        <LoveIcon
                          className={classes.smallAvatar}
                          color="secondary"
                        />
                      </Avatar>
                    </Slide>
                  </ListItemAvatar>
                  <Tooltip title="People Love You" placement="bottom-start">
                    <ListItemText
                      primary="People Love You"
                      secondary="Know how many people loves you"
                    />
                  </Tooltip>
                  <ListItemSecondaryAction className="r-5">
                    <Tooltip title="Total Love" placement="right-end">
                      <IconButton>
                        <Zoom in={true} timeout={2000}>
                          <Badge
                            badgeContent={formateNumber(user.no_of_loves)}
                            color="primary"
                          ></Badge>
                        </Zoom>
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>

            <CardActions className="mt-10 p-0 fl-justify-content"></CardActions>
          </Card>
        )}
      </>
    )
  }
}

Summary.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Summary)),
)
