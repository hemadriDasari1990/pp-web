import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List } from 'immutable'
import Google from '../../Social/components/Google'
import Facebook from '../../Social/components/Facebook'
import Linkedin from '../../Social/components/Linkedin'
import Twitter from '../../Social/components/Twitter'

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
            <div className="inner-column">
              <h1 className="text-center">Social Login</h1>
              <h4 className="text-center">
                Make a login using with social network accounts
              </h4>
              <br />
            </div>
          </div>
          <div className="content-column col-lg-5 col-md-12 col-sm-12">
            <div className="inner-column">
              <Facebook />
              <Google />
              <Linkedin />
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
