import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import ProfileCard from '../../Home/components/card'
import Rajesh from '../../../../assets/rajesh.jpg'
import Lokesh from '../../../../assets/lokesh.jpg'
import Hemadri from '../../../../assets/hemadri.jpg'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h2 className="h2-header">Who we are</h2>
          <p>
            Feedbacklib is worlds largest social platform, serving 100+
            countries worldwide. The Feedbacklib app offers people to share
            positive, negative and advice to people they are interested.
          </p>

          <p>
            Feedbacklib was founded in Jan 2020 by Rajesh Pemmasani and Hemadri
            Dasari with a mission to build a system for a billion people.
          </p>
          <h2 className="h2-header">The founders</h2>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <ProfileCard
                path={Rajesh}
                title="Rajesh Pemmasani"
                subTitle="CEO & Co-Founder"
                fbPath={'https://www.facebook.com/rajesh.pemmasani'}
                linkedinPath={
                  'https://www.linkedin.com/in/rajesh-pemmasani-56673170/'
                }
                button={true}
                buttonName="Facebook"
                buttonOneName="Linekdin"
                content="AVP at JP Morgan & Co, Singapore"
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <ProfileCard
                path={Lokesh}
                title="Lokesh Pemmasani"
                subTitle="CTO & Co-Founter"
                fbPath={'https://www.facebook.com/lokesh.pemmasani'}
                linkedinPath={
                  'https://www.linkedin.com/in/lokesh-pemmasani-39145a4a/'
                }
                button={true}
                buttonName="Facebook"
                buttonOneName="Linekdin"
                content="Solution Architect II at Ericsson, USA"
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <ProfileCard
                path={Hemadri}
                title="Hemadri Dasari"
                subTitle="Head & Co-Founter"
                fbPath={'https://www.facebook.com/Hemadri.Dasari.1990'}
                linkedinPath={
                  'https://www.linkedin.com/in/hemadri-dasari-15051990/'
                }
                button={true}
                buttonName="Facebook"
                buttonOneName="Linekdin"
                content="Full Stack Developer at Emirates NBD, Dubai"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(About)
