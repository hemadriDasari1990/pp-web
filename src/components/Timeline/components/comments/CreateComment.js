import * as actions from '../../actions'
import * as postActions from '../../../Post/actions'

import { Map, fromJS } from 'immutable'
import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

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
      this.props.hideComment(postId)
      await this.props.getCommentsCount(postId)
      await this.props.getComments(postId)
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
                className="m-l-10"
              />
            </Grid>
            <Grid lg={8} md={8} item>
              <TextField
                className="m-0"
                key="comment"
                margin="normal"
                type="string"
                size="small"
                variant="outlined"
                label="Write a comment"
                placeholder="Type here"
                value={comment}
                multiline
                onChange={e => this.handleComment(e)}
                rowsMax={Infinity}
                fullWidth
                required
              />
            </Grid>
            <Grid lg={1} md={1} item>
              <Button
                disabled={comment ? false : true}
                onClick={() => this.createComment(post._id)}
                variant="outlined"
                size="medium"
                color="primary"
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
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(CreateComment)),
)
