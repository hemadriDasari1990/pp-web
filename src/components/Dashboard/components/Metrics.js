import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
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
    const { classes, user, title, icon, name, count } = this.props
    return (
      <Card>
        <CardContent className="container metrics-card-padding">
          <div className="row">
            <div className="col align-self-start text-center">
              <Fab
                color="inherit"
                size="small"
                aria-label={name}
                color="primary"
                style={{
                  margin: '15% 30% 5% 30%',
                  backgroundColor: '#2a7fff',
                }}
              >
                {icon}
              </Fab>
              <span className="text-center p-10">{name}</span>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className="col text-center metrics-card-title">
              <span>{title}</span>
              <h3 className="f-w-600">
                {count > 0 ? formateNumber(count) : 0}
              </h3>
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
