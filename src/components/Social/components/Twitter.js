import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import * as actions from '../../../actions/index'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from '../../../firebase'

const styles = theme => ({
  button: {
    marginRight: 5,
  },
})

class Twitter extends Component {
  auth = () => {
    new firebase.auth()
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(async (user, error) => {
        if (error) {
        } else {
          const data = await user.user.providerData[0]
          await this.props.createUser({
            email: data.email,
            userName: data.displayName,
            photoURL: data.photoURL,
            uid: data.uid,
            phoneNumber: data.phoneNumber,
            providerId: data.providerId,
          })
          this.props.storeUser(data)
        }
      })
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Button
          className={classes.button}
          onClick={() => this.auth()}
          variant="contained"
          size="small"
          color="primary"
        >
          Login With Twitter
        </Button>
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
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Twitter)),
)
