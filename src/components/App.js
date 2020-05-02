import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import Timeline from './Timeline/components/Timeline'
import * as actions from '../actions/index'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import firebase from '../firebase/index'
import theme from './theme'
import { withStyles } from '@material-ui/core/styles'
import ResponsiveDrawer from './ResponsiveDrawer/components/ResponsiveDrawer'
import CustomizedSnackbars from './Snackbar/components/Snackbar'

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
    this.handleConnectionChange()
    window.addEventListener('online', this.handleConnectionChange)
    window.addEventListener('offline', this.handleConnectionChange)
    await new firebase.auth().onAuthStateChanged(async user => {
      this.setState({
        loading: true,
      })
      if (user) {
        await this.props.getUser(user.providerData[0].uid).then(u => {
          if (u && u.data && u.data.user) {
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

  componentWillUnmount() {
    window.removeEventListener('online', this.handleConnectionChange)
    window.removeEventListener('offline', this.handleConnectionChange)
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline'
    if (condition === 'online') {
      const webPing = setInterval(() => {
        fetch('//google.com', {
          mode: 'no-cors',
        })
          .then(() => {
            this.setState({ isDisconnected: false }, () => {
              return clearInterval(webPing)
            })
          })
          .catch(() => this.setState({ isDisconnected: true }))
      }, 2000)
      return
    }

    return this.setState({ isDisconnected: true })
  }

  // isAuthenticated = flag => {
  //   if (flag && this.props.user) {
  //     this.props.getUsers(this.props.user._id, '')
  //   }
  //   this.setState({
  //     loading: flag,
  //   })
  // }

  componentWillUnMount() {
    // this.unSubscribe()
  }

  // handleSignin = () => {
  //   this.props.history.push('/signin')
  // }

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
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(App)),
)
