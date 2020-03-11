import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import * as actions from '../../../actions/index'
import { Map, List } from 'immutable'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from '../../../firebase'
import google from '../../../../assets/google.svg'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'

const styles = theme => ({
  avatar: {},
})

class Google extends Component {
  auth = async () => {
    await new firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (user, error) => {
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
              alert('yes working', u)
              this.props.storeUser(u.data.user)
            }
          })
          this.props.isAuthenticated(true)
          this.props.history.push('/dashboard')
        } else {
          this.props.isAuthenticated(false)
        }
      })
  }

  render() {
    const { classes } = this.props
    return (
      <>
        <Tooltip title="Login With Google" aria-label="Add">
          <Fab size="small" onClick={() => this.auth()} aria-label="Login">
            <Avatar
              aria-haspopup="true"
              alt="Avatar not available"
              src={google}
            />
          </Fab>
        </Tooltip>
        {/*<Button onClick={() => this.auth()} variant="contained" size="small">
		            Google
		        </Button>*/}
      </>
    )
  }
}

Google.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'], Map())
  const createUserloading = state.getIn(['user', 'create', 'loading'], false)
  const createUserSuccess = state.getIn(['user', 'create', 'success'], List())
  // let success = '';
  //  if(createUserSuccess.size > 0){
  //     success = createUserSuccess.get("message");
  // }
  const createUserErrors = state.getIn(['user', 'create', 'errors'], List())
  // if(createUserErrors.size > 0){
  //     errors = createUserErrors.get("error");
  // }else{
  //   errors = ''
  // }
  return {
    user,
    createUserloading,
    createUserSuccess,
    createUserErrors,
  }
}

const actionsToProps = {
  storeUser: actions.storeUser,
  createUser: actions.createUser,
  getUser: actions.getUser,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Google)),
)
