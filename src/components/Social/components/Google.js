import * as actions from '../../../actions/index'

import { List, Map } from 'immutable'
import React, { Component } from 'react'

import Fab from '@material-ui/core/Fab'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'
import firebase from '../../../firebase'
import google from '../../../../assets/social/google.svg'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  avatar: {},
  small: {
    width: 25,
    height: 25,
  },
  fab: {
    width: '300px !important',
    color: '#ffffff !important',
    margin: '15px 0 30px 20px',
  },
})

class Google extends Component {
  auth = async e => {
    e.preventDefault()
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('email')
    await new firebase.auth().signInWithPopup(provider).then((user, error) => {
      if (!error) {
        const data = user.user.providerData[0]
        this.props
          .createOrUpdateUser({
            email: data.email,
            userName: data.displayName,
            photoURL: data.photoURL,
            uid: data.uid,
            phoneNumber: data.phoneNumber,
            providerId: data.providerId,
          })
          .then(user => {
            if (user && user.data.user) {
              this.props.storeUser(user.data.user)
              this.props.history.push('/dashboard')
            }
          })
      } else {
        this.props.history.push('/')
      }
    })
  }

  render() {
    const { classes } = this.props
    return (
      <>
        <Tooltip title="Login With Google" aria-label="Add">
          <Fab
            className={classes.fab}
            onClick={e => this.auth(e)}
            size="medium"
            color="primary"
            aria-label="add"
            variant="extended"
          >
            <img src={google} className={classes.small} />
            &nbsp; Sign In with Google
          </Fab>
        </Tooltip>
      </>
    )
  }
}

Google.propTypes = {
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
  createOrUpdateUser: actions.createOrUpdateUser,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Google)),
)
