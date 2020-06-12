import * as timelineActions from '../../Timeline/actions'

import React, { Component, Suspense, lazy } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import DownIcon from '@material-ui/icons/GetApp'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import SkeletonSummary from '../../Skeletons/components/Summary'
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
    this.timer = null
  }
  componentDidMount() {
    this.props.user
      ? this.props
          .getPostsSummary(this.props.user._id, this.props.type)
          .then(summary => {
            this.timer = setTimeout(() => {
              this.setState({
                summary: summary.data,
                loading: false,
              })
            }, 500)
          })
      : null
  }

  componentWillUnmount() {
    this.timer ? clearTimeout(this.timer) : null
  }

  render() {
    const { classes, title, type, customClass } = this.props
    const { summary, loading } = this.state
    return (
      <React.Fragment>
        {loading ? (
          <SkeletonSummary />
        ) : (
          <Card className={customClass}>
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
              <>
                <List className="list-row p-0">
                  <ListItem alignItems="flex-start" className="p-0">
                    <ListItemText
                      className="text-center"
                      primary={<span className="title-color">Accepted</span>}
                      secondary={
                        <Zoom in={true} timeout={2000}>
                          <h3 className="title-value-color f-w-600">
                            {summary ? formateNumber(summary.approved) : 0}
                          </h3>
                        </Zoom>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="center" className="p-0">
                    <ListItemText
                      className="text-center"
                      primary={<span className="title-color">Rejected</span>}
                      secondary={
                        <Zoom in={true} timeout={2000}>
                          <h3 className="title-value-color f-w-600">
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
                      primary={<span className="title-color">Pending</span>}
                      secondary={
                        <Zoom in={true} timeout={2000}>
                          <h3 className="title-value-color f-w-600">
                            {summary ? formateNumber(summary.pending) : 0}
                          </h3>
                        </Zoom>
                      }
                    />
                  </ListItem>
                  <ListItem className="p-0" alignItems="flex-end">
                    <ListItemText
                      className="text-center"
                      primary={<span className="title-color">Total Posts</span>}
                      secondary={
                        <Zoom in={true} timeout={2000}>
                          <h3 className="title-value-color f-w-600">
                            {summary ? formateNumber(summary.total) : 0}
                          </h3>
                        </Zoom>
                      }
                    />
                  </ListItem>
                </List>
              </>
            </CardContent>
          </Card>
        )}
      </React.Fragment>
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
