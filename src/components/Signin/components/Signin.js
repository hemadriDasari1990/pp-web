import React, { Component } from 'react'

import Facebook from '../../Social/components/Facebook'
import Google from '../../Social/components/Google'
import Linkedin from '../../Social/components/Linkedin'
import PropTypes from 'prop-types'
import Social from '../../../../assets/social.svg'
import Twitter from '../../Social/components/Twitter'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  button: {},
  small: {
    width: 35,
    height: 35,
    marginRight: 15,
    textTransform: 'capitalize !important',
  },
})

class Signin extends Component {
  state = {}

  componentDidMount() {}
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <div className="row clearfix">
          <div className="image-column col-lg-7 col-md-12 col-sm-12">
            <div className="p-h-20 fl-justify-around fl-items-center nner-column">
              <div className="image">
                <img src={Social} />
              </div>
            </div>
          </div>
          <div className="content-column col-lg-5 col-md-12 col-sm-12">
            <div className="m-l-18 p-h-20 fl-justify-around fl-items-center inner-column">
              <h1>Social Logins</h1>
              <p>Make a login using social network accounts</p>
              <span>
                You knew what? Different social logins but one account. You
                heard it right.
              </span>
              <br />
              <br />
              <span>
                For eg: You logged in with Facebook and you got some posts or
                reactions on profile etc from others. So later on you decided to
                login with google account instead of using Facebook login so
                when you login with Google you will see the same data wha you
                had in Facebook
              </span>
              <br />
              <br />
              <Facebook />
              <Google />
              {/* <Linkedin /> */}
              <Twitter />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {}
}

export default withRouter(
  connect(mapStateToProps, null)(withStyles(styles)(Signin)),
)
