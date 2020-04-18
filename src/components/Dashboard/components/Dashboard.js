import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PostList from './PostList'
import * as actions from '../../../actions/index'
import Tooltip from '@material-ui/core/Tooltip'
import { Map, fromJS } from 'immutable'
import Summary from './Summary'
import arrowIcon from '../../../../assets/arrow.svg'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Avatar from '@material-ui/core/Avatar'
import Metrics from './Metrics'
import LoveIcon from '../../SvgIcons/components/Love'
import LikeIcon from '../../SvgIcons/components/Like'
import PreferencesIcon from '../../SvgIcons/components/Preferences'

const styles = theme => ({})

class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }

  componentDidMount() {}

  handleTimeline = event => {
    this.props.history.push('/incoming')
  }

  render() {
    const {} = this.state
    const { user, classes } = this.props
    return (
      <React.Fragment>
        <div className="row">
          <div className="text-center col-lg-3 col-md-2 col-sm-12 col-xs-12">
            <h4>Hi, {user ? user.userName : ''}!</h4>
            <p>Welcome to your social platform</p>
            <Fab
              onClick={() => this.handleTimeline()}
              size="small"
              color="primary"
              aria-label="add"
              variant="extended"
              className="align-items-center mb-10"
            >
              View Timeline <Avatar src={arrowIcon} className="b-s b-w-arrow" />
            </Fab>
          </div>
          <div className="col-lg-3 col-md-5 col-sm-12 col-xs-12">
            <Summary type="incoming" title="Incoming Summary" />
          </div>
          <div className="col-lg-3 col-md-5 col-sm-12 col-xs-12">
            <Summary type="outgoing" title="Outgoing Summary" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-2 col-sm-12 col-xs-12"></div>
          <div className="col-lg-3 col-md-3 col-sm col-xs-12">
            <Metrics
              icon={
                <LikeIcon style={{ width: 35, height: 35 }} color="#2a7fff" />
              }
              title="People Like You"
              name="Profile Like"
            />
          </div>
          <div className="col-lg-3 col-md-3 col-sm col-xs-12">
            <Metrics
              icon={<LoveIcon className="icon-display" color="#2a7fff" />}
              title="People Love You"
              name="Profile Love"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-2 col-sm-12 col-xs-12"></div>
          <div className="col-lg-3 col-md-3 col-sm col-xs-12">
            <Metrics
              icon={
                <PreferencesIcon
                  style={{ width: 40, height: 40 }}
                  color="#2a7fff"
                />
              }
              title="Times Updated"
              name="Preferences"
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

DashBoard.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])

  return {
    user,
  }
}

const actionsToProps = {
  getUser: actions.getUser,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(DashBoard)),
)
