import React, { Component } from 'react'

import Hemadri from '../../../../assets/hemadri.jpg'
import Lokesh from '../../../../assets/lokesh.jpg'
import ProfileCard from '../../Home/components/card'
import Rajesh from '../../../../assets/rajesh.jpg'
import Slide from '@material-ui/core/Slide'
import Zoom from '@material-ui/core/Zoom'
import { withRouter } from 'react-router-dom'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <Zoom in={true} timeout={2000}>
          <h2 className="h2-header">Who we are</h2>
        </Zoom>
        <p>
          Writenpost is a social platform build to serve people to share pros,
          cons and advice to people they are interested. This app was founded in
          2018 by <code>Hemadri Dasari</code> & <code>Rajesh Pemmasani</code>{' '}
          with a mission to build a system for billion people.
        </p>
        <h2 className="h2-header">The founders</h2>
        <div className="row">
          <Zoom in={true} timeout={2000}>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
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
            </div>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
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
            </div>
          </Zoom>
          <Zoom in={true} timeout={2000}>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
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
            </div>
          </Zoom>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(About)
