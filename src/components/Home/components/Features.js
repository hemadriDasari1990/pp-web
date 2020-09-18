import React, { Component } from 'react'

import AdviceIcon from '@material-ui/icons/CheckCircle'
import ArrowIcon from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'
import ConsIcon from '@material-ui/icons/RemoveCircleOutlined'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import ProsIcon from '@material-ui/icons/AddCircleOutlined'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  icon: {
    width: 60,
    height: 60,
  },
})

class Features extends Component {
  handleButton = path => {
    this.props.history.push(path)
  }

  renderIcon = () => {
    const { classes, path } = this.props
    let element = null
    switch (path.toLowerCase()) {
      case 'pros':
        element = <ProsIcon className={classes.icon} color="primary" />
        break
      case 'cons':
        element = <ConsIcon className={classes.icon} color="primary" />
        break
      case 'advice':
        element = <AdviceIcon className={classes.icon} color="primary" />
        break
      default:
        break
    }
    return element
  }
  render() {
    const {
      classes,
      path,
      title,
      message,
      subTitle,
      fbPath,
      linkedinPath,
      content,
      button,
      buttonName,
      buttonOneName,
      type,
      routePath,
    } = this.props
    return (
      <React.Fragment>
        <IconButton>{this.renderIcon()}</IconButton>
        <h3 className="font-size-lg font-weight-bold mt-4">{title}</h3>
        <p classname="mt-2 text-black-50">{message}</p>
        <Button variant="contained" className="mt-1">
          Continue Reading <ArrowIcon color="secondary" />
        </Button>
      </React.Fragment>
    )
  }
}

Features.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(connect(null, null)(withStyles(styles)(Features)))
