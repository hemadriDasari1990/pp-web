import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PostList from './PostList'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PostsInfo from '../../Timeline/components/PostsInfo'
import RecentPosts from '../../Timeline/components/RecentPosts'
import TopPosts from '../../Timeline/components/TopPosts'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import * as globalActions from '../../../actions/index'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import userLike from '../../../../assets/user-like.svg'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import * as actions from '../actions'
import { Map } from 'immutable'
import Profile from './Profile'
import Reactions from './Reactions'
import Incoming from '../../Timeline/components/Incoming'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      user: undefined,
      userLikeFlag: false,
    }
  }

  async componentDidMount() {
    await this.props.getUser(this.props.match.params.id).then(res => {
      this.setState({
        user: res.data ? res.data.user : {},
      })
    })
  }

  render() {
    const { classes, loggedInUser } = this.props
    const { posts, user, userLikeFlag } = this.state
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-3 col-md-5 col-sm-12 col-xs-12">
            {user && loggedInUser && <Profile profileUser={user} />}
            <Reactions />
          </div>
          <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12">
            {user && <Incoming user={user} />}
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
            {user && <PostsInfo user={user} />}
            {user && <RecentPosts user={user} />}
            {user && <TopPosts user={user} />}
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
  const loggedInUser = state.getIn(['user', 'data'])
  return {
    loggedInUser,
  }
}

const actionsToProps = {
  getUser: globalActions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Dashboard))
