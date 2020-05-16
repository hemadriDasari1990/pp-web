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
import FollowersView from './FollowersView'

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

class Followers extends Component {
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
      path,
    } = this.props
    const hasFollowers =
      (!profileUserLoading && profileUser && !profileUser.followers.length) ||
      (!profileUserLoading && !profileUser) ||
      !profileUser
        ? false
        : true
    const viewPath = profileUser ? `/${path}/${profileUser._id}/followers` : '#'
    return (
      <React.Fragment>
        <Card>
          <CardHeader
            title="Followers"
            action={
              profileUser && profileUser.followers.length > 0 ? (
                <Link className="hyperlink" to={viewPath}>
                  View All{' '}
                  <b>
                    {formateNumber(
                      profileUser ? profileUser.followers.length : 0,
                    )}
                  </b>
                </Link>
              ) : null
            }
          ></CardHeader>
          <CardContent className={!hasFollowers ? '' : 'p-0'}>
            <FollowersView view="card" fallBackTo={'/timeline/incoming'} />
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

Followers.propTypes = {}

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
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Followers)),
)
