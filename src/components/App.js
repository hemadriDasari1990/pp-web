import * as actions from '../actions/index'

import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import React, { Component } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import CustomizedSnackbars from './Snackbar/components/Snackbar'
import ResponsiveDrawer from './ResponsiveDrawer/components/ResponsiveDrawer'
import { connect } from 'react-redux'
import firebase from '../firebase/index'
import theme from './theme'
import { withStyles } from '@material-ui/core/styles'
import { Map } from 'immutable'
import Loader from './Loader/components/Loader'

const styles = theme => ({})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isDisconnected: false,
      showSnackbar: false,
      error: false,
    }
  }

  async componentDidMount() {
    this.whenUserLevesThePage()
    this.handleConnectionChange()
    window.addEventListener('online', this.handleConnectionChange)
    window.addEventListener('offline', this.handleConnectionChange)
    await new firebase.auth().onAuthStateChanged(async (user, err) => {
      if (user) {
        await this.props
          .getUser(user.providerData[0].uid)
          .then(async u => {
            if (u && u.data && u.data.user) {
              await this.props.updateUser(u.data.user._id, {
                lastActiveTime: Date.now(),
              })
              this.props.storeUser(u.data.user)
              this.props.getUsers(u.data.user._id, '')
              this.setState({
                showSnackbar: !this.state.showSnackbar,
                error: false,
                loading: false,
              })
              this.timer = setTimeout(() => {
                this.props.history.push('/dashboard')
              }, 1000)
            } else {
              this.props.storeUser(null)
              this.props.history.push('/')
            }
          })
          .catch(err => {
            this.setState({
              loading: false,
              error: !this.state.error,
              showSnackbar: !this.state.showSnackbar,
            })
          })
      }
      if (err) {
        this.setState({
          loading: false,
          error: !this.state.error,
          showSnackbar: !this.state.showSnackbar,
        })
      }
    })
    this.setState({
      loading: false,
    })
  }

  whenUserLevesThePage() {
    window.onbeforeunload = async () => {
      await this.props.updateUser(this.props.user._id, {
        lastActiveTime: Date.now(),
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleConnectionChange)
    window.removeEventListener('offline', this.handleConnectionChange)
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline'
    if (condition === 'online') {
      this.setState({ isDisconnected: false }, () => {})
    } else {
      this.setState({ isDisconnected: true })
    }
  }

  render() {
    const { loading, isDisconnected, showSnackbar, error } = this.state
    const {
      user,
      classes,
      createOrUpdateUserSuccess,
      createOrUpdateUserLoading,
      createOrUpdateUserErrors,
    } = this.props
    const authenticated = user ? true : false
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {isDisconnected && (
            <CustomizedSnackbars
              open={true}
              message="You are not connected to the internet"
              status="warning"
            />
          )}
          {!error &&
            createOrUpdateUserSuccess &&
            createOrUpdateUserSuccess.size > 0 &&
            createOrUpdateUserSuccess.get('message') && (
              <CustomizedSnackbars
                open={showSnackbar}
                message={createOrUpdateUserSuccess.get('message')}
                status={'success'}
              />
            )}
          {!error &&
            createOrUpdateUserErrors &&
            createOrUpdateUserErrors.size > 0 &&
            createOrUpdateUserErrors.get('message') && (
              <CustomizedSnackbars
                open={showSnackbar}
                message={createOrUpdateUserErrors.get('message')}
                status={'error'}
              />
            )}
          {error && (
            <CustomizedSnackbars
              open={showSnackbar}
              message="A network error (such as timeout, interrupted connection or unreachable host) has occurred. Please try again"
              status={'error'}
            />
          )}

          <ResponsiveDrawer
            loading={loading}
            authenticated={authenticated}
            theme={{ direction: 'rtl' }}
          />
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const createOrUpdateUserSuccess = state.getIn(
    ['user', 'create-or-update', 'success'],
    Map(),
  )
  const createOrUpdateUserLoading = state.getIn(
    ['user', 'create-or-update', 'loading'],
    false,
  )
  const createOrUpdateUserErrors = state.getIn(
    ['user', 'create-or-update', 'errors'],
    Map(),
  )
  return {
    user,
    createOrUpdateUserSuccess,
    createOrUpdateUserLoading,
    createOrUpdateUserErrors,
  }
}

const actionsToProps = {
  storeUser: actions.storeUser,
  getUsers: actions.getUsers,
  getUser: actions.getUser,
  updateUser: actions.updateUser,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(App)),
)
