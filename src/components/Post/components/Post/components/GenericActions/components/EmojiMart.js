import 'emoji-mart/css/emoji-mart.css'

import React, { Component } from 'react'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { Picker } from 'emoji-mart'
import Popover from '@material-ui/core/Popover'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

class EmojiMart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      anchorEl: null,
    }
  }

  showPopover = event => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  closePopover = () => {
    this.setState({
      anchorEl: null,
      open: false,
    })
    this.props.showEmojiPicker()
  }

  handleClickAway = () => {
    this.setState({
      anchorEl: null,
      open: false,
    })
    this.props.showEmojiPicker()
  }

  addEmoji = e => {
    this.props.getEmoji(e.native)
  }

  render() {
    const { classes, id } = this.props
    const { message, errorMessage } = this.state
    return (
      <React.Fragment>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <Popover
            open={open}
            anchorEl={document.getElementById(id)}
            onClick={() => this.closePopover()}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            disableAutoFocus={true}
            disableEnforceFocus={true}
            style={{ marginTop: 10, overflow: 'auto' }}
          >
            <Picker
              onSelect={this.addEmoji}
              style={{ bottom: '20px', right: '20px' }}
            />
          </Popover>
        </ClickAwayListener>
      </React.Fragment>
    )
  }
}

EmojiMart.propTypes = {}

const mapStateToProps = state => {
  return {}
}

const actionsToProps = {}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(EmojiMart)),
)
