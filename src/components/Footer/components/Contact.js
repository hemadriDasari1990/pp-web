import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter, Switch } from 'react-router-dom';

class Contact extends Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	render(){
		return(
			<div className="content">
				<div>
					<h1>Contact</h1>
					<p>Read, write and share stories</p>
				</div>
			</div>
		)
	}
}

export default withRouter(Contact);