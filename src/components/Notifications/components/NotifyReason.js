import * as actions from '../actions'
import * as dashboardActions from '../../Timeline/actions'

import React, { Component, Suspense, lazy } from 'react'

import BackIcon from '@material-ui/icons/ArrowBack'
import BlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined'
import Chip from '@material-ui/core/Chip'
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import FaceIcon from '@material-ui/icons/Face'
import Grid from '@material-ui/core/Grid'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined'
import Loader from '../../Loader/components/Loader'
import MailIcon from '@material-ui/icons/EmailOutlined'
import NotInterestedOutlinedIcon from '@material-ui/icons/NotInterestedOutlined'
import PropTypes from 'prop-types'
import SaveIcon from '@material-ui/icons/Save'
import ShareIcon from '@material-ui/icons/Share'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import TextField from '@material-ui/core/TextField'
import TimerIcon from '@material-ui/icons/Timer'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import textingImage from '../../../../assets/notifications/texting.svg'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = {}

class NotifyReason extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // limit: 0,
      // notifications: []
    }
  }

  async componentDidMount() {}

  handleDelete = () => {}

  additionalComment = () => {}
  render() {
    const { classes, user } = this.props
    const {} = this.state
    return (
      <Suspense fallback={<div />}>
        <Grid container spacing={1}>
          <Grid item lg={6}>
            <Chip
              icon={<TimerIcon />}
              label="I need sometime to think"
              color="primary"
              className="mt-2"
              variant="outlined"
            />
          </Grid>
          <Grid item lg={6}>
            <Chip
              icon={<MailIcon />}
              label="I will respond later"
              color="primary"
              className="mt-2"
              variant="outlined"
            />
          </Grid>
          <Grid item lg={6}>
            <Chip
              icon={<FaceIcon />}
              label="Thank you for asking"
              color="primary"
              className="mt-2"
              variant="outlined"
            />
          </Grid>
          <Grid item lg={6}>
            <Chip
              icon={<ShareIcon />}
              label="Sorry I Can't share"
              color="primary"
              className="mt-2"
              variant="outlined"
            />
          </Grid>
          <Grid item lg={6}>
            <Chip
              icon={<HelpOutlineOutlinedIcon />}
              label="Sorry I don't know you"
              color="primary"
              className="mt-2"
              variant="outlined"
            />
          </Grid>
          <Grid item lg={6}>
            <Chip
              icon={<NotInterestedOutlinedIcon />}
              label="Sorry Not Interested"
              color="primary"
              className="mt-2"
              variant="outlined"
            />
          </Grid>
          <Grid item lg={6}>
            <Chip
              icon={<BugReportOutlinedIcon />}
              label="Perhaps it's too early"
              color="primary"
              className="mt-2"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={12}>
            <TextField
              className="mt-2"
              name="comment"
              label="Additional Comments"
              defaultValue=""
              value=""
              fullWidth
              onChange={e => this.additionalComment(e)}
              multiline
              rows={2}
              rowsMax={10}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={6}>
            <Zoom in={true} timeout={1500}>
              <Fab
                className="mt-2"
                variant="contained"
                color="primary"
                size="small"
                onClick={() => this.handleSave()}
              >
                Notify
              </Fab>
            </Zoom>
          </Grid>
          <Grid item lg={6}>
            <Zoom in={true} timeout={1500}>
              <Fab
                className="mt-2"
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => this.handleClose()}
              >
                Cancel
              </Fab>
            </Zoom>
          </Grid>
        </Grid>
      </Suspense>
    )
  }
}

NotifyReason.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(NotifyReason)),
)
