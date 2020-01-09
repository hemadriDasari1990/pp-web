import React, { Component } from 'react'
import * as actions from '../../../actions/index';
import firebase from '../../../firebase';
import { BrowserRouter as Router, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import CustomizedSnackbars from '../../Snackbar/components/Snackbar';

class Logout extends Component {
  constructor() {
    super()
    this.state = {
      logout: false,
      message: '',
      status: ''
    }
  }

  componentDidMount() {
    new firebase.auth().signOut().then(async (user, error) => {
      if(user){
        await this.props.userLogout();
        this.setState({ logout: true, message: 'Logout Successfull', status: 'success' });
        this.props.history.push('/home');
      }

      if(error){
        this.setState({ logout: false, message: 'Error while logging out. Please try again!', status: 'error' });
      }
    });
  }

  render() {
    const { logout, message, status } = this.state;

    return (
      <React.Fragment>
        {
          logout && <CustomizedSnackbars message={message} status={status} />
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {

  return {

  };
}

const actionsToProps = {
  userLogout: actions.userLogout
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Logout));