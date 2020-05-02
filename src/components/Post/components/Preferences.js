import React, { Component } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import * as actions from '../actions'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import CustomizedSnackbars from '../../Snackbar/components/Snackbar'
import Badge from '@material-ui/core/Badge'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Loader from '../../Loader/components/Loader'

class Preferences extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      message: '',
      status: '',
      pros: '',
      cons: '',
      advice: '',
      buttonName: 'Save',
      count: 0,
      id: '',
      data: {},
    }
    this.timeout
  }

  async componentDidMount() {
    const { user } = this.props
    user
      ? await this.props.getUserPreferences(user._id).then(res => {
          if (res) {
            const data = res.data.pref
            if (data) {
              this.setState({
                pros: data.pros,
                cons: data.cons,
                advice: data.advice,
                buttonName: 'Update',
                count: data.count,
                id: data._id,
                data,
              })
            }
          }
        })
      : null
  }
  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClose = () => {
    this.props.history.push('/dashboard')
  }

  handleSave = async () => {
    const { pros, cons, advice, buttonName, id, data } = this.state
    const { user } = this.props
    if (!pros || !cons || !advice) {
      this.setState({
        message: 'Please choose all preferences',
        status: 'error',
      })
    } else {
      this.setState({
        message: '',
        status: '',
        open: false,
      })
      if (buttonName === 'Update') {
        if (data.pros == pros && data.cons == cons && data.advice == advice) {
          this.setState({
            message: 'Nothing has changed to perform update',
            status: 'error',
            open: true,
          })
        } else {
          await this.props.updateUserPreferences({
            pros,
            cons,
            advice,
            user: user._id,
            id: id,
          })
          this.redirectToDashboard()
        }
      } else {
        await this.props.savePreferences({
          pros,
          cons,
          advice,
          user: user._id,
          count: 1,
        })
        this.redirectToDashboard()
      }
    }
  }

  redirectToDashboard = () => {
    this.timeout = setTimeout(() => {
      this.props.history.push('/dashboard')
    }, 2000)
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  render() {
    const {
      user,
      savePreferencesLoading,
      savePreferencesError,
      savePreferencesSuccess,
      updatePreferencesLoading,
      updatePreferencesError,
      updatePreferencesSuccess,
    } = this.props
    const {
      pros,
      cons,
      advice,
      open,
      message,
      status,
      buttonName,
      count,
    } = this.state
    return (
      <React.Fragment>
        <div className="col-lg-8 col-md-6 col-sm-6 col-xs-6">
          <h1>Preferences</h1>
          <p>
            Save your preferences so that people will think twice before they
            write you.
          </p>
          <p>
            Preferences are important for your profile because, when they want
            to write you they will look at your preferences and write you as per
            preferences. This will help people know your interests
          </p>
          {!savePreferencesLoading || !updatePreferencesLoading ? (
            <List>
              <ListItem>
                <Grid container direction="row" spacing={1}>
                  <Grid item xs={6}>
                    <ListItemText primary="Pros" />
                  </Grid>
                  <Grid item xs={6}>
                    <ListItemSecondaryAction>
                      <RadioGroup
                        aria-label="pros"
                        name="pros"
                        value={pros}
                        onChange={this.handleInput}
                        row
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio color="primary" />}
                          label="Interested"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio color="primary" />}
                          label="Not Interested"
                        />
                      </RadioGroup>
                    </ListItemSecondaryAction>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container direction="row" spacing={1}>
                  <Grid item xs={6}>
                    <ListItemText primary="Cons" />
                  </Grid>
                  <Grid item xs={6}>
                    <ListItemSecondaryAction>
                      <RadioGroup
                        aria-label="cons"
                        name="cons"
                        value={cons}
                        onChange={this.handleInput}
                        row
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio color="primary" />}
                          label="Interested"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio color="primary" />}
                          label="Not Interested"
                        />
                      </RadioGroup>
                    </ListItemSecondaryAction>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container direction="row" spacing={1}>
                  <Grid item xs={6}>
                    <ListItemText primary="Advice" />
                  </Grid>
                  <Grid item xs={6}>
                    <ListItemSecondaryAction>
                      <RadioGroup
                        aria-label="advice"
                        name="advice"
                        value={advice}
                        onChange={this.handleInput}
                        row
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio color="primary" />}
                          label="Interested"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio color="primary" />}
                          label="Not Interested"
                        />
                      </RadioGroup>
                    </ListItemSecondaryAction>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          ) : (
            <Loader />
          )}
          <div style={{ float: 'right' }}>
            <Fab
              variant="extended"
              color="primary"
              size="small"
              onClick={() => this.handleSave()}
            >
              {buttonName}
            </Fab>
            <Fab
              variant="extended"
              color="primary"
              size="small"
              onClick={() => this.handleClose()}
            >
              Cancel
            </Fab>
          </div>
        </div>
        {/* {savePreferencesError ? <CustomizedSnackbars open={open} message="Cannot save preferences. Please try again" status={status} />: null}
        {updatePreferencesError ? <CustomizedSnackbars open={open} message="Cannot save preferences. Please try again" status={status} />: null} */}
        {!updatePreferencesLoading &&
        (updatePreferencesSuccess.size || savePreferencesSuccess.size) ? (
          <CustomizedSnackbars
            open={true}
            message="Preferences are updated successfully"
            status="success"
          />
        ) : null}
      </React.Fragment>
    )
  }
}

Preferences.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'], Map())
  const userPreferences = state.getIn(['Post', 'preferences', 'get', 'success'])
  const savePreferencesLoading = state.getIn(
    ['Post', 'preferences', 'save', 'loading'],
    false,
  )
  const savePreferencesError = state.getIn(
    ['Post', 'preferences', 'save', 'errors'],
    Map(),
  )
  const savePreferencesSuccess = state.getIn(
    ['Post', 'preferences', 'save', 'success'],
    Map(),
  )
  const updatePreferencesLoading = state.getIn(
    ['Post', 'preferences', 'update', 'loading'],
    false,
  )
  const updatePreferencesError = state.getIn(
    ['Post', 'preferences', 'update', 'errors'],
    Map(),
  )
  const updatePreferencesSuccess = state.getIn(
    ['Post', 'preferences', 'update', 'success'],
    Map(),
  )
  return {
    user,
    userPreferences,
    savePreferencesLoading,
    savePreferencesError,
    savePreferencesSuccess,
    updatePreferencesLoading,
    updatePreferencesError,
    updatePreferencesSuccess,
  }
}

const actionsToProps = {
  savePreferences: actions.savePreferences,
  getUserPreferences: actions.getUserPreferences,
  updateUserPreferences: actions.updateUserPreferences,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Preferences))
