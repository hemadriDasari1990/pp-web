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
import FormGroup from '@material-ui/core/FormGroup'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pros: '',
      cons: '',
      advice: '',
      selectedUser: undefined,
      preferences: undefined,
      errorMessage: '',
      showCreatePost: false,
      isAnonymous: false,
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSave = async () => {
    const { pros, cons, advice, preferences, selectedUser } = this.state
    const { user } = this.props
    if (!pros || !cons || !advice || !selectedUser) {
      this.setState({
        errorMessage: 'Please enter your comments as per user preferences',
      })
    } else {
      const data = {}
      data.postedTo = selectedUser._id
      data.postedBy = user._id
      data.pros = pros
      data.cons = cons
      data.advice = advice
      data.isAnonymous = this.state.isAnonymous
      await this.props.createPost(data).then(res => {
        this.setState({
          errorMessage: '',
          showCreatePost: false,
          pros: '',
          cons: '',
          advice: '',
          preferences: '',
        })
      })
    }
  }

  getSelectedUser = async user => {
    if (!user) {
      return
    }
    await this.props.getUserPreferences(user._id).then(res => {
      this.setState({
        preferences: res.data.pref,
      })
    })
    this.setState({
      selectedUser: user,
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

  handleAnnonymous = e => {
    this.setState({
      isAnonymous: event.target.checked,
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
      pros,
      cons,
      advice,
      preferences,
      selectedUser,
      errorMessage,
      showCreatePost,
      isAnonymous,
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
                <span className="g-color mt-10 m-l-18">
                  What's on your mind, {user.userName}?{' '}
                </span>
              </div>
            )}
            {showCreatePost && !createPostLoading && (
              <>
                <h5>Write something that matters to people.</h5>
                <div className="col-lg-12">
                  <Search type="post" getSelectedUser={this.getSelectedUser} />
                </div>
                <br />
                {selectedUser && preferences && (
                  <>
                    <h4>{selectedUser.userName} preferences</h4>
                    <p>Please post your comments as per user preferences</p>
                    <FormControlLabel
                      control={
                        preferences.pros == 'yes' ? (
                          <Checkbox color="primary" checked={true} />
                        ) : (
                          <Checkbox color="primary" indeterminate />
                        )
                      }
                      label="Pros"
                    />
                    <FormControlLabel
                      control={
                        preferences.cons == 'yes' ? (
                          <Checkbox color="primary" checked={true} />
                        ) : (
                          <Checkbox color="primary" indeterminate />
                        )
                      }
                      label="Cons"
                    />
                    <FormControlLabel
                      control={
                        preferences.advice == 'yes' ? (
                          <Checkbox color="primary" checked={true} />
                        ) : (
                          <Checkbox color="primary" indeterminate />
                        )
                      }
                      label="Advice"
                    />
                  </>
                )}
                {selectedUser && !preferences && (
                  <h6>
                    {selectedUser.userName} don't have preferences updated.
                    Please feel free to provide your openions
                  </h6>
                )}
                <TextField
                  required={
                    preferences && preferences.pros == 'yes' ? true : false
                  }
                  id="standard-required"
                  name="pros"
                  label="Pros"
                  placeholder="Write something pros"
                  defaultValue=""
                  value={pros}
                  onChange={e => this.handleInput(e)}
                  autoFocus
                  margin="dense"
                  fullWidth
                />
                <br />
                <TextField
                  id="standard-required"
                  name="cons"
                  label="Cons"
                  placeholder="Write something Cons"
                  defaultValue=""
                  value={cons}
                  onChange={e => this.handleInput(e)}
                  margin="dense"
                  fullWidth
                />
                <br />
                <TextField
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
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={isAnonymous}
                        onChange={e => this.handleAnnonymous(e)}
                        value={false}
                      />
                    }
                    label="Post as Anonymous"
                  />
                </FormGroup>
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
                color="primary"
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
