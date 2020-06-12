import React, { Component } from 'react'

import Container from '@material-ui/core/Container'
import Facebook from '../../Social/components/Facebook'
import Google from '../../Social/components/Google'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Slide from '@material-ui/core/Slide'
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
        <Container fixed className="pb-5">
          <Grid container spacing={1}>
            <Grid item xs container>
              <Slide
                direction="right"
                in={true}
                timeout={1500}
                mountOnEnter
                unmountOnExit
              >
                <Grid
                  item
                  xs={12}
                  lg={12}
                  md={12}
                  xs={12}
                  xl={12}
                  className="p-1"
                >
                  <div className="pb-5 pl-0">
                    <h1 className="mb-3">Social Logins</h1>
                    <p className="font-size-lg">
                      Make a login using social network accounts
                    </p>
                    <p className="font-size-lg text-black-50">
                      {' '}
                      You knew what? Different social logins but one account.
                      You heard it right.
                    </p>
                    <p className="text-black">
                      For eg: You logged in with Facebook and you got some posts
                      or reactions on profile etc from others. So later on you
                      decided to login with google account instead of using
                      Facebook login so when you login with Google you will see
                      the same data wha you had in Facebook
                    </p>
                    <div className="mt-5">
                      <Facebook />
                      <Google />
                      <Twitter />
                    </div>
                    <small className="d-block pt-3">
                      Clean, intuitive, responsive and beautiful React dashboard
                      powered by Google's Material Design.
                    </small>
                  </div>
                </Grid>
              </Slide>
            </Grid>
          </Grid>
        </Container>
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
