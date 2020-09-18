import React, { Component } from 'react'

import ArrowIcon from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Draggable from 'react-draggable'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(0),
    color: theme.palette.grey[500],
  },
})

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}

// const DialogTitle = withStyles(styles)((props) => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
//       <Typography variant="h4">{children}</Typography>
//       {onClose ? (
//         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// });

class ResponsiveDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open,
    }

    this.createTimer = null
  }

  handleCreate = () => {
    this.createTimer = setTimeout(() => {
      this.setState({
        open: !this.state.open,
      })
    }, 2000)
    this.props.handleSave()
  }

  handleCancel = () => {
    this.setState({
      open: !this.state.open,
    })
    this.props.handleClose()
  }

  componentWillUnmount() {
    this.createTimer ? clearTimeout(this.createTimer) : null
  }
  render() {
    const {
      fullScreen,
      handleClose,
      title,
      children,
      createButtonName,
      cancellButtonName,
      dialogText,
      classes,
    } = this.props
    const { open } = this.state
    return (
      <React.Fragment>
        <Dialog
          // fullScreen={fullScreen}
          PaperComponent={PaperComponent}
          open={open}
          onClose={() => this.handleCancel()}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle
            style={{ cursor: 'move' }}
            id="draggable-dialog-title"
            className="text-center b-text"
            onClose={() => this.handleCancel()}
          >
            {title}
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText>{dialogText}</DialogContentText>
            {children}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleCreate()}
              variant="outlined"
              color="primary"
            >
              {createButtonName} <ArrowIcon color="primary" />
            </Button>
            <Button
              onClick={() => this.handleCancel()}
              variant="outlined"
              color="primary"
            >
              {cancellButtonName} <ArrowIcon color="primary" />
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
}

export default withMobileDialog()(withStyles(styles)(ResponsiveDialog))
