import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import * as actions from '../../../actions/index'
import { Map, List, fromJS } from 'immutable'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
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
            if (u && u.data && u.data.user) {
              await this.props.storeUser(data)
              this.props.history.push('/dashboard')
            }
            if (!u) {
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

Facebook.propTypes = {
  classes: PropTypes.object.isRequired,
}

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
