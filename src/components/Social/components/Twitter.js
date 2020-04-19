import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import * as actions from '../../../actions/index'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from '../../../firebase'
import twitter from '../../../../assets/social/twitter.svg'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'

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
        <Tooltip title="Login With Twitter" aria-label="Add">
          <Fab
            className={classes.fab}
            onClick={e => this.auth(e)}
            size="medium"
            color="primary"
            aria-label="add"
            variant="extended"
          >
            <Avatar src={twitter} className={classes.small} />
            Sign In with Twitter
          </Fab>
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
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Twitter)),
)
