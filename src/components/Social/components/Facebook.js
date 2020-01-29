import React, { Component } from 'react'
import * as actions from '../../../actions/index'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from '../../../firebase'
import facebook from '../../../../assets/facebook.svg'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'

class Facebook extends Component {
  auth = async () => {
    await new firebase.auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(async (user, error) => {
        if (error) {
          this.props.history.push('/')
        }
        if (!error) {
          const data = await user.user.providerData[0]
          await this.props.getUser(data.uid).then(async u => {
            if (!u || (u && u.data && !u.data.user)) {
              await this.props.createUser({
                email: data.email,
                userName: data.displayName,
                photoURL: data.photoURL,
                uid: data.uid,
                phoneNumber: data.phoneNumber,
                providerId: data.providerId,
              })
            }
          })
          this.props.isAuthenticated(true)
          this.props.storeUser(data)
          this.props.history.push('/dashboard')
        } else {
          this.props.isAuthenticated(false)
        }
      })
  }

  render() {
    const {} = this.props
    return (
      <>
        <Tooltip title="Login With Facebook" aria-label="Add">
          <Fab size="small" onClick={() => this.auth()} aria-label="Login">
            <Avatar
              aria-haspopup="true"
              alt="Avatar not available"
              src={facebook}
            />
          </Fab>
        </Tooltip>
        {/*<Button onClick={() => this.auth()} variant="contained" size="small">
		            Facebook
		        </Button>*/}
      </>
    )
  }
}

Facebook.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'], Map())
  return {
    user,
  }
}

const actionsToProps = {
  storeUser: actions.storeUser,
  createUser: actions.createUser,
  getUser: actions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Facebook))
