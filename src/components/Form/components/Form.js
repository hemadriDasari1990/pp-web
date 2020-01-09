import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class Form extends Component {
	saveForm = () => {
		//trigger action with received data
	}
	render(){
		return(
			<div>
				{this.props.children}
				<Button size="small" color="primary" onClick={() => this.saveForm()}>
		          Save
		        </Button>
		        <Button size="small" color="default" onClick={() => this.props.cancelForm()}>
		          Cancel
		        </Button>
			</div>
		)
	}
}