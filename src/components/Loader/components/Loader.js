import React, { Component } from 'react'

import PropTypes from 'prop-types'
import loader from '../../../../assets/loader/loader.svg'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  progress: {
    color: '#2a7fff',
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
})

class Loader extends Component {
  state = {
    completed: 0,
    showLoader: true,
  }

  componentDidMount() {
    this.loaderTimer = setTimeout(() => {
      this.setState({
        showLoader: false,
      })
    }, 3000)
    this.timer = setInterval(this.progress, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    clearTimeout(this.loaderTimer)
  }

  progress = () => {
    const { completed } = this.state
    this.setState({ completed: completed >= 100 ? 0 : completed + 10 })
  }

  render() {
    const { classes } = this.props
    const { completed, showLoader } = this.state
    return (
      <div className="content">
        {showLoader ? (
          <img
            src={loader}
            width={30}
            height={30}
            className={classes.progress}
          />
        ) : null}
      </div>
    )
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Loader)
