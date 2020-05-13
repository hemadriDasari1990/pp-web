import * as actions from '../../../actions/index'

import React, { Component } from 'react'

import Fab from '@material-ui/core/Fab'
import FacebookIcon from '@material-ui/icons/Facebook'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from 'react-redux'
import firebase from '../../../firebase'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  avatar: {},
  small: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  fab: {
    width: '300px !important',
    color: '#ffffff !important',
    margin: '15px 0 30px 20px',
  },
})

class Facebook extends Component {
  auth = async e => {
    e.preventDefault()
    const provider = new firebase.auth.FacebookAuthProvider()
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
            lastActiveTime: Date.now(),
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
        <Tooltip title="Login With Facebook" aria-label="Add">
          <Fab
            className={classes.fab}
            onClick={e => this.auth(e)}
            size="medium"
            color="primary"
            aria-label="add"
            variant="extended"
          >
            <FacebookIcon color="secondary" />
            &nbsp; Sign In with Facebook
          </Fab>
        </Tooltip>
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
  createOrUpdateUser: actions.createOrUpdateUser,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Facebook)),
)
