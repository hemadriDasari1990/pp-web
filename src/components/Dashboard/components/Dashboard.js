import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from '../../../firebase'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import PostList from './PostList'
import PostsInfo from './PostsInfo'
import RecentPosts from './RecentPosts'
import TopPosts from './TopPosts'
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
                    style={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
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
