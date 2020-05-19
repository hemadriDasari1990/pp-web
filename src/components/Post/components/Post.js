import * as actions from '../actions'

import React, { Component } from 'react'

import AssistantIcon from '@material-ui/icons/Assistant'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import Generic from './Post/components/Generic'
import Opinion from './Post/components/Opinion'
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCreatePost: false,
      selfPost: false,
    }
  }

  handleOpinionAction = () => {
    this.setState({
      showCreatePost: !this.state.showCreatePost,
      selfPost: false,
      errorMessage: '',
    })
  }

  handleSelfPost = () => {
    this.setState({
      selfPost: !this.state.selfPost,
      showCreatePost: false,
    })
  }

  handleAskForOpinion = () => {}

  render() {
    const { user } = this.props
    const { showCreatePost, selfPost } = this.state
    return (
      <React.Fragment>
        <Card>
          <CardHeader title="Create New Post" />
          <CardContent style={{ minHeight: '300px !important' }}>
            {user && (
              <div className="row mt-10">
                <Avatar
                  size="small"
                  alt={user ? user.userName : ''}
                  src={user ? user.photoURL : ''}
                  style={{ marginLeft: 15 }}
                />
                <span
                  className="g-color mt-10 m-l-18"
                  onClick={() => this.handleSelfPost()}
                >
                  What's on your mind, {user.userName}?{' '}
                </span>
              </div>
            )}
            {showCreatePost && (
              <Opinion handleOpinionAction={this.handleOpinionAction} />
            )}
            {selfPost && <Generic handleSelfPost={this.handleSelfPost} />}
          </CardContent>
          <Divider />
          <CardActions>
            <Zoom in={true} timeout={1500}>
              <Fab
                variant="extended"
                color="primary"
                size="small"
                onClick={() => this.handleOpinionAction()}
                style={{ height: 32 }}
              >
                <PostAddOutlinedIcon /> &nbsp;Write Opinion
              </Fab>
            </Zoom>
            <Zoom in={true} timeout={1500}>
              <Fab
                variant="extended"
                color="primary"
                size="small"
                onClick={() => this.handleAskForOpinion()}
                style={{ height: 32 }}
              >
                <AssistantIcon /> &nbsp;Ask For Opinion
              </Fab>
            </Zoom>
          </CardActions>
        </Card>
      </React.Fragment>
    )
  }
}

Post.propTypes = {}

// export default withStyles(styles)(Post);

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {}

export default withRouter(connect(mapStateToProps, actionsToProps)(Post))
