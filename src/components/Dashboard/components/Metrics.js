import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import formateNumber from '../../../util/formateNumber'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Map, fromJS } from 'immutable'
import Loader from '../../Loader/components/Loader'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'

class Metrics extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { classes, user, title, icon, name } = this.props
    return (
      <Card>
        <CardContent className="container metrics-card-padding">
          <div className="row">
            <div className="col align-self-start metrics-card-title">
              <span className="summary-c-t">{title}</span>
              <h2>
                {user && user.likesCount
                  ? formateNumber(user.likesCount)
                  : '1.6M'}
              </h2>
            </div>
            <div
              className="col align-self-end text-center"
              style={{
                backgroundColor: '#2a7fff',
                borderRadius: 20,
                height: 100,
              }}
            >
              <Fab
                color="inherit"
                size="small"
                aria-label="likes"
                color="primary"
                style={{
                  margin: '20% 35% 5% 35%',
                  backgroundColor: '#fff',
                }}
              >
                {icon}
              </Fab>
              <span className="w-color p-10">{name}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
}

Metrics.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {}

export default withRouter(connect(mapStateToProps, actionsToProps)(Metrics))
