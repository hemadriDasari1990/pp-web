import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Code from '@material-ui/icons/Code'
import Tooltip from '@material-ui/core/Tooltip'
import Phone from '@material-ui/icons/Phone'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'
import LikeIcon from '@material-ui/icons/ThumbUp'
import DisLikeIcon from '@material-ui/icons/ThumbDown'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import moment from 'moment'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import formateNumber from '../../../util/formateNumber'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'

class PostsInfo extends Component {
  render() {
    const { classes, posts } = this.props
    const likes = Math.max.apply(
      Math,
      posts.map(o => {
        return o.likes
      }),
    )
    const disLikes = Math.max.apply(
      Math,
      posts.map(o => {
        return o.disLikes
      }),
    )
    const approvedCount = posts.filter(post => post.approved).length
    const rejectedCount = posts.filter(post => post.rejected).length
    const pendingCount = posts.filter(post => !post.rejected && !post.approved)
      .length
    const totalCount = approvedCount + rejectedCount + pendingCount
    return (
      <React.Fragment>
        <Card style={{ height: 270 }}>
          <CardHeader title="Posts Information" />
          <Divider />
          <CardContent>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <VerifiedUserIcon color="primary" />
                </ListItemAvatar>
                <ListItemText primary="Approved" />
                <ListItemSecondaryAction>
                  <Badge
                    showZero
                    badgeContent={formateNumber(approvedCount)}
                  ></Badge>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <VerifiedUserIcon color="secondary" />
                </ListItemAvatar>
                <ListItemText primary="Rejected" />
                <ListItemSecondaryAction>
                  <Badge
                    showZero
                    badgeContent={formateNumber(rejectedCount)}
                  ></Badge>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <VerifiedUserIcon />
                </ListItemAvatar>
                <ListItemText primary="Pending" />
                <ListItemSecondaryAction>
                  <Badge
                    showZero
                    badgeContent={formateNumber(pendingCount)}
                  ></Badge>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <DonutLargeIcon color="primary" />
                </ListItemAvatar>
                <ListItemText primary="Total Posts" />
                <ListItemSecondaryAction>
                  <Badge
                    showZero
                    badgeContent={formateNumber(totalCount)}
                  ></Badge>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

PostsInfo.propTypes = {}

export default PostsInfo
