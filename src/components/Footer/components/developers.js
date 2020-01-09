import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import rajesh from '../../../../assets/rajesh.jpg';
import hemadri from '../../../../assets/hemadri.jpg';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = {
  avatar: {
    margin: 10,
    width: 300,
    height: 300,
  },
  root: {
  	marginTop: 0,
    padding: 50,
    width: '100%',
    textAlign: 'center'
  },
};

class Developers extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}

	render(){
		const { classes } = this.props;
		return(
			<React.Fragment>
				{/*<Paper className={classes.root}>
			        <Typography variant="h2" component="h3">
			          We are core developers of Peoples Post
			        </Typography>
			        <Typography component="p">
			          
			        </Typography>
		        </Paper>
				<div>
					<Grid container justify="center" alignItems="center">
				      <Avatar key={1} alt="Image not available" src={rajesh} className={classes.avatar}/>
				      <Avatar key={2} alt="Image not available" src={hemadri} className={classes.avatar}/>
				    </Grid>
				</div>*/}
				{/*<div className="relative w-full false">
				<div className="relative w-full w-max-770 p-h-15 p-v-25 m-auto"><div className="fl fl-center fl-wrap">
<img className="m-r-30 h-250 b-r-4" alt="Dev Ittycheria, President and CEO" src={rajesh} /><div className="w-max-460">
<h5 id="dev-ittycheria-president--ceo">Dev Ittycheria, President &amp; CEO</h5><p><a target="_target" href="https://www.linkedin.com/in/dittycheria">LinkedIn</a> |  <a target="_target" href="https://twitter.com/dittycheria">Twitter</a></p><p>Dev Ittycheria has over two decades of experience as an entrepreneur, investor, and leader specializing in high-growth software companies. Currently, he is the President &amp; CEO of MongoDB, where he led its IPO in 2017—the first public offering of a database company in over 26 years. Under Dev's leadership, MongoDB has released innovative products such as Atlas, its global cloud database, acquired thousands of customers, rapidly expanded operations around the world, grown its business faster and delivered better financial performance than any comparable company in its sector. Previously, Dev was Managing Director at OpenView Venture Partners, Venture Partner at Greylock Partners, and CEO/Co-founder of BladeLogic, which was acquired by BMC for $900 million. Following the acquisition he served as President of BMC. Dev founded his first technology company in 1998, and his leadership and board roles have resulted in 4 IPOs and 2 significant acquisitions. Dev graduated from Rutgers University with a B.S. in Electrical Engineering, was honored with the Medal of Excellence and was recognized by the School of Engineering as one of its "2010 Alumnus of the Year."</p></div></div></div>
			</div>*/}</React.Fragment>
		)
	}
}

export default withRouter(withStyles(styles)(Developers));