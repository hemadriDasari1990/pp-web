import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
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
              <div className="row row-footer border-bottom social">
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4">
                  Discover Us
                </div>
                <div style={{ marginLeft: 20, marginTop: 10 }}>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.handleAbout()}
                  >
                    About
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
                    Contact
                  </a>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.handleDevelopers()}
                  >
                    Developers
                  </a>
                </div>
              </div>
              <div className="row row-footer border-bottom social">
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4">
                  Social Links
                </div>
                <div style={{ marginLeft: 20, marginTop: 10 }}>
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
            </div>
            <div className="row-footer tc-links clearfix">
              <div className="copyrights">
                Copyright © 2020 Feedback Lib Pvt. Ltd. All rights reserved.
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
