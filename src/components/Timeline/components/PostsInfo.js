import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import formateNumber from '../../../util/formateNumber'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Map, fromJS } from 'immutable'
import Loader from '../../Loader/components/Loader'

class PostsInfo extends Component {
  componentDidMount() {
    const type =
      this.props.location.pathname == '/outgoing' ? 'outgoing' : 'incoming'
    if (!this.props.match.params.id && this.props.user) {
      this.props.getPostsSummary(this.props.user._id, type)
    }
    if (this.props.match.params.id) {
      this.props.getPostsSummary(this.props.match.params.id, type)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //this.props.getPostsSummary(this.props.user._id)
  }
  render() {
    const {
      classes,
      postsSummary,
      postsSummaryLoading,
      postsSummaryError,
    } = this.props
    return (
      <React.Fragment>
        <Card style={{ width: '100%', maxWidth: '100%' }}>
          <CardHeader title="Summary" />
          <CardContent className="p-0 m-l-18">
            <List className="list-row p-0">
              <ListItem alignItems="flex-start" className="p-0">
                <ListItemText
                  primary="Accepted"
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="subtitle1">
                        {postsSummary
                          ? formateNumber(postsSummary.approved)
                          : 0}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <ListItem alignItems="center" className="p-0">
                <ListItemText
                  primary="Rejected"
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="subtitle1">
                        {postsSummary
                          ? formateNumber(postsSummary.rejected)
                          : 0}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {postsSummaryLoading ? <Loader /> : null}
            </List>
            <List className="list-row p-0">
              <ListItem alignItems="flex-start" className="p-0">
                <ListItemText
                  primary="Pending"
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="subtitle1">
                        {postsSummary ? formateNumber(postsSummary.pending) : 0}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <ListItem className="p-0" alignItems="flex-end">
                <ListItemText
                  primary="Total posts"
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="subtitle1">
                        {postsSummary ? formateNumber(postsSummary.total) : 0}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

PostsInfo.propTypes = {}

const mapStateToProps = state => {
  const postsSummary = state.getIn(['Timeline', 'summary', 'success'], Map())
  const postsSummaryLoading = state.getIn(
    ['Timeline', 'summary', 'loading'],
    false,
  )
  const postsSummaryError = state.getIn(
    ['Timeline', 'summary', 'errors'],
    Map(),
  )

  return {
    postsSummary:
      Array.isArray(postsSummary) && postsSummary.length
        ? postsSummary[0]
        : null,
    postsSummaryLoading,
    postsSummaryError,
  }
}

const actionsToProps = {
  getPostsSummary: actions.getPostsSummary,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(PostsInfo))
