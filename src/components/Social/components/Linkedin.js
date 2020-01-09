import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  button:{
    marginRight: 5
  }
});

class Linkedin extends Component{
	render(){
		const { classes } = this.props;
		return(
			<Button className={classes.button} variant="contained" size="small" color="primary">
	            Login With Linkedin
	        </Button>
		)
	}
}

Linkedin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Linkedin);