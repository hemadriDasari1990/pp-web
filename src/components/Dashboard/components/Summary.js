import * as timelineActions from '../../Timeline/actions'

import React, { Component, Suspense, lazy } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import DownIcon from '@material-ui/icons/GetApp'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import UpIcon from '@material-ui/icons/Publish'
import Zoom from '@material-ui/core/Grow'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import { withRouter } from 'react-router-dom'

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      summary: null,
      loading: true,
    }
  }
  async componentDidMount() {
    this.props.user
      ? await this.props
          .getPostsSummary(this.props.user._id, this.props.type)
          .then(summary => {
            this.setState({
              summary: summary.data,
              loading: false,
            })
          })
      : null
  }

  render() {
    const { classes, title, type } = this.props
    const { summary, loading } = this.state
    return (
      <Suspense>
        <Card>
          <Zoom in={true} timeout={2000}>
            <CardHeader
              title={title}
              className="card-title"
              action={
                type == 'incoming' ? (
                  <DownIcon color="primary" />
                ) : (
                  <UpIcon color="primary" />
                )
              }
            />
          </Zoom>
          <CardContent className="p-0">
            {loading ? (
              <List className="list-row h-120 ml-40">
                <Loader />
              </List>
            ) : null}
            {!loading ? (
              <>
                <List className="list-row p-0">
                  <ListItem alignItems="flex-start" className="p-0">
                    <ListItemText
                      className="text-center"
                      primary="Accepted"
                      secondary={
                        <Zoom in={true} timeout={2000}>
                          <h3 className="f-w-600">
                            {summary ? formateNumber(summary.approved) : 0}
                          </h3>
                        </Zoom>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="center" className="p-0">
                    <ListItemText
                      className="text-center"
                      primary="Rejected"
                      secondary={
                        <Zoom in={true} timeout={2000}>
                          <h3 className="f-w-600">
                            {summary ? formateNumber(summary.rejected) : 0}
                          </h3>
                        </Zoom>
                      }
                    />
                  </ListItem>
                </List>
                <List className="list-row p-0">
                  <ListItem alignItems="flex-start" className="p-0">
                    <ListItemText
                      className="text-center"
                      primary="Pending"
                      secondary={
                        <Zoom in={true} timeout={2000}>
                          <h3 className="f-w-600">
                            {summary ? formateNumber(summary.pending) : 0}
                          </h3>
                        </Zoom>
                      }
                    />
                  </ListItem>
                  <ListItem className="p-0" alignItems="flex-end">
                    <ListItemText
                      className="text-center"
                      primary="Total posts"
                      secondary={
                        <Zoom in={true} timeout={2000}>
                          <h3 className="f-w-600">
                            {summary ? formateNumber(summary.total) : 0}
                          </h3>
                        </Zoom>
                      }
                    />
                  </ListItem>
                </List>
              </>
            ) : null}
          </CardContent>
        </Card>
      </Suspense>
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

const actionsToProps = {
  getPostsSummary: timelineActions.getPostsSummary,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Summary))
