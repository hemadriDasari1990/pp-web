import * as footerActions from '../../Footer/actions'

import React, { Component } from 'react'

import ArrowIcon from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Features from './Features'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Slide from '@material-ui/core/Slide'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  card: {
    maxWidth: 545,
    transition:
      'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
})

class Home extends Component {
  state = {
    completed: 0,
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.history.push(`/dashboard`)
    }
    this.props.getFeedbacks()
  }

  handleSignin = () => {
    this.props.history.push('/signin')
  }

  render() {
    const { classes, authenticate } = this.props
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
                <Grid item xs={12} lg={12} xs={12} className="p-1">
                  <div className="pb-5 pl-0">
                    <h1 className="mb-3">Writenpost - The Social Platform</h1>
                    <p className="font-size-lg">
                      Welcome to your social community.
                    </p>
                    <p className="font-size-lg text-black-50">
                      With this premium admin dashboard template you can create
                      intuitive products following Google's Material Design
                      specifications. Fully responsive and powered by React and
                      Material-UI components framework.
                    </p>
                    <p className="text-black">
                      Check out the live demo previews to see all the features
                      and components in action.
                    </p>
                    <Grid container>
                      <Grid item xs={12} lg={3} className="pt-3">
                        <Tooltip title="Get Started">
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => this.handleSignin()}
                          >
                            Get Started &nbsp;
                            <ArrowIcon color="secondary" />
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12} lg={3} className="pt-3">
                        <Tooltip title="">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => this.handleSignin()}
                          >
                            Documentation <ArrowIcon color="primary" />
                          </Button>
                        </Tooltip>
                      </Grid>
                      {/* <Grid item xs={1} lg={3} xs={4}>
                    <Tooltip title="Find out more about this website">
                      <HelpIcon className="ml-2"/>
                    </Tooltip>
                    </Grid> */}
                    </Grid>
                    <small className="d-block pt-3">
                      Clean, intuitive, responsive and beautiful React dashboard
                      powered by Google's Material Design.
                    </small>
                  </div>
                </Grid>
              </Slide>
            </Grid>
          </Grid>
          <div className="pt-5">
            <dic className="pt-5 pb-5">
              <div className="mt-3">
                <Slide
                  direction="right"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <h3 className="py-3 px-2">Our Core Features</h3>
                </Slide>
                <Slide
                  direction="left"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <p className="text-black-50 font-size-lg mb-5">
                    We built this system to help people in sharing feedback
                    about each other if they are interested. The core features
                    are knowing
                    <code> pros, cons and advice</code> from your colleagues,
                    classmates, friends, familie members, etc
                  </p>
                </Slide>
              </div>
            </dic>
          </div>
          <Grid container spacing={4}>
            <Zoom in={true} timeout={2000}>
              <Grid item lg={4} xs={12}>
                <Features
                  path="pros"
                  title="Pros"
                  message="But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and account of the system."
                />
              </Grid>
            </Zoom>
            <Zoom in={true} timeout={2000}>
              <Grid item lg={4} xs={12}>
                <Features
                  path="cons"
                  title="Cons"
                  message="But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and account of the system."
                />
              </Grid>
            </Zoom>
            <Zoom in={true} timeout={2000}>
              <Grid item lg={4} xs={12}>
                <Features
                  path="advice"
                  title="Advice"
                  message="But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and account of the system."
                />
              </Grid>
            </Zoom>
          </Grid>
        </Container>
        <div className="primary-bg-color">
          <Container fixed>
            <div className="pt-5">
              <div className="pt-5 pb-5">
                <div className="mt-3">
                  <Slide
                    direction="right"
                    in={true}
                    timeout={1500}
                    mountOnEnter
                    unmountOnExit
                  >
                    <h3 className="py-3 px-2 w-color">Customer Stories</h3>
                  </Slide>
                  <Slide
                    direction="left"
                    in={true}
                    timeout={1500}
                    mountOnEnter
                    unmountOnExit
                  >
                    <p className="font-size-lg mb-5 w-color">
                      We built this system to help people in sharing feedback
                      about each other if they are interested. The core features
                      are knowing
                      <code> pros, cons and advice</code> from your colleagues,
                      classmates, friends, familie members, etc
                    </p>
                  </Slide>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div>
          <Container fixed>
            <div className="pt-5">
              <div className="pt-5 pb-5">
                <div className="mt-3">
                  <Slide
                    direction="right"
                    in={true}
                    timeout={1500}
                    mountOnEnter
                    unmountOnExit
                  >
                    <h3 className="py-3 px-2">Additional Features</h3>
                  </Slide>
                  <Slide
                    direction="left"
                    in={true}
                    timeout={1500}
                    mountOnEnter
                    unmountOnExit
                  >
                    <p className="text-black-50 font-size-lg mb-5">
                      We built this system to help people in sharing feedback
                      about each other if they are interested. The core features
                      are knowing
                      <code> pros, cons and advice</code> from your colleagues,
                      classmates, friends, familie members, etc
                    </p>
                  </Slide>
                </div>
              </div>
            </div>
          </Container>
          <div className="primary-bg-color">
            <Container fixed>
              <div className="w-full m-auto relative p-v-80 p-h-20 fl-justify-around fl-items-center fl-wrap">
                <div className="row">
                  <Slide
                    direction="right"
                    in={true}
                    timeout={1500}
                    mountOnEnter
                    unmountOnExit
                  >
                    <div className="col-lg-8 col-md-2 col-sm-2 col-xs-4">
                      <h2 className="w-color">Ready to get started?</h2>
                      <h4 className="w-color">
                        Login with your social account and start sharing
                        opinions.
                      </h4>
                    </div>
                  </Slide>
                  <Slide
                    direction="up"
                    in={true}
                    timeout={1500}
                    mountOnEnter
                    unmountOnExit
                  >
                    <div className="mt-25 col-lg-4 col-md-2 col-sm-2 col-xs-4">
                      <Button
                        onClick={() => this.handleSignin()}
                        size="small"
                        variant="outlinedSecondary"
                        className="p-2"
                      >
                        Click Here <ArrowIcon color="secondary" />
                      </Button>
                    </div>
                  </Slide>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const authenticate = state.getIn(['user', 'auth'], false)

  return {
    user,
    authenticate,
  }
}

const actionsToProps = {
  getFeedbacks: footerActions.getFeedbacks,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Home)),
)
