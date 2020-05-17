import * as globalActions from '../../../actions/index'

import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import FollowersView from './FollowersView'
import { Link } from 'react-router-dom'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

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
    if (this.props.match.params.id) {
      await this.props.getUser(this.props.match.params.id)
    }
    if (!this.props.match.params.id && this.props.user) {
      await this.props.getUser(this.props.user._id)
    }
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
      profileUser && profileUser.followers.length > 0 ? true : false
    const viewPath = profileUser ? `/${path}/${profileUser._id}/followers` : '#'
    return (
      <React.Fragment>
        <Card>
          <CardHeader
            title="Followers"
            action={
              hasFollowers ? (
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
          <CardContent className={hasFollowers ? 'p-0' : ''}>
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
