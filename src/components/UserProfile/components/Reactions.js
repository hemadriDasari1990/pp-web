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

const ReactionsView = lazy(() => import('./ReactionsView'))

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
    if (this.props.match.params.id) {
      await this.props.getUser(this.props.match.params.id)
    }
    if (!this.props.match.params.id && this.props.user) {
      await this.props.getUser(this.props.user._id)
    }
  }

  viewAll = path => {
    // this.props.saveActionState();
    this.props.history.push(path)
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
    const { fallBackTo } = this.state
    const viewPath = profileUser ? `/${path}/${profileUser._id}/reactions` : '#'
    const hasReactions =
      profileUser && profileUser.reactions.length > 0 ? true : false
    console.log('profileUser', profileUser)
    return (
      <Suspense fallback={<Loader />}>
        <Card>
          <CardHeader
            title="Profile Reactions"
            action={
              hasReactions ? (
                <Link
                  className="hyperlink"
                  to="#"
                  onClick={() => this.viewAll(viewPath)}
                >
                  View All{' '}
                  <b>
                    {formateNumber(
                      profileUser ? profileUser.reactions.length : 0,
                    )}
                  </b>
                </Link>
              ) : null
            }
          ></CardHeader>
          <CardContent className={hasReactions ? 'p-0' : ''}>
            <ReactionsView view="card" fallBackTo={'/timeline/incoming'} />
          </CardContent>
        </Card>
      </Suspense>
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
