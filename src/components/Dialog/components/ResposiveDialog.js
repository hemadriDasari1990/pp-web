import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import DialogActions from '@material-ui/core/DialogActions';

class ResponsiveDialog extends Component {
	constructor(props){
		super(props);
		this.state = {
			open: this.props.open
		}
	}

	handleCreate = () => {
		this.setState({
			open: !this.state.open
		});
		this.props.save();
	}

	handleCancel = () => {
		this.setState({
			open: !this.state.open
		});
	}
	render(){
		const { 
			fullScreen, 
			handleClose, 
			title, 
			children,
			createButtonName,
			cancellButtonName
		} = this.props;
		return(
			<React.Fragment>
				<Dialog fullScreen={fullScreen}
		          open={this.state.open}
		          onClose={() => this.handleCancel()}
		          aria-labelledby="responsive-dialog-title"
		        >
		          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
		          {children}
		          <DialogActions>
		            <Button onClick={() => this.handleCreate()} color="primary">
		              {createButtonName}
		            </Button>
		            <Button onClick={() => this.handleCancel()} color="primary" autoFocus>
		              {cancellButtonName}
		            </Button>
		          </DialogActions>
		        </Dialog>
			</React.Fragment>
		)
	}
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);