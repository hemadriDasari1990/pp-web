import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Fab from '@material-ui/core/Fab'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { Map, fromJS } from 'immutable'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import FeedbackList from './FeedbackList'
import Loader from '../../Loader/components/Loader'

class Feedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      about: '',
      comment: '',
      good: false,
      vgood: false,
      bad: false,
      vbad: false,
      yes: false,
      no: false,
    }
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.getFeedbacks()
    }
  }

  handleComment = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleAbout = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleExperience = e => {
    switch (e.target.name) {
      case 'good':
        this.setState({
          good: e.target.value,
          vgood: false,
          bad: false,
          vbad: false,
        })
        break
      case 'vgood':
        this.setState({
          good: false,
          vgood: e.target.value,
          bad: false,
          vbad: false,
        })
        break
      case 'bad':
        this.setState({
          good: false,
          vgood: false,
          bad: e.target.value,
          vbad: false,
        })
        break
      case 'vbad':
        this.setState({
          good: false,
          vgood: false,
          bad: false,
          vbad: e.target.value,
        })
        break
      default:
        break
    }
  }

  handleInterest = e => {
    switch (e.target.name) {
      case 'yes':
        this.setState({
          yes: e.target.value,
          no: false,
        })
        break
      case 'no':
        this.setState({
          yes: false,
          no: e.target.value,
        })
        break
      default:
        break
    }
  }

  handleSubmit = async () => {
    const {
      about,
      comment,
      good,
      vgood,
      bad,
      vbad,
      yes,
      no,
      errorMessage,
    } = this.state
    const { user } = this.props
    if (!about && !comment) {
      this.setState({
        errorMessage: 'Please fill required fields with * mark',
      })
    } else {
      const data = this.state
      data.email = user.email
      data.photoURL = user.photoURL
      data.userName = user.userName
      await this.props.saveFeedback(data).then(async res => {
        await this.props.getFeedbacks()
        this.handleReset()
      })
    }
  }

  handleReset = () => {
    this.setState({
      about: '',
      comment: '',
      good: false,
      vgood: false,
      bad: false,
      vbad: false,
      yes: false,
      no: false,
    })
  }

  render() {
    const {
      about,
      comment,
      good,
      vgood,
      bad,
      vbad,
      yes,
      no,
      errorMessage,
    } = this.state
    const {
      user,
      feedbacks,
      saveFeedbackSuccess,
      saveFeedbackLoading,
      feedbacksLoading,
    } = this.props
    return (
      <div className="container">
        {user && (
          <>
            <h2 className="h2-header">Feedback Form</h2>
            <p>
              Your feedback is valuable for us. Please share your feedback by
              submitting below form, it will help us improve the system user
              friendly.
            </p>
            <div className="col-lg-12">
              <TextField
                className="w-100"
                error
                name="about"
                id="feedback-about"
                label="Feedback About"
                defaultValue="Feedback about Pros"
                value={about}
                onChange={this.handleAbout}
                required
              />
            </div>
            <div className="col-lg-12">
              <TextField
                className="w-100"
                id="comments"
                name="comment"
                label="Your Comments"
                multiline
                rowsMax="4"
                value={comment}
                onChange={this.handleComment}
                required
              />
            </div>
            <br />
            <div className="col-lg-12">
              <p>How is your experience?</p>
            </div>
            <div className="col-lg-12">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={good}
                    onChange={this.handleExperience}
                    value="false"
                    color="primary"
                    name="good"
                  />
                }
                label="Good"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vgood}
                    onChange={this.handleExperience}
                    value="false"
                    color="primary"
                    name="vgood"
                  />
                }
                label="Very Good"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bad}
                    onChange={this.handleExperience}
                    value="false"
                    color="secondary"
                    name="bad"
                  />
                }
                label="Bad"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vbad}
                    onChange={this.handleExperience}
                    value="false"
                    color="secondary"
                    name="vbad"
                  />
                }
                label="Very Bad"
              />
            </div>
            <div className="col-lg-12">
              <p>Is it interesting?</p>
            </div>
            <div className="col-lg-12">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={yes}
                    onChange={this.handleInterest}
                    value="false"
                    color="primary"
                    name="yes"
                  />
                }
                label="Yes"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={no}
                    onChange={this.handleInterest}
                    value="false"
                    color="secondary"
                    name="no"
                  />
                }
                label="No"
              />
            </div>
            <div className="col-lg-6 margin-bottom">
              <Fab
                variant="extended"
                color="primary"
                size="small"
                onClick={() => this.handleSubmit()}
              >
                Submit
              </Fab>
              <Fab
                variant="extended"
                color="secondary"
                size="small"
                onClick={() => this.handleReset()}
              >
                Reset
              </Fab>
            </div>
            {saveFeedbackSuccess && saveFeedbackSuccess.size > 0 ? (
              <CustomizedSnackbars
                open={true}
                message={saveFeedbackSuccess.get('message')}
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
            <div className="col-lg-12"></div>
          </>
        )}
        <h2>Feedbacks We Received</h2>

        <p className="margin-bottom">
          We are really thankful to below people who are helping us to improve
          the system.
        </p>
        {!user && <p>*Please login to provide your feedback </p>}
        {saveFeedbackLoading && <Loader />}
        {feedbacks && <FeedbackList feedbacks={feedbacks.feedbacks} />}
        {feedbacksLoading && <Loader />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const saveFeedbackLoading = state.getIn(
    ['Footer', 'feedback', 'save', 'loading'],
    false,
  )
  const saveFeedbackError = state.getIn(
    ['Footer', 'feedback', 'save', 'errors'],
    Map(),
  )
  const saveFeedbackSuccess = state.getIn(
    ['Footer', 'feedback', 'save', 'success'],
    Map(),
  )
  const feedbacks = state.getIn(['Footer', 'feedbacks', 'get', 'success'])
  const feedbacksLoading = state.getIn(
    ['Footer', 'feedbacks', 'get', 'loading'],
    false,
  )
  return {
    saveFeedbackLoading,
    saveFeedbackError,
    saveFeedbackSuccess,
    user,
    feedbacks,
    feedbacksLoading,
  }
}

const actionsToProps = {
  saveFeedback: actions.saveFeedback,
  getFeedbacks: actions.getFeedbacks,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Feedback))