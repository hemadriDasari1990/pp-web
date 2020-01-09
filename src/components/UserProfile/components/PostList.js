import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Code from '@material-ui/icons/Code';
import Tooltip from '@material-ui/core/Tooltip';
import Phone from '@material-ui/icons/Phone';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import LikeIcon from '@material-ui/icons/ThumbUp';
import DisLikeIcon from '@material-ui/icons/ThumbDown';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import PublicIcon from '@material-ui/icons/Public';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Chip from '@material-ui/core/Chip';
import * as actions from '../actions';
import {Map, fromJS} from 'immutable';
import { BrowserRouter as Router, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import formateNumber from '../../../util/formateNumber';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class PostList extends Component {
	constructor(props){
		super(props);
		this.state = {
			likesCount: 0,
			disLikesCount: 0
		}
	}

	handleApproved = event => {

	}

	updateLike = (userId, postId) => {
		this.props.updateLikes(userId, postId).then(data => {
			this.setState({
				likesCount: data.data.likes,
				disLikesCount: data.data.disLikes
			});
		});
	}

	updateDisLike = (userId, postId) => {
		this.props.updateDisLikes(userId, postId).then(data => {
			this.setState({
				disLikesCount: data.data.disLikes,
				likesCount: data.data.likes
			});
		});
	}



	handleMenuItem = (text, postId) => {}
	render(){
		const { classes, posts, user } = this.props;
		const { likesCount, disLikesCount, open } = this.state;
		const likeIco = <LikeIcon />;
		const disLikeIco = <DisLikeIcon />;
		return(
			<React.Fragment>
				{user && posts.filter(p => p.approved).map(post => (<Card key={post._id}>
						<CardHeader
					        avatar={
					          <Avatar alt={post.postedByName ? post.postedByName.substring(1,1): 'Image not Available'} src={post.postedByPhotoURL} />
					        }
					        title={post.postedByName}
					        subheader={moment(post.createdAt).fromNow()}
					      />
				      <CardContent>
				      	<List>
					      <ListItem alignItems="flex-start">
					        <ListItemAvatar>
					          <MoodIcon />
					        </ListItemAvatar>
					        <ListItemText
					          primary="Positive"
					          secondary={
					            <React.Fragment>
					              <Typography
					                component="p"
					                variant="body2"
					                color="textPrimary"
					              >
					                {post.positive}
					              </Typography>
					              
					            </React.Fragment>
					          }
					        />
					      </ListItem>
  					      <ListItem alignItems="flex-start">
					        <ListItemAvatar>
					          <MoodBadIcon />
					        </ListItemAvatar>
					        <ListItemText
					          primary="Negative"
					          secondary={
					            <React.Fragment>
					              <Typography
					                component="p"
					                variant="body2"
					                color="textPrimary"
					              >
					                {post.negative}
					              </Typography>
					            </React.Fragment>
					          }
					        />
					      </ListItem>
					      <ListItem alignItems="flex-start">
					        <ListItemAvatar>
					          <SentimentSatisfiedIcon />
					        </ListItemAvatar>
					        <ListItemText
					          primary="Advice"
					          secondary={
					            <React.Fragment>
					              <Typography
					                component="p"
					                variant="body2"
					                color="textPrimary"
					              >
					                {post.advice}
					              </Typography>
					            </React.Fragment>
					          }
					        />
					      </ListItem>
				      	</List>
				      </CardContent>
				      <Divider />
				      <CardActions style={{height: 10}} disableSpacing>
					      <Typography display="block" gutterBottom>
					          {formateNumber(post.likes > 0 ? post.likes: likesCount ? likesCount: 0)} Likes
				          </Typography>
				          <Typography display="block" gutterBottom>
					          {formateNumber(disLikesCount > 0 ? disLikesCount: post.disLikes ? post.disLikes : 0)} Dislikes
				          </Typography>
				      </CardActions>
				       <Divider variant="middle"/>
			      <CardActions>
			      	<Tooltip title='Like'>
				      	<IconButton aria-label="like" onClick={() => this.updateLike(user.uid, post._id)}>
				          <LikeIcon color={post.postDetails && post.postDetails.filter(d => d.userId == user.uid).length ? 'primary': ''}/> 
				        </IconButton>
				    </Tooltip>
			        <span className="span-name">Like</span>
			        <Tooltip title='Dis Like'>
				        <IconButton aria-label="disLike" onClick={() => this.updateDisLike(user.uid, post._id)}>
				          <DisLikeIcon /> 
				        </IconButton>
				    </Tooltip>
			        <span className="span-name">Dis Like</span> 
			      </CardActions>
			      {post.likes === 0 && <Divider variant="middle"/>}
			      <CardActions>
			      {post.likes == 0 && <Typography paragraph>
			        Be the first person to like this
		          </Typography>}
			      </CardActions>
			      
			    </Card>))}
			    { !posts.length ? <Typography variant='h1' style={{textAlign: 'center'}}>No posts found to show</Typography>: null}
		    </React.Fragment>
		)
	}
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const posts = state.getIn(['UserProfile', 'posts', 'success'], Map());
  // const user = state.getIn(['user', 'data']);
  return {
    posts
  };
}

const actionsToProps = {
  updateLikes: actions.updateLikes,
  updateDisLikes: actions.updateDisLikes
}

export default withRouter(connect(mapStateToProps, actionsToProps)(PostList))
