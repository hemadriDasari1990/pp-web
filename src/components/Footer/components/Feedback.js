import * as actions from '../actions'

import React, { Component } from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import Fab from '@material-ui/core/Fab'
import FeedbackList from './FeedbackList'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Loader from '../../Loader/components/Loader'
import { Map } from 'immutable'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

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
      average: false,
      annonymous: false,
      feedbacks: [],
    }
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.getFeedbacks().then(res => {
        this.setState({
          feedbacks: res.data,
        })
      })
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
          average: false,
        })
        break
      case 'vgood':
        this.setState({
          good: false,
          vgood: e.target.value,
          bad: false,
          vbad: false,
          average: false,
        })
        break
      case 'average':
        this.setState({
          good: false,
          vgood: false,
          bad: false,
          vbad: false,
          average: e.target.value,
        })
        break
      case 'bad':
        this.setState({
          good: false,
          vgood: false,
          bad: e.target.value,
          vbad: false,
          average: false,
        })
        break
      case 'vbad':
        this.setState({
          good: false,
          vgood: false,
          bad: false,
          vbad: e.target.value,
          average: false,
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
    const { about, comment } = this.state
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
        this.setState(prevState => ({
          feedbacks: [res.data, ...prevState.feedbacks],
        }))
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
      average: false,
      annonymous: false,
    })
  }

  handleAnnonymous = e => {
    this.setState({
      annonymous: !this.state.annonymous,
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
      average,
      errorMessage,
      annonymous,
      feedbacks,
    } = this.state
    const {
      user,
      saveFeedbackSuccess,
      saveFeedbackLoading,
      feedbacksLoading,
    } = this.props
    return (
      <React.Fragment>
        <h1>Feedback</h1>
        <p>
          This page is designed for end users to help us improve the system by
          sharing their user experience. In order to submit any form user has to
          first login to the page using one of the social logins provided.{' '}
        </p>
        <p>
          Users feedback is valuable for Us and we're always thankfull to them
          :)
        </p>
        {user && (
          <>
            <h2 className="h2-header">Form</h2>
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
                    checked={average}
                    onChange={this.handleExperience}
                    value="false"
                    color="primary"
                    name="average"
                  />
                }
                label="Average"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bad}
                    onChange={this.handleExperience}
                    value="false"
                    color="primary"
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
                    color="primary"
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
                    color="primary"
                    name="no"
                  />
                }
                label="No"
              />
            </div>
            <div className="col-lg-12">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={annonymous}
                    onChange={this.handleAnnonymous}
                    value="false"
                    color="primary"
                    name="annonymous"
                  />
                }
                label="Post As Annonymous"
              />
            </div>
            <div className="col-lg-6 margin-bottom">
              <Fab
                variant="extended"
                color="primary"
                size="small"
                onClick={() => this.handleSubmit()}
                className="mr-10"
              >
                Submit
              </Fab>
              <Fab
                variant="extended"
                color="primary"
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
          </>
        )}
        {!feedbacksLoading && feedbacks && feedbacks.length ? (
          <div className="col-lg-12">
            <Slide
              direction="right"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <h2>Feedbacks from our people</h2>
            </Slide>
            <Slide
              direction="left"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <p className="margin-bottom">
                We are really thankful to them who are helping us to improve the
                system.
              </p>
            </Slide>
          </div>
        ) : null}
        {!user && <h4>*Please login to share your feedback </h4>}
        {saveFeedbackLoading && <Loader />}
        {!saveFeedbackLoading ? <FeedbackList feedbacks={feedbacks} /> : null}
      </React.Fragment>
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
