import * as actions from '../../../actions/index'

import { List, Map } from 'immutable'
import React, { Component } from 'react'

import ArrowIcon from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'
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
    margin: '15px 0 30px 20px',
  },
})

class Google extends Component {
  auth = e => {
    e.preventDefault()
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('email')
    new firebase.auth().signInWithPopup(provider).then((user, error) => {
      if (!error) {
        const data = user.user.providerData[0]
        this.props.createOrUpdateUser({
          email: data.email,
          userName: data.displayName,
          photoURL: data.photoURL,
          uid: data.uid,
          phoneNumber: data.phoneNumber,
          providerId: data.providerId,
          lastActiveTime: Date.now(),
        })
        // .then(user => {
        //   if (user && user.data.user) {
        //     // this.props.storeUser(user.data.user)
        //     // this.props.history.push('/dashboard')
        //   }
        // })
      }
    })
  }

  render() {
    const { classes } = this.props
    return (
      <>
        <Tooltip title="Login With Google" aria-label="Add">
          <Button
            className={classes.fab}
            onClick={e => this.auth(e)}
            size="medium"
            color="primary"
            aria-label="add"
            variant="contained"
          >
            <img src={google} className={classes.small} />
            Sign In with Google <ArrowIcon color="secondary" />
          </Button>
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
