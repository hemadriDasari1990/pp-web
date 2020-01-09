import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import * as actions from '../actions';
import {Map, fromJS} from 'immutable';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import CustomizedSnackbars from '../../Snackbar/components/Snackbar';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

class Preferences extends Component{
	constructor(props){
		super(props);
		this.state = {
			open: true,
			message: '',
			error: false,
			status: '',
			positive: '',
			negative: '',
			advice: '',
			buttonName: 'Save',
			count: 0,
			id: '',
			data: {}
		}
	}

	async componentDidMount(){
		const { userPreferences, user } = this.props;
		await this.props.getUserPreferences(user.uid).then(res => {
			if(res){
				const data = res.data.pref[0];
				if(data){
					this.setState({
						positive: data.positive,
						negative: data.negative,
						advice: data.advice,
						buttonName: 'Update',
						count: data.count,
						id: data._id,
						data
					});
				}
			}
		});
	}
	handleInput = event => {
		const { positive, negative, advice} = this.state;
		this.setState({ 
	    	[event.target.name]: event.target.value 
	    });
    }

    handleClose = () => {
    	this.setState({
    		open: !this.state.open
    	});
    	this.props.openPreferencesForm();
    }

    handleSave = () => {
    	const { positive, negative, advice, error, buttonName, id, data } = this.state;
    	const { user } = this.props;
    	if(!positive || !negative ||  !advice){
    		this.setState({
    			message: 'Please choose all preferences',
    			status: 'error',
    			error: !error
    		});
    	}else{
    		this.setState({
    			message: '',
    			status: '',
    			error: false,
    			open: false
    		});
    		if(buttonName === 'Update'){
    			if(data.positive == positive && data.negative == negative && data.advice == advice){
    				this.setState({
		    			message: 'Nothing has changed to perform update',
		    			status: 'error',
		    			error: !error,
		    			open: true
		    		});
    			}else{
    				this.props.updateUserPreferences({
						positive,
						negative,
						advice,
						uid: user.uid,
						id: id
					});
    			}
    		}else{
    			this.props.savePreferences({
					positive,
					negative,
					advice,
					uid: user.uid,
					count: 1
				});
    		}

    	}
		this.props.openPreferencesForm();
	}    

	render(){
		const { 
			user, 
			savePreferencesLoading, 
			savePreferencesError, 
			savePreferencesSuccess, 
			updatePreferencesLoading, 
			updatePreferencesError,
			updatePreferencesSuccess 
		} = this.props;
		const { 
			positive, 
			negative, 
			advice, 
			open, 
			message, 
			status, 
			error, 
			buttonName, 
			count 
		} = this.state;
		return(
			<React.Fragment>
				<Dialog
		          open={open}
		          onClose={() => this.handleClose()}
		          aria-labelledby="responsive-dialog-title"
		        >
		          <DialogTitle id="responsive-dialog-title">Preferences</DialogTitle>
		          <DialogContent>
		            <DialogContentText>
			            Save your preferences so that people will think twice before posting something for you.
				    </DialogContentText>
				    <br/>
				    <List>
				    	<ListItem>
				    		<ListItemIcon>
					        </ListItemIcon>
					        <ListItemText primary="Would you like to hear positive?" />
					        <ListItemSecondaryAction>
					          <RadioGroup
					            aria-label="positive"
					            name="positive"
					            value={positive}
					            onChange={this.handleInput}
					            row
					          >
					            <FormControlLabel
					              value="yes"
					              control={<Radio color="primary" />}
					              label="Yes"
					            />
					            <FormControlLabel
					              value="no"
					              control={<Radio color="secondary" />}
					              label="No"
					            />
					          </RadioGroup>
					        </ListItemSecondaryAction>
        				</ListItem>
        				<ListItem>
				    		<ListItemIcon>
					        </ListItemIcon>
					        <ListItemText primary="Would you like to hear negative?" />
					        <ListItemSecondaryAction>
					          <RadioGroup
					            aria-label="negative"
					            name="negative"
					            value={negative}
					            onChange={this.handleInput}
					            row
					          >
					            <FormControlLabel
					              value="yes"
					              control={<Radio color="primary" />}
					              label="Yes"
					            />
					            <FormControlLabel
					              value="no"
					              control={<Radio color="secondary" />}
					              label="No"
					            />
					          </RadioGroup>
					          </ListItemSecondaryAction>
	        				</ListItem>
	        				<ListItem>
					    		<ListItemIcon>
						        </ListItemIcon>
						        <ListItemText primary="Would you like to hear advice?" />
						        <ListItemSecondaryAction>
						          <RadioGroup
						            aria-label="advice"
						            name="advice"
						            value={advice}
						            onChange={this.handleInput}
						            row
						          >
						            <FormControlLabel
						              value="yes"
						              control={<Radio color="primary" />}
						              label="Yes"
						            />
						            <FormControlLabel
						              value="no"
						              control={<Radio color="secondary" />}
						              label="No"
						            />
						          </RadioGroup>
					          </ListItemSecondaryAction>
        				</ListItem>
    				</List>
    				<Badge color="secondary" badgeContent={count}>
				        <Typography>Times you updated your preferences </Typography>
				      </Badge>
		          </DialogContent>
		          <DialogActions>
		            <Badge badgeContent={count}>
						<Fab variant="extended" color="primary" size="small" onClick={() => this.handleSave()}>
		              		{buttonName}
		            	</Fab>
		            </Badge>
		            <Fab variant="extended" color="secondary" size="small" onClick={() => this.handleClose()}>
		              Cancel
		            </Fab>
		          </DialogActions>
		        </Dialog>
		        { !savePreferencesLoading && savePreferencesSuccess && savePreferencesSuccess.size > 0 ? <CustomizedSnackbars open={true} message={savePreferencesSuccess.get('message')} status='success' />: null}
		        { error && <CustomizedSnackbars open={open} message={message} status={status} />}
		        { !updatePreferencesLoading && updatePreferencesSuccess && updatePreferencesSuccess.size > 0 ? <CustomizedSnackbars open={true} message={updatePreferencesSuccess.get('message')} status='success' />: null}
			</React.Fragment>
		)
	}
}

Preferences.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'], Map());
  const userPreferences = state.getIn(['Post', 'preferences', 'get']);
  const savePreferencesLoading = state.getIn(['Post', 'preferences', 'save', 'loading'], false);
	const savePreferencesError = state.getIn(['Post', 'preferences', 'save', 'errors'], Map());
	const savePreferencesSuccess = state.getIn(['Post', 'preferences', 'save', 'success'], Map());
	const updatePreferencesLoading = state.getIn(['Post', 'preferences', 'update', 'loading'], false);
	const updatePreferencesError = state.getIn(['Post', 'preferences', 'update', 'errors'], Map());
	const updatePreferencesSuccess = state.getIn(['Post', 'preferences', 'update', 'success'], Map());
  return {
    user,
    userPreferences,
    savePreferencesLoading,
    savePreferencesError,
    savePreferencesSuccess
  };
}

const actionsToProps = {
  savePreferences: actions.savePreferences,
  getUserPreferences: actions.getUserPreferences,
  updateUserPreferences: actions.updateUserPreferences,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Preferences))