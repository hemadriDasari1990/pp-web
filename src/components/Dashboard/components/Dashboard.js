import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import * as userProfileActions from '../../UserProfile/actions'
import { Map, fromJS } from 'immutable'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from '../../../firebase'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import PostList from './PostList'
import PostsInfo from './PostsInfo'
import RecentPosts from './RecentPosts'
import TopPosts from './TopPosts'
import ListIcon from '@material-ui/icons/List'
import formateNumber from '../../../util/formateNumber'
import Loader from '../../Loader/components/Loader'
import sendIcon from '../../../../assets/send.svg'
import receiveIcon from '../../../../assets/receive.svg'

class DashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      iposted: false,
      ireceived: true,
    }
  }

  componentDidMount() {
    new firebase.auth().onAuthStateChanged(async user => {
      if (
        user &&
        Array.isArray(user.providerData) &&
        user.providerData.length
      ) {
        this.setState({
          user: user.providerData[0],
        })
      }
    })
  }

  handleUser = event => {
    this.props.history.push('/dashboard')
  }

  handleIPosted = () => {
    this.setState({
      iposted: true,
      ireceived: false,
    })
  }

  handleIReceived = () => {
    this.setState({
      iposted: false,
      ireceived: true,
    })
  }

  render() {
    const { user, ireceived, iposted } = this.state
    const {} = this.props
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-5 col-sm-12 col-xs-12">
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button onClick={event => this.handleUser(event)}>
                  <ListItemAvatar>
                    <Avatar
                      size="small"
                      src={user ? user.photoURL : ''}
                      style={{ width: 22, height: 22 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user ? user.displayName : 'Loading...'}
                  />
                </ListItem>
                <ListItem button onClick={() => this.handleIPosted()}>
                  <ListItemAvatar>
                    <img src={sendIcon} height={23} width={23} />
                  </ListItemAvatar>
                  <ListItemText primary="I Posted" />
                </ListItem>
                <ListItem button onClick={() => this.handleIReceived()}>
                  <ListItemAvatar>
                    <img src={receiveIcon} height={23} width={23} />
                  </ListItemAvatar>
                  <ListItemText primary="I Received" />
                </ListItem>
              </List>
            </div>
            <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12">
              {user && (
                <PostList user={user} iposted={iposted} ireceived={ireceived} />
              )}
              {/*
                  <Typography variant="h4" className="no-records">
                    No posts Found
                  </Typography>
                */}
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
              {user && (
                <PostsInfo
                  userId={user.uid}
                  iposted={iposted}
                  ireceived={ireceived}
                />
              )}
              {user && (
                <RecentPosts
                  user={user}
                  iposted={iposted}
                  ireceived={ireceived}
                />
              )}
              {user && (
                <TopPosts user={user} iposted={iposted} ireceived={ireceived} />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

DashBoard.propTypes = {}

const mapStateToProps = state => {
  return {}
}

const actionsToProps = {}

export default withRouter(connect(mapStateToProps, actionsToProps)(DashBoard))
