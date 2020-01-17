import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostList from './PostList'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PostsInfo from '../../Dashboard/components/PostsInfo'
import RecentPosts from '../../Dashboard/components/RecentPosts'
import TopPosts from '../../Dashboard/components/TopPosts'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import * as globalActions from '../../../actions/index'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      user: {},
    }
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id).then(res => {
      this.setState({
        user: res.data ? res.data.user : {},
      })
    })
  }

  render() {
    const { classes } = this.props
    const { posts, user } = this.state
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5 col-sm-12 col-xs-12">
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button onClick={event => this.handleApproved(event)}>
                  <ListItemAvatar>
                    <Avatar src={user ? user.photoURL : ''} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user ? user.userName : 'Name loading...'}
                  />
                </ListItem>
              </List>
              {user && <PostsInfo user={user} />}
            </div>
            <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12">
              {user && <PostList user={user} />}
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
              {user && <RecentPosts user={user} />}
              {user && <TopPosts user={user} />}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {}
}

const actionsToProps = {
  getUser: globalActions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Dashboard))
