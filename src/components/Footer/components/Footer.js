import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Info from '@material-ui/icons/Info';
import ContactMail from '@material-ui/icons/ContactMail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { BrowserRouter as Router, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Location from './Location';
import Developers from './developers';

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    right:0
  },
};

class Footer extends React.Component {
  state = {
    value: '',
  };

  handleChange = (event, value) => {
    if(value === 'about'){
      this.props.history.push('/about');
    }
    if(value === 'contact'){
      this.props.history.push('/contact');
    }
    if(value === 'location'){
      this.props.history.push('/location');
    }

    if(value === 'developers'){
      this.props.history.push('/developers');
    }
    this.setState({ value });
  };

  render() {
    const { classes, authenticated } = this.props;
    const { value } = this.state;
    return (
      <div style={{marginTop: 100}}>
        {!authenticated && <React.Fragment>
          <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="About" value="about" icon={<Info color="primary"/>} />
          <BottomNavigationAction label="Contact" value="contact" icon={<ContactMail color="primary"/>} />
          <BottomNavigationAction label="Location" value="location" icon={<LocationOnIcon color="primary"/>} />
          <BottomNavigationAction label="Developers" value="developers" icon={<GroupWorkIcon color="primary"/>} />
        </BottomNavigation>
        </React.Fragment>}
        {!authenticated && <React.Fragment>
            <Switch>
              <Route path='/about'component={About}/>
              <Route path='/contact' component={Contact}/>
              <Route path='/location' component={Location}/>
              <Route path='/developers' component={Developers}/>
            </Switch>
        </React.Fragment>}
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Footer));
