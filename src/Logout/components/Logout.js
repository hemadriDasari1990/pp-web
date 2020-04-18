import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { logout } from '../firebase/auth'
import * as actions from '../../../actions/index'

class Logout extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
    }
  }

  componentDidMount() {
    logout.then((user, error) => {
      localStorage.removeItem('authUser')
      this.props.userLogout()
      this.setState({ redirect: true })
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div
        style={{
          textAlign: 'center',
          position: 'absolute',
          top: '25%',
          left: '50%',
        }}
      >
        <h3>Logging Out</h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const actionsToProps = {
  userLogout: actions.userLogout,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Logout))
