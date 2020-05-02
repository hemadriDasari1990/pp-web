import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import * as actions from '../../actions'
import { Map, fromJS } from 'immutable'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import CheckRoundedIcon from '@material-ui/icons/CheckRounded'
import * as postActions from '../../../Post/actions'

const styles = {}

class CreateComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: '',
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    // this.props.getIncomingPosts(this.props.user._id)
  }

  createComment = async postId => {
    const data = {
      postId: postId,
      commentedBy: this.props.user._id,
      message: this.state.comment,
    }
    await this.props.createComment(postId, data).then(async data => {
      this.props.hideComment()
      await this.props.getCommentsCount(postId)
      await this.props.getComments(this.props.post._id)
    })
  }

  handleComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  render() {
    const { classes, showCommentInput, post, user } = this.props
    const { comment } = this.state
    return (
      <>
        {showCommentInput && (
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <Avatar
                size="small"
                src={post.postedBy.photoURL}
                style={{ marginLeft: 10 }}
              />
            </Grid>
            <Grid lg={8} item>
              <TextField
                type="string"
                size="small"
                multiline={true}
                variant="outlined"
                id="input-with-icon-grid"
                label="Write a comment"
                placeholder="Type here"
                margin="dense"
                value={comment}
                onChange={e => this.handleComment(e)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button
                className="mt-minus-30"
                disabled={comment ? false : true}
                onClick={() => this.createComment(post._id)}
                variant={'outlined'}
                size="small"
                color={'primary'}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        )}
      </>
    )
  }
}

CreateComment.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const deletePostSuccess = state.getIn(
    ['Timeline', 'post', 'delete', 'success'],
    Map(),
  )
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  createComment: actions.createComment,
  getCommentsCount: postActions.getCommentsCount,
  getComments: postActions.getComments,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(ReactionsList)),
)
