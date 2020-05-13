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

const styles = theme => ({})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isDisconnected: false,
    }
  }

  async componentDidMount() {
    this.whenUserLevesThePage()
    this.handleConnectionChange()
    window.addEventListener('online', this.handleConnectionChange)
    window.addEventListener('offline', this.handleConnectionChange)
    await new firebase.auth().onAuthStateChanged(async user => {
      this.setState({
        loading: true,
      })
      if (user) {
        await this.props.getUser(user.providerData[0].uid).then(async u => {
          if (u && u.data && u.data.user) {
            await this.props.updateUser(u.data.user._id, {
              lastActiveTime: Date.now(),
            })
            this.props.storeUser(u.data.user)
            this.props.getUsers(u.data.user._id, '')
            this.props.history.push('/dashboard')
          } else {
            this.props.storeUser(null)
            this.props.history.push('/')
          }
        })
      }
      this.setState({
        loading: false,
      })
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
      return
    }

    return this.setState({ isDisconnected: true })
  }

  render() {
    const { loading, isDisconnected } = this.state
    const { user, classes } = this.props
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
          <ResponsiveDrawer
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
  return {
    user,
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
