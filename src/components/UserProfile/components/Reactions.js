import * as globalActions from '../../../actions/index'

import { Map, fromJS } from 'immutable'
import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import { withStyles } from '@material-ui/core/styles'
import ReactionsView from './ReactionsView'

const styles = {
  smallAvatar: {
    width: 23,
    height: 23,
  },
  customBadge: {
    top: '90%',
    width: 35,
    height: 35,
    backgroundColor: 'unset !important',
  },
}

class Reactions extends Component {
  constructor(props) {
    super(props)
    // window.previousLocation = this.props.location
    this.state = {
      fallBackTo: this.props.location.pathname,
    }
  }
  async componentDidMount() {
    await this.props.getUser(this.props.match.params.id)
  }

  render() {
    const {
      classes,
      profileUser,
      profileUserError,
      profileUserLoading,
      user,
    } = this.props
    const { fallBackTo } = this.state
    const hasReactions =
      (!profileUserLoading && profileUser && !profileUser.reactions.length) ||
      (!profileUserLoading && !profileUser) ||
      !profileUser
        ? false
        : true
    const viewPath = profileUser ? `/user/reactions` : '#'
    return (
      <React.Fragment>
        <Card>
          <CardHeader
            title="Profile Reactions"
            action={
              <Link className="hyperlink" to={viewPath}>
                View All{' '}
                <b>
                  {formateNumber(
                    profileUser ? profileUser.reactions.length : 0,
                  )}
                </b>
              </Link>
            }
          ></CardHeader>
          <CardContent className={!hasReactions ? '' : 'p-0'}>
            <ReactionsView view="card" fallBackTo={'/incoming'} />
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

Reactions.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const profileUser = state.getIn(['user', 'success'])
  const profileUserLoading = state.getIn(['user', 'loading'], false)
  const profileUserError = state.getIn(['user', 'errors'], Map())
  return {
    profileUser: profileUser ? profileUser.user : undefined,
    profileUserError,
    profileUserLoading,
    user,
  }
}

const actionsToProps = {
  getUser: globalActions.getUser,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Reactions)),
)
