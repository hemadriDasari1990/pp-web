import React, { Component } from 'react'

import Container from '@material-ui/core/Container'
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Hemadri from '../../../../assets/hemadri.jpg'
import IconButton from '@material-ui/core/IconButton'
import Lokesh from '../../../../assets/lokesh.jpg'
import PeopleIcon from '@material-ui/icons/People'
import ProfileCard from '../../Home/components/card'
import Rajesh from '../../../../assets/rajesh.jpg'
import Zoom from '@material-ui/core/Zoom'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  icon: {
    width: 60,
    height: 60,
  },
})

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { classes } = this.props
    return (
      <Container fixed>
        <Zoom in={true} timeout={2000}>
          <h1 className="mb-3">Who we are</h1>
        </Zoom>
        <p className="font-size-lg text-black-50">
          Writenpost is a social platform build to serve people to share pros,
          cons and advice to people they are interested. This app was founded in
          2018 by <code>Hemadri Dasari</code> & <code>Rajesh Pemmasani</code>{' '}
          with a mission to build a system for billion people.
        </p>
        <div>
          <h2 className="text-center mb-5 mt-5">The founders</h2>
          <Grid container spacing={4}>
            <Grid item lg={4} xs={12}>
              <Zoom in={true} timeout={2000}>
                <ProfileCard
                  path={Hemadri}
                  title="Hemadri Dasari"
                  subTitle="Founder"
                  fbPath={'https://www.facebook.com/Hemadri.Dasari.1990'}
                  linkedinPath={
                    'https://www.linkedin.com/in/hemadri-dasari-15051990/'
                  }
                  button={true}
                  buttonName="Facebook"
                  buttonOneName="Linekdin"
                  content="Full Stack Developer at Emirates NBD, Dubai"
                  type=""
                />
              </Zoom>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Zoom in={true} timeout={2000}>
                <ProfileCard
                  path={Rajesh}
                  title="Rajesh Pemmasani"
                  subTitle="Co-Founder"
                  fbPath={'https://www.facebook.com/rajesh.pemmasani'}
                  linkedinPath={
                    'https://www.linkedin.com/in/rajesh-pemmasani-56673170/'
                  }
                  button={true}
                  buttonName="Facebook"
                  buttonOneName="Linekdin"
                  content="AVP at JP Morgan & Co, Singapore"
                  type=""
                />
              </Zoom>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Zoom in={true} timeout={2000}>
                <ProfileCard
                  path={Lokesh}
                  title="Lokesh Pemmasani"
                  subTitle="Co-Founder"
                  fbPath={'https://www.facebook.com/lokesh.pemmasani'}
                  linkedinPath={
                    'https://www.linkedin.com/in/lokesh-pemmasani-39145a4a/'
                  }
                  button={true}
                  buttonName="Facebook"
                  buttonOneName="Linekdin"
                  content="Solution Architect II at Ericsson, USA"
                  type=""
                />
              </Zoom>
            </Grid>
          </Grid>
        </div>
        <div>
          <h2 className="text-center mb-5 mt-5">Leadership Team</h2>
          <Grid container spacing={4}>
            <Grid item lg={3} xs={12}>
              <Zoom in={true} timeout={2000}>
                <ProfileCard
                  path={Hemadri}
                  title="Hemadri Dasari"
                  subTitle="Founder"
                  fbPath={'https://www.facebook.com/Hemadri.Dasari.1990'}
                  linkedinPath={
                    'https://www.linkedin.com/in/hemadri-dasari-15051990/'
                  }
                  button={true}
                  buttonName="Facebook"
                  buttonOneName="Linekdin"
                  content="Full Stack Developer at Emirates NBD, Dubai"
                  type=""
                />
              </Zoom>
            </Grid>
            <Grid item lg={3} xs={12}>
              <Zoom in={true} timeout={2000}>
                <ProfileCard
                  path={Rajesh}
                  title="Rajesh Pemmasani"
                  subTitle="Co-Founder"
                  fbPath={'https://www.facebook.com/rajesh.pemmasani'}
                  linkedinPath={
                    'https://www.linkedin.com/in/rajesh-pemmasani-56673170/'
                  }
                  button={true}
                  buttonName="Facebook"
                  buttonOneName="Linekdin"
                  content="AVP at JP Morgan & Co, Singapore"
                  type=""
                />
              </Zoom>
            </Grid>
            <Grid item lg={3} xs={12}>
              <Zoom in={true} timeout={2000}>
                <ProfileCard
                  path={Lokesh}
                  title="Lokesh Pemmasani"
                  subTitle="Co-Founder"
                  fbPath={'https://www.facebook.com/lokesh.pemmasani'}
                  linkedinPath={
                    'https://www.linkedin.com/in/lokesh-pemmasani-39145a4a/'
                  }
                  button={true}
                  buttonName="Facebook"
                  buttonOneName="Linekdin"
                  content="Solution Architect II at Ericsson, USA"
                  type=""
                />
              </Zoom>
            </Grid>
            <Grid item lg={3} xs={12}>
              <Zoom in={true} timeout={2000}>
                <ProfileCard
                  path={Lokesh}
                  title="Lokesh Pemmasani"
                  subTitle="Co-Founder"
                  fbPath={'https://www.facebook.com/lokesh.pemmasani'}
                  linkedinPath={
                    'https://www.linkedin.com/in/lokesh-pemmasani-39145a4a/'
                  }
                  button={true}
                  buttonName="Facebook"
                  buttonOneName="Linekdin"
                  content="Solution Architect II at Ericsson, USA"
                  type=""
                />
              </Zoom>
            </Grid>
            <Grid item lg={3} xs={12}>
              <Zoom in={true} timeout={2000}>
                <ProfileCard
                  path={Lokesh}
                  title="Lokesh Pemmasani"
                  subTitle="Co-Founder"
                  fbPath={'https://www.facebook.com/lokesh.pemmasani'}
                  linkedinPath={
                    'https://www.linkedin.com/in/lokesh-pemmasani-39145a4a/'
                  }
                  button={true}
                  buttonName="Facebook"
                  buttonOneName="Linekdin"
                  content="Solution Architect II at Ericsson, USA"
                  type=""
                />
              </Zoom>
            </Grid>
            <Grid item lg={3} xs={12}>
              <Zoom in={true} timeout={2000}>
                <ProfileCard
                  path={Lokesh}
                  title="Lokesh Pemmasani"
                  subTitle="Co-Founder"
                  fbPath={'https://www.facebook.com/lokesh.pemmasani'}
                  linkedinPath={
                    'https://www.linkedin.com/in/lokesh-pemmasani-39145a4a/'
                  }
                  button={true}
                  buttonName="Facebook"
                  buttonOneName="Linekdin"
                  content="Solution Architect II at Ericsson, USA"
                  type=""
                />
              </Zoom>
            </Grid>
          </Grid>
        </div>
        <div>
          <h2 className="text-center mb-5 mt-5">Stats and Figures</h2>
          <Grid container spacing={4}>
            <Grid item lg={4} xs={12}>
              <div className="text-center py-3">
                <Zoom in={true} timeout={2000}>
                  <PeopleIcon color="primary" className={classes.icon} />
                </Zoom>
                <h3 className="font-weight-bold mt-1 font-size-xl">30k</h3>
                <p className="text-black-50">Users</p>
              </div>
            </Grid>
            <Grid item lg={4} xs={12}>
              <div className="text-center py-3">
                <Zoom in={true} timeout={2000}>
                  <DynamicFeedIcon color="primary" className={classes.icon} />
                </Zoom>
                <h3 className="font-weight-bold mt-1 font-size-xl">500M</h3>
                <p className="text-black-50">Total posts</p>
              </div>
            </Grid>
            <Grid item lg={4} xs={12}>
              <div className="text-center py-3">
                <Zoom in={true} timeout={2000}>
                  <PeopleIcon color="primary" className={classes.icon} />
                </Zoom>
                <h3 className="font-weight-bold mt-1 font-size-xl">30B</h3>
                <p className="text-black-50">Users</p>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    )
  }
}

export default withRouter(withStyles(styles)(About))
