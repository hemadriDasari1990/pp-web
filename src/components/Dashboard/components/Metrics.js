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
import loved from '../../../../assets/loved.svg'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'

class Metrics extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { classes, user, title, path, name } = this.props
    return (
      <React.Fragment>
        <Card style={{ width: '100%', maxWidth: '100%' }}>
          <CardContent className="pb-10">
            <div className="row">
              <div className="col-lg-6 col-md-10 col-sm-6 col-xs-6">
                <span className="summary-c-t">{title}</span>
                <h2>
                  {user && user.likesCount
                    ? formateNumber(user.likesCount)
                    : '1.6M'}
                </h2>
              </div>
              <div
                className="col-lg-5 col-md-2 col-sm-3 col-xs-3"
                style={{
                  backgroundColor: '#2a7fff',
                  borderRadius: 10,
                  marginTop: -12,
                  marginBottom: -20,
                  marginLeft: 19,
                }}
              >
                <Fab
                  color="inherit"
                  size="small"
                  aria-label="likes"
                  color="primary"
                  style={{
                    margin: '30% 30% 10% 25%',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <Avatar
                    className="b-s"
                    src={path}
                    style={{ height: 30, width: 30 }}
                  />
                </Fab>
                <span className="w-color f-10 text-center">{name}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </React.Fragment>
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
