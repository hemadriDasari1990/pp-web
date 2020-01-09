import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    color: '#616b8f',
    position: 'absolute', left: '50%', top: '50%',
  },
});

class Loader extends Component {
  state = {
    completed: 0,
    showLoader: true
  };

  componentDidMount() {
    this.loaderTimer = setTimeout(() => {
      this.setState({
        showLoader: false
      });
    }, 3000)
    this.timer = setInterval(this.progress, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    clearTimeout(this.loaderTimer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 10 });
  };

  render() {
    const { classes, authenticated } = this.props;
    const { completed, showLoader } = this.state;
    return (
      <div className="content">
        {showLoader && <CircularProgress disableShrink className={classes.progress}/>}
      </div>
    );
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);