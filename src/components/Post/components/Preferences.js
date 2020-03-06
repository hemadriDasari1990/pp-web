import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
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
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'

class Preferences extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      message: '',
      error: false,
      status: '',
      pros: '',
      cons: '',
      advice: '',
      buttonName: 'Save',
      count: 0,
      id: '',
      data: {},
    }
  }

  async componentDidMount() {
    const { user } = this.props
    await this.props.getUserPreferences(user._id).then(res => {
      if (res) {
        const data = res.data.pref[0]
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
  }
  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClose = () => {
    this.setState({
      open: !this.state.open,
    })
    this.props.openPreferencesForm()
  }

  handleSave = () => {
    const { pros, cons, advice, error, buttonName, id, data } = this.state
    const { user } = this.props
    if (!pros || !cons || !advice) {
      this.setState({
        message: 'Please choose all preferences',
        status: 'error',
        error: !error,
      })
    } else {
      this.setState({
        message: '',
        status: '',
        error: false,
        open: false,
      })
      if (buttonName === 'Update') {
        if (data.pros == pros && data.cons == cons && data.advice == advice) {
          this.setState({
            message: 'Nothing has changed to perform update',
            status: 'error',
            error: !error,
            open: true,
          })
        } else {
          this.props.updateUserPreferences({
            pros,
            cons,
            advice,
            user: user._id,
            id: id,
          })
        }
      } else {
        this.props.savePreferences({
          pros,
          cons,
          advice,
          user: user._id,
          count: 1,
        })
      }
    }
    this.props.openPreferencesForm()
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
      error,
      buttonName,
      count,
    } = this.state
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={() => this.handleClose()}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Preferences</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Save your preferences so that people will think twice before
              posting something for you.
            </DialogContentText>
            <br />
            <List>
              <ListItem>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Would you like to hear pros?" />
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
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio color="primary" />}
                      label="No"
                    />
                  </RadioGroup>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Would you like to hear cons?" />
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
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio color="primary" />}
                      label="No"
                    />
                  </RadioGroup>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Would you like to hear advice?" />
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
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio color="primary" />}
                      label="No"
                    />
                  </RadioGroup>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Badge color="secondary" badgeContent={count}>
              <Typography>Times you updated your preferences </Typography>
            </Badge>
          </DialogContent>
          <DialogActions>
            <Badge badgeContent={count}>
              <Fab
                variant="extended"
                color="primary"
                size="small"
                onClick={() => this.handleSave()}
              >
                {buttonName}
              </Fab>
            </Badge>
            <Fab
              variant="extended"
              color="primary"
              size="small"
              onClick={() => this.handleClose()}
            >
              Cancel
            </Fab>
          </DialogActions>
        </Dialog>
        {!savePreferencesLoading &&
        savePreferencesSuccess &&
        savePreferencesSuccess.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={savePreferencesSuccess.get('message')}
            status="success"
          />
        ) : null}
        {error && (
          <CustomizedSnackbars open={open} message={message} status={status} />
        )}
        {!updatePreferencesLoading &&
        updatePreferencesSuccess &&
        updatePreferencesSuccess.size > 0 ? (
          <CustomizedSnackbars
            open={true}
            message={updatePreferencesSuccess.get('message')}
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
  const userPreferences = state.getIn(['Post', 'preferences', 'get'])
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
