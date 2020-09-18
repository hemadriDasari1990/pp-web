import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import Grow from '@material-ui/core/Grow'
import SkeletonMetrics from '../../Skeletons/components/Metrics'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import { withRouter } from 'react-router-dom'

class Metrics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.timer = null
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 500)
  }

  componentWillUnmount() {
    this.timer ? clearTimeout(this.timer) : null
  }

  render() {
    const { classes, user, title, icon, name, count } = this.props
    const { loading } = this.state
    return (
      <React.Fragment>
        {loading ? (
          <SkeletonMetrics />
        ) : (
          <Card className="m-0">
            <CardContent>
              <div className="row">
                <div className="col align-self-start text-center">
                  <Grow in={true} timeout={2000}>
                    <Fab
                      size="small"
                      color="primary"
                      style={{
                        margin: '10% 30% 5% 30%',
                      }}
                    >
                      {icon}
                    </Fab>
                  </Grow>
                  <span className="text-center title-color p-10">{name}</span>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="col text-center metrics-card-title">
                  <span className="title-color">{title}</span>
                  <Grow in={true} timeout={2000}>
                    <h3 className="title-value-color f-w-600">
                      {count > 0 ? formateNumber(count) : 0}
                    </h3>
                  </Grow>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
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
