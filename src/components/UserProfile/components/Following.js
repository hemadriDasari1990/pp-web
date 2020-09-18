import * as actions from '../actions'
import * as globalActions from '../../../actions/index'

import React, { Component, Suspense, lazy } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { Map } from 'immutable'
import SkeletonListCard from '../../Skeletons/components/ListCard'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const FollowingView = lazy(() => import('./FollowingView'))

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

class Following extends Component {
  componentDidMount() {
    // if (this.props.match.params.id) {
    //   await this.props.getUser(this.props.match.params.id)
    // }
    // if (!this.props.match.params.id && this.props.user) {
    //   await this.props.getUser(this.props.user._id)
    // }
  }

  viewAll = type => {
    // this.props.saveActionState(type)
    this.props.history.push(type)
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
      <Suspense>
        {profileUserLoading ? (
          <SkeletonListCard />
        ) : (
          <Card>
            <CardHeader
              title="Following"
              action={
                hasFollowees ? (
                  <span
                    className="hyperlink cursor"
                    onClick={() => this.viewAll('/followees')}
                  >
                    View All{' '}
                    <b>
                      {formateNumber(
                        profileUser ? profileUser.followees.length : 0,
                      )}
                    </b>
                  </span>
                ) : null
              }
            ></CardHeader>
            <CardContent className={hasFollowees ? 'p-0' : 'p-3'}>
              <FollowingView view="card" />
            </CardContent>
          </Card>
        )}
      </Suspense>
    )
  }
}

Following.propTypes = {}

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
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Following)),
)
