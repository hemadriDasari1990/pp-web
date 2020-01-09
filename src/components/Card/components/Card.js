import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Code from '@material-ui/icons/Code';
import Tooltip from '@material-ui/core/Tooltip';
import Phone from '@material-ui/icons/Phone';
import Badge from '@material-ui/core/Badge';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  actions:{
  	justifyContent: 'space-between'
  }
};

class CardComponent extends Component {
	render(){
		const { classes } = this.props;
		return(
			<Card className={classes.card}>
			    <CardActionArea >
			        <CardMedia
			          component="img"
			          alt="Contemplative Reptile"
			          className={classes.media}
			          height="140"
			          image="https://lh6.googleusercontent.com/of53xqd-Qnv4MKcvHlfXxWwwqLBxu68dH7WuSBmUPH7UxfT1bFY-uGBjzEVnz1wrEANaPWCIFQ=w1200"
			        />
			      </CardActionArea>
		      <CardActions className={classes.actions}>
		        <Button size="small" color="primary">
		          {this.props.name}
		        </Button>
		        <span>Total Users: 1.5m</span>
		        {/*<Tooltip title={this.props.code} aria-label="Add">
		        	<Badge badgeContent={this.props.code} color="primary">
	                  <Code />
	                </Badge>
			    </Tooltip>
			    <Tooltip title={this.props.phCode} aria-label="Add">
				    <Badge badgeContent={this.props.phCode} color="primary">
	                  <Phone />
	                </Badge>
			    </Tooltip>*/}
		      </CardActions>
		    </Card>
		)
	}
}

CardComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardComponent);