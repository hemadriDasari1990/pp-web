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
import * as timelineActions from '../../Timeline/actions'
import Loader from '../../Loader/components/Loader'
import incomingIcon from '../../../../assets/incoming.svg'
import outgoingIcon from '../../../../assets/outgoing.svg'
import Avatar from '@material-ui/core/Avatar'

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      summary: null,
      loading: true,
    }
  }
  componentDidMount() {
    this.props.user
      ? this.props
          .getPostsSummary(this.props.user._id, this.props.type)
          .then(summary => {
            this.setState({
              summary:
                Array.isArray(summary.data) && summary.data.length
                  ? summary.data[0]
                  : null,
              loading: false,
            })
          })
      : null
  }

  componentDidUpdate(prevProps, prevState) {
    //this.props.getPostsSummary(this.props.user._id)
  }
  render() {
    const { classes, title, type } = this.props
    const { summary, loading } = this.state
    return (
      <React.Fragment>
        <Card>
          <CardHeader
            title={title}
            className="card-title"
            action={
              <Avatar
                className="card-action-avatar b-s"
                src={type == 'incoming' ? incomingIcon : outgoingIcon}
              />
            }
          />
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
                        <h3 className="f-w-600">
                          {summary ? formateNumber(summary.approved) : 0}
                        </h3>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="center" className="p-0">
                    <ListItemText
                      className="text-center"
                      primary="Rejected"
                      secondary={
                        <h3 className="f-w-600">
                          {summary ? formateNumber(summary.rejected) : 0}
                        </h3>
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
                        <h3 className="f-w-600">
                          {summary ? formateNumber(summary.pending) : 0}
                        </h3>
                      }
                    />
                  </ListItem>
                  <ListItem className="p-0" alignItems="flex-end">
                    <ListItemText
                      className="text-center"
                      primary="Total posts"
                      secondary={
                        <h3 className="f-w-600">
                          {summary ? formateNumber(summary.total) : 0}
                        </h3>
                      }
                    />
                  </ListItem>
                </List>
              </>
            ) : null}
          </CardContent>
        </Card>
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
