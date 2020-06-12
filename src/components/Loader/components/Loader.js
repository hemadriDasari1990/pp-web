import React, { Component } from 'react'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'

import CircularProgress from '@material-ui/core/CircularProgress'
// import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import loader from '../../../../assets/loader/loader.svg'

const styles = theme => ({
  progress: {
    color: '#5383ff',
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
})

// Inspired by the Facebook spinners.
const useStylesFacebook = makeStyles({
  root: {
    position: 'relative',
  },
  top: {
    color: '#eef3fd',
  },
  bottom: {
    color: '#5383ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
})

function FacebookProgress(props) {
  const classes = useStylesFacebook()

  return (
    <div>
      <CircularProgress
        variant="determinate"
        value={100}
        className={classes.top}
        size={30}
        thickness={4}
        {...props}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={30}
        thickness={4}
        {...props}
      />
    </div>
  )
}

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
      <div className="loader">
        {/* {showLoader ? (
          <img
            src={loader}
            width={30}
            height={30}
            className={classes.progress}
          />
        ) : null} */}
        {showLoader ? <FacebookProgress /> : null}
      </div>
    )
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Loader)
