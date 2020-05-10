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
            <div className="p-h-20 fl-justify-around fl-items-center inner-column">
              <h1 className="m-l-18">Social Logins</h1>
              <h6 className="m-l-18">
                Make a login using social network accounts
              </h6>
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
