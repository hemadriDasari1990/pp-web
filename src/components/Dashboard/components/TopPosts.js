
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
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Loader from '../../Loader/components/Loader';

class TopPosts extends Component {
  render(){
    const { classes, posts, postsLoading } = this.props;
    return(
      <React.Fragment>
        <Card style={{width: '100%', maxWidth: '100%'}}>
              <CardHeader title="Top Posts">

              </CardHeader>
              <Divider />
              <CardContent>
                <List>
                  {!postsLoading && posts.length ? posts.filter(p => p.approved).slice(0, 5).map(post => (
                    <ListItem key={post._id} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={post.postedByName} src={post.postedByPhotoURL} />
                      </ListItemAvatar>
                      <Tooltip title={post.positive} placement="right-end">
                        <ListItemText
                          primary={post.postedByName}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {post.positive.length > 40 ? post.positive.substring(0, 40) + '...': post.positive}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </Tooltip>
                      <Tooltip title='Approved' placement="right-end">
                        <IconButton color='primary'>
                          <BookmarkIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                    )): <Typography variant='h4' style={{textAlign: 'center'}}>No posts found to show</Typography>}
                  </List>
                  { postsLoading && !posts.length && <Loader />}
              </CardContent>
            </Card>
        </React.Fragment>
    )
  }
}

TopPosts.propTypes = {
};

export default (TopPosts);