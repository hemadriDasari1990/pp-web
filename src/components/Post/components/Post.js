import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Search from '../../Header/components/Search'
import * as actions from '../actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Fab from '@material-ui/core/Fab'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Loader from '../../Loader/components/Loader'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      positive: '',
      negative: '',
      advice: '',
      newPost: {},
      preferences: undefined,
      errorMessage: '',
      showCreatePost: false,
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSave = async () => {
    const { positive, negative, advice, preferences } = this.state
    if (!positive || !negative || !advice) {
      this.setState({
        errorMessage: 'Please enter your comments as per user preferences',
      })
    } else {
      const data = this.state.newPost
      data.positive = positive
      data.negative = negative
      data.advice = advice
      await this.props.createPost(data).then(res => {
        this.setState({
          errorMessage: '',
          showCreatePost: false,
          positive: '',
          negative: '',
          advice: '',
          preferences: '',
        })
      })
    }
  }

  createPost = async newPost => {
    if (!newPost) {
      return
    }
    await this.props.getUserPreferences(newPost.postedTo).then(res => {
      this.setState({
        preferences: res.data.pref[0],
      })
    })
    this.setState({
      newPost,
    })
  }

  handleCard = () => {
    this.setState({
      showCreatePost: true,
      errorMessage: '',
    })
  }

  handleClose = () => {
    this.setState({
      showCreatePost: false,
      errorMessage: '',
    })
  }

  render() {
    const {
      classes,
      createPostLoading,
      createPostError,
      createPostSuccess,
      user,
      users,
    } = this.props
    const {
      positive,
      negative,
      advice,
      preferences,
      newPost,
      errorMessage,
      showCreatePost,
    } = this.state
    return (
      <React.Fragment>
        <Card>
          <CardHeader title="Create New Post" />
          <CardContent
            onClick={() => this.handleCard()}
            style={{ minHeight: '300px !important' }}
          >
            {!showCreatePost && !createPostLoading && user && (
              <div className="row">
                <Avatar
                  size="small"
                  src={user ? user.photoURL : ''}
                  style={{ marginLeft: 10 }}
                />
                <p
                  style={{
                    marginLeft: 70,
                    marginTop: 10,
                    color: '#90949c',
                    position: 'absolute',
                  }}
                >
                  What's on your friend, {user.displayName}?{' '}
                </p>
              </div>
            )}
            {showCreatePost && !createPostLoading && (
              <>
                <h5>Write something that matters to people.</h5>
                <Search
                  users={users}
                  profile={false}
                  post={true}
                  createPost={this.createPost}
                />
                {preferences && (
                  <>
                    <h4>{newPost.postedByName} preferences</h4>
                    <p>Please post your comments as per user preferences</p>
                    <FormControlLabel
                      control={
                        preferences.positive == 'yes' ? (
                          <Checkbox checked={true} />
                        ) : (
                          <Checkbox indeterminate />
                        )
                      }
                      label="Positive"
                    />
                    <FormControlLabel
                      control={
                        preferences.negative == 'yes' ? (
                          <Checkbox checked={true} />
                        ) : (
                          <Checkbox indeterminate />
                        )
                      }
                      label="Negative"
                    />
                    <FormControlLabel
                      control={
                        preferences.advice == 'yes' ? (
                          <Checkbox checked={true} />
                        ) : (
                          <Checkbox indeterminate />
                        )
                      }
                      label="Advice"
                    />
                  </>
                )}
                <TextField
                  required={
                    preferences && preferences.positive == 'yes' ? true : false
                  }
                  id="standard-required"
                  name="positive"
                  label="Positive"
                  placeholder="Write something positive"
                  defaultValue=""
                  value={positive}
                  onChange={e => this.handleInput(e)}
                  autoFocus
                  margin="dense"
                  fullWidth
                />
                <br />
                <TextField
                  required={
                    preferences && preferences.negative == 'yes' ? true : false
                  }
                  id="standard-required"
                  name="negative"
                  label="Negative"
                  placeholder="Write something Negative"
                  defaultValue=""
                  value={negative}
                  onChange={e => this.handleInput(e)}
                  margin="dense"
                  fullWidth
                />
                <br />
                <TextField
                  required={
                    preferences && preferences.advice == 'yes' ? true : false
                  }
                  id="standard-required"
                  name="advice"
                  label="Advice"
                  defaultValue=""
                  placeholder="Write something Advice"
                  value={advice}
                  onChange={e => this.handleInput(e)}
                  margin="dense"
                  fullWidth
                />
              </>
            )}
            {createPostLoading ? <Loader /> : null}
          </CardContent>
          {showCreatePost && (
            <CardActions>
              <Fab
                variant="extended"
                color="primary"
                size="small"
                onClick={() => this.handleSave()}
              >
                Create
              </Fab>
              <Fab
                variant="extended"
                color="secondary"
                size="small"
                onClick={() => this.handleClose()}
              >
                Cancel
              </Fab>
            </CardActions>
          )}
        </Card>
        {createPostSuccess && createPostSuccess.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={createPostSuccess.get('message')}
            status="success"
          />
        ) : null}
        {errorMessage ? (
          <CustomizedSnackbars
            open={true}
            message={errorMessage}
            status="error"
          />
        ) : null}
      </React.Fragment>
    )
  }
}

Post.propTypes = {}

// export default withStyles(styles)(Post);

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const createPostLoading = state.getIn(
    ['Post', 'post', 'create', 'loading'],
    false,
  )
  const createPostError = state.getIn(
    ['Post', 'post', 'create', 'errors'],
    Map(),
  )
  const createPostSuccess = state.getIn(
    ['Post', 'post', 'create', 'success'],
    Map(),
  )
  const users = state.getIn(['user', 'all', 'success'], Map())
  const userPreferences = state.getIn(['Post', 'preferences', 'get'])
  return {
    createPostLoading,
    createPostError,
    createPostSuccess,
    user,
    users,
    userPreferences,
  }
}

const actionsToProps = {
  createPost: actions.createPost,
  getUserPreferences: actions.getUserPreferences,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Post))
