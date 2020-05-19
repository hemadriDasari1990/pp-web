import * as actions from '../actions'
import * as globalActions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { Link } from 'react-router-dom'
import Loader from '../../Loader/components/Loader'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const FolloweesView = lazy(() => import('./FolloweesView'))

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

class Followees extends Component {
  async componentDidMount() {
    if (this.props.match.params.id) {
      await this.props.getUser(this.props.match.params.id)
    }
    if (!this.props.match.params.id && this.props.user) {
      await this.props.getUser(this.props.user._id)
    }
  }

  viewAll = type => {
    this.props.saveActionState(type)
  }

  render() {
    const {
      classes,
      profileUser,
      profileUserError,
      profileUserLoading,
      user,
      path,
    } = this.props
    const hasFollowees =
      profileUser && profileUser.followees.length > 0 ? true : false
    return (
      <Suspense fallback={<Loader />}>
        <Card>
          <CardHeader
            title="Followees"
            action={
              hasFollowees ? (
                <Link
                  className="hyperlink"
                  to="#"
                  onClick={() => this.viewAll('followees')}
                >
                  View All{' '}
                  <b>
                    {formateNumber(
                      profileUser ? profileUser.followees.length : 0,
                    )}
                  </b>
                </Link>
              ) : null
            }
          ></CardHeader>
          <CardContent className={hasFollowees ? 'p-0' : ''}>
            <FolloweesView view="card" />
          </CardContent>
        </Card>
      </Suspense>
    )
  }
}

Followees.propTypes = {}

const mapStateToProps = state => {
  const profileUser = state.getIn(['user', 'success'])
  const profileUserLoading = state.getIn(['user', 'loading'], false)
  const profileUserError = state.getIn(['user', 'errors'], Map())
  const user = state.getIn(['user', 'data'])
  return {
    profileUser: profileUser ? profileUser.user : undefined,
    profileUserError,
    profileUserLoading,
    user,
  }
}

const actionsToProps = {
  getUser: globalActions.getUser,
  saveActionState: actions.saveActionState,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Followees)),
)
