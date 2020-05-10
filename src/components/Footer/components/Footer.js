import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import PropTypes from 'prop-types'
import TwitterIcon from '@material-ui/icons/Twitter'
import YouTubeIcon from '@material-ui/icons/YouTube'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    right: 0,
    flexGrow: 1,
  },
  label: {
    color: '#2a7fff',
  },
})

class Footer extends Component {
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

  handleFeedback = () => {
    this.props.history.push({
      pathname: '/feedback',
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

  handleSignin = () => {
    this.props.history.push('/signin')
  }

  render() {
    const { classes, authenticated } = this.props
    const { value } = this.state
    return (
      <React.Fragment>
        {!authenticated && (
          <section className="primary-bg-color w-full relative">
            <div className="w-max-1200 w-full m-auto relative p-v-80 p-h-20 fl-justify-around fl-items-center fl-wrap">
              <div className="row">
                <div className="col-lg-8 col-md-2 col-sm-2 col-xs-4">
                  <h2 className="w-color">Ready to get started?</h2>
                  <h4 className="w-color">
                    Login with your social account and start sharing opinions.
                  </h4>
                </div>
                <div className="mt-25 col-lg-4 col-md-2 col-sm-2 col-xs-4">
                  <Button
                    onClick={() => this.handleSignin()}
                    size="small"
                    variant="outlined"
                    color="secondary"
                    className="btn-outlined p-2"
                  >
                    login With Social Account
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
        <section>
          <footer className="p-v-30 w-full">
            <div className="w-max-1200 w-full m-auto">
              <div className="row fl fl-justify-between fl-wrap">
                <div className="m-30 col-lg-2 col-md-2 col-sm-2 col-xs-4">
                  <small>
                    <strong className="primary-color">About</strong>
                  </small>
                  <ul>
                    <li className="m-v-10">
                      <a className="cursor" onClick={() => this.handleAbout()}>
                        Writenpost, Inc
                      </a>
                    </li>
                    <li className="m-v-10">
                      <a
                        className="cursor"
                        onClick={() => this.handleCareers()}
                      >
                        Careers
                      </a>
                    </li>
                    <li className="m-v-10">
                      <a
                        className="cursor"
                        onClick={() => this.handleFeedback()}
                      >
                        Feedback
                      </a>
                    </li>
                    <li className="m-v-10">
                      <a
                        className="cursor"
                        onClick={() => this.handleDevelopers()}
                      >
                        Developers
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="m-30 col-lg-2 col-md-2 col-sm-2 col-xs-4">
                  <small>
                    <strong className="primary-color">
                      Community Standards
                    </strong>
                  </small>
                  <ul>
                    <li className="m-v-10">
                      <a className="cursor" onClick={() => this.handleAbout()}>
                        Community
                      </a>
                    </li>
                    <li className="m-v-10">
                      <a
                        className="cursor"
                        onClick={() => this.handleCareers()}
                      >
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="m-30 col-lg-2 col-md-2 col-sm-2 col-xs-4">
                  <small>
                    <strong className="primary-color">Help & Support</strong>
                  </small>
                  <ul>
                    <li className="m-v-10">
                      <a className="cursor" onClick={() => this.handleAbout()}>
                        Help Centre
                      </a>
                    </li>
                    <li className="m-v-10">
                      <a
                        className="cursor"
                        onClick={() => this.handleCareers()}
                      >
                        Terms Of Service
                      </a>
                    </li>
                    <li className="m-v-10">
                      <a
                        className="cursor"
                        onClick={() => this.handleFeedback()}
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="m-30 col-lg-2 col-md-2 col-sm-2 col-xs-4">
                  <small>
                    <strong className="primary-color">Follow Us</strong>
                  </small>
                  <ul>
                    <li className="m-v-10">
                      <a href="https://www.facebook.com" target="_blank">
                        <FacebookIcon color="primary" />
                        &nbsp;Facebook
                      </a>
                    </li>
                    <li className="m-v-10">
                      <a href="https://www.instagram.com" target="_blank">
                        <TwitterIcon color="primary" />
                        &nbsp;Twitter
                      </a>
                    </li>
                    <li className="m-v-10">
                      <a href="https://www.twitter.com/" target="_blank">
                        <InstagramIcon color="primary" />
                        &nbsp;Instagram
                      </a>
                    </li>
                    <li className="m-v-10">
                      <a href="https://www.youtube.com" target="_blank">
                        <YouTubeIcon color="primary" />
                        &nbsp;Youtube
                      </a>
                    </li>
                    <li className="m-v-10">
                      <a href="https://www.instagram.com" target="_blank">
                        <LinkedInIcon color="primary" />
                        &nbsp;Linkedin
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <Divider color="primary" />
              <div className="w-max-1200 w-full m-auto relative p-h-20 fl-justify-around fl-items-center fl-wrap">
                <div className="row">
                  <div className="col-lg-8 col-md-2 col-sm-2 col-xs-4">
                    <span className="mt-5">
                      <b>Writenpost, Inc</b> © 2020
                    </span>
                    <span>
                      &nbsp; Writenpost and Writenpost logo are registered
                      trademarks of Writenpost, Inc.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </React.Fragment>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Footer))
