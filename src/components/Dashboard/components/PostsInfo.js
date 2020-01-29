import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import formateNumber from '../../../util/formateNumber'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Map, fromJS } from 'immutable'
import Loader from '../../Loader/components/Loader'

class PostsInfo extends Component {
  componentDidMount() {
    if (!this.props.match.params.id) {
      this.props.getPostsSummary(
        this.props.userId,
        this.props.iposted,
        this.props.ireceived,
      )
    }
    if (this.props.match.params.id) {
      this.props.getPostsSummary(this.props.match.params.id, false, true)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.iposted && this.props.iposted != prevProps.iposted) {
      this.props.getPostsSummary(this.props.userId, true, false)
    }
    if (this.props.ireceived && this.props.ireceived != prevProps.ireceived) {
      this.props.getPostsSummary(this.props.userId, false, true)
    }
  }
  render() {
    const {
      classes,
      userId,
      postsSummary,
      postsSummaryLoading,
      postsSummaryError,
      iposted,
      ireceived,
    } = this.props

    // const likes = Math.max.apply(
    //   Math,
    //   posts.map(o => {
    //     return o.likes
    //   }),
    // )
    // const disLikes = Math.max.apply(
    //   Math,
    //   posts.map(o => {
    //     return o.disLikes
    //   }),
    // )
    return (
      <React.Fragment>
        <Card style={{ width: '100%', maxWidth: '100%' }}>
          <CardHeader title="Posts Summary" />
          <CardContent>
            <List>
              {postsSummary && (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <VerifiedUserIcon style={{ color: '#17ab13' }} />
                    </ListItemAvatar>
                    <ListItemText primary="Approved" />
                    <ListItemSecondaryAction>
                      <Badge
                        showZero
                        badgeContent={formateNumber(postsSummary.approved)}
                      ></Badge>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <VerifiedUserIcon style={{ color: '#ff0000' }} />
                    </ListItemAvatar>
                    <ListItemText primary="Rejected" />
                    <ListItemSecondaryAction>
                      <Badge
                        showZero
                        badgeContent={formateNumber(postsSummary.rejected)}
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
                        badgeContent={formateNumber(postsSummary.pending)}
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
                        badgeContent={formateNumber(postsSummary.total)}
                      ></Badge>
                    </ListItemSecondaryAction>
                  </ListItem>
                </>
              )}
              {!postsSummaryLoading && !postsSummary && (
                <Typography variant="h4" className="text-center">
                  No posts found hence post summary is not available
                </Typography>
              )}
              {postsSummaryLoading ? <Loader /> : null}
            </List>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

PostsInfo.propTypes = {}

const mapStateToProps = state => {
  const postsSummary = state.getIn(
    ['Dashboard', 'posts', 'summary', 'success'],
    Map(),
  )
  const postsSummaryLoading = state.getIn(
    ['Dashboard', 'posts', 'summary', 'loading'],
    false,
  )
  const postsSummaryError = state.getIn(
    ['Dashboard', 'posts', 'summary', 'errors'],
    Map(),
  )
  return {
    postsSummary: postsSummary.length ? postsSummary[0] : null,
    postsSummaryLoading,
    postsSummaryError,
  }
}

const actionsToProps = {
  getPostsSummary: actions.getPostsSummary,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(PostsInfo))
