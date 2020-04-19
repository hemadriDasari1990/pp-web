import React, { Component } from 'react'
import * as actions from '../../../actions/index'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from '../../../firebase'
import facebook from '../../../../assets/social/facebook.svg'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

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
              await this.props
                .createUser({
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
                  }
                })
            } else {
              this.props.storeUser(u.data.user)
            }
          })
          // this.props.isAuthenticated(true)
          this.props.history.push('/dashboard')
        } else {
          // this.props.isAuthenticated(false)
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
            <Avatar src={facebook} className={classes.small} />
            Sign In with Facebook
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

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Facebook)),
)
