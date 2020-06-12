import * as actions from '../actions'

import React, { Component } from 'react'

import ArrowIcon from '@material-ui/icons/ArrowForward'
import AssistantIcon from '@material-ui/icons/Assistant'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import Generic from './Post/components/Generic'
import Grid from '@material-ui/core/Grid'
import Opinion from './Post/components/Opinion'
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined'
import SkeletonCreatePost from '../../Skeletons/components/CreatePost'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    color: '#606770',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    cursor: 'pointer',
    marginRight: 10,
  },
  avatar: {
    right: 10,
    boxShadow: 'none',
  },
})

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCreatePost: false,
      selfPost: false,
      loading: true,
    }
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 500)
  }

  componentWillUnmount() {
    this.timer ? clearTimeout(this.timer) : null
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
    const { user, classes } = this.props
    const { showCreatePost, selfPost, loading } = this.state
    return (
      <React.Fragment>
        {loading ? (
          <SkeletonCreatePost />
        ) : (
          <Card>
            <CardHeader title="Create New Post" />
            <CardContent style={{ minHeight: '300px !important' }}>
              {user && (
                <Grid container spacing={2}>
                  <Grid item lg={1} md={1} xs={1} sm={1}>
                    <Avatar
                      size="small"
                      alt={user ? user.userName : ''}
                      src={user ? user.photoURL : ''}
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid
                    item
                    lg={11}
                    md={11}
                    xs={11}
                    sm={11}
                    onClick={() => this.handleSelfPost()}
                  >
                    <span className={classes.root}>
                      What's on your mind, {user ? user.userName : ''}?
                    </span>
                  </Grid>
                </Grid>
              )}
              {showCreatePost && (
                <Opinion handleOpinionAction={this.handleOpinionAction} />
              )}
              {selfPost && <Generic handleSelfPost={this.handleSelfPost} />}
            </CardContent>
            <Divider />
            <CardActions>
              <Zoom in={true} timeout={1500}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => this.handleOpinionAction()}
                  style={{ height: 32 }}
                >
                  <PostAddOutlinedIcon /> Write Opinion{' '}
                  <ArrowIcon color="secondary" />
                </Button>
              </Zoom>
            </CardActions>
          </Card>
        )}
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

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Post)),
)
