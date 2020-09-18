import * as actions from '../../../actions/index'

import React, { Component } from 'react'

import ArrowIcon from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import TwitterIcon from '@material-ui/icons/Twitter'
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

class Twitter extends Component {
  auth = e => {
    e.preventDefault()
    new firebase.auth()
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then((user, error) => {
        if (!error) {
          const data = user.user.providerData[0]
          this.props.createOrUpdateUser({
            email: user.additionalUserInfo.profile.email,
            userName: data.displayName,
            photoURL: data.photoURL,
            uid: data.uid,
            phoneNumber: data.phoneNumber,
            providerId: data.providerId,
            lastActiveTime: Date.now(),
          })
          // .then(user => {
          //   if (user && user.data.user) {
          //     this.props.storeUser(user.data.user)
          //     this.props.history.push('/dashboard')
          //   }
          // })
        }
      })
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Tooltip title="Login With Twitter" aria-label="Add">
          <Button
            className={classes.fab}
            onClick={e => this.auth(e)}
            size="medium"
            aria-label="add"
            variant="contained"
          >
            <TwitterIcon color="secondary" />
            &nbsp; Sign In with Twitter <ArrowIcon color="secondary" />
          </Button>
        </Tooltip>
      </React.Fragment>
    )
  }
}

Twitter.propTypes = {
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
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Twitter)),
)
