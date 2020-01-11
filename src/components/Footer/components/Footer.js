import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Info from '@material-ui/icons/Info'
import ContactMail from '@material-ui/icons/ContactMail'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import GroupWorkIcon from '@material-ui/icons/GroupWork'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import fbIcon from '../../../../assets/social/fb.svg'
import twitterIcon from '../../../../assets/social/twitter.svg'
import instagramIcon from '../../../../assets/social/instagram.svg'
import youtubeIcon from '../../../../assets/social/youtube.svg'

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    right: 0,
    flexGrow: 1,
  },
  icon: {
    height: 30,
  },
})

class Footer extends React.Component {
  state = {
    value: '',
  }

  handleChange = (event, value) => {
    if (value === 'about') {
      this.props.history.push('/about')
    }
    if (value === 'contact') {
      this.props.history.push('/contact')
    }
    if (value === 'location') {
      this.props.history.push('/location')
    }

    if (value === 'developers') {
      this.props.history.push('/developers')
    }
    this.setState({ value })
    // {!authenticated && <React.Fragment>
    //       <BottomNavigation
    //       value={value}
    //       onChange={this.handleChange}
    //       showLabels
    //       className={classes.root}
    //     >
    //       <BottomNavigationAction label="About" value="about" icon={<Info color="primary"/>} />
    //       <BottomNavigationAction label="Contact" value="contact" icon={<ContactMail color="primary"/>} />
    //       <BottomNavigationAction label="Location" value="location" icon={<LocationOnIcon color="primary"/>} />
    //       <BottomNavigationAction label="Developers" value="developers" icon={<GroupWorkIcon color="primary"/>} />
    //     </BottomNavigation>
    //     </React.Fragment>}
    //     {!authenticated && <React.Fragment>
    //         <Switch>
    //           <Route path='/about'component={About}/>
    //           <Route path='/contact' component={Contact}/>
    //           <Route path='/location' component={Location}/>
    //           <Route path='/developers' component={Developers}/>
    //         </Switch>
    //     </React.Fragment>}
  }

  handleAbout = () => {
    this.props.history.push({
      pathname: '/about',
    })
  }

  handleContact = () => {
    this.props.history.push({
      pathname: '/contact',
    })
  }
  handleCareers = () => {
    this.props.history.push({
      pathname: '/careers',
    })
  }
  handleDevelopers = () => {
    this.props.history.push({
      pathname: '/developers',
    })
  }

  render() {
    const { classes, authenticated } = this.props
    const { value } = this.state
    return (
      <React.Fragment>
        <footer className="footer-v2">
          <div className="max-width">
            <div className="footer">
              <div className="row-footer border-bottom social">
                <div className="title">Discover Us</div>
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.handleAbout()}
                >
                  About Us
                </a>
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.handleCareers()}
                >
                  Careers
                </a>
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.handleContact()}
                >
                  Contact Us
                </a>
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.handleDevelopers()}
                >
                  Developers
                </a>
              </div>
              <div className="row-footer border-bottom social">
                <div className="title">Social Links</div>
                <a href="https://www.facebook.com" target="_blank">
                  <img className={classes.icon} src={fbIcon} />
                </a>
                <a href="https://www.instagram.com" target="_blank">
                  <img className={classes.icon} src={twitterIcon} />
                </a>
                <a href="https://www.twitter.com/" target="_blank">
                  <img className={classes.icon} src={instagramIcon} />
                </a>
                <a href="https://www.youtube.com" target="_blank">
                  <img className={classes.icon} src={youtubeIcon} />
                </a>
              </div>
            </div>
            <div className="row-footer tc-links clearfix">
              <div className="copyrights">
                Copyright © 2020 Feedback Lib Corporation Pvt. Ltd. All rights
                reserved.
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Footer))
