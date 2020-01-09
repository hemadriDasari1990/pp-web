import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as actions from '../../../actions/index';
import {Map, List, fromJS} from 'immutable';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import CustomizedSnackbars from '../../Snackbar/components/Snackbar';
import firebase from '../../../firebase';

class Google extends Component {
	auth = async () => {
	    await new firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
	      .then(async (user, error) => {
	        if (error) {
		        this.props.history.push('/');
	        } else {
	        	const data = await user.user.providerData[0];
	        	await this.props.getUser(data.uid).then(async u => {
	        		if(u && u.data && u.data.user){
	        			await this.props.storeUser(data);
			        	this.props.history.push('/dashboard');
	        		} else {
	        			await this.props.createUser({
			        		email: data.email,
			        		userName: data.displayName,
			        		photoURL: data.photoURL,
			        		uid: data.uid,
			        		phoneNumber: data.phoneNumber,
			        		providerId: data.providerId
			        	});
	        		}
	        	});
	        }
	      });
	  }

	render(){
		const { } = this.props;
		return(
			<React.Fragment>
				<Button onClick={() => this.auth()} variant="contained" size="small">
		            Google
		        </Button>
		    </React.Fragment>
		)
	}
}

Google.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'], Map());
  const createUserloading = state.getIn(['user', 'create', 'loading'], false);
  const createUserSuccess = state.getIn(['user', 'create', 'success'], List());
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
    createUserErrors
  };
}

const actionsToProps = {
  storeUser: actions.storeUser,
  createUser: actions.createUser,
  getUser: actions.getUser
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Google));