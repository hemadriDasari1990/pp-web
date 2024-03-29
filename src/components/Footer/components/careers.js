import React, { Component } from 'react'

import Container from '@material-ui/core/Container'
import ListComponent from './list'
import Zoom from '@material-ui/core/Zoom'
import { withRouter } from 'react-router-dom'

class Careers extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Container fixed>
          <Zoom in={true} timeout={2000}>
            <h1 className="mb-3">Careers</h1>
          </Zoom>
          <p>Help us build a social platform that helps our society.</p>
          <h2 className="margin-bottom">Working Here</h2>
          <p>
            Billions of people rely on writenpost to post information about
            friends, colleagues, family members etc. Living up to such great
            responsibility starts with hiring excellent people and providing
            them with an environment in which they can do their best work.
          </p>
          <p>
            People generally do their best work when they're able to live their
            best lives outside of work. All of our position are remote so you
            can live near whoever, or whatever, is most important to you.
            Competitive salaries and 100% 401(k) matching help you to reach your
            financial goals. Top-tier health insurance gives you peace of mind
            and great options for staying healthy. Flexible PTO policies let you
            manage your time with less stress. Generous parental leave means you
            don't have to choose between your work and spending enough time with
            new additions to your family.
          </p>
          <h2 className="margin-bottom">Open Positions</h2>
          <p className="margin-bottom text-center">
            Sorry! We do not have open positions now. Please come back and check
            after sometime.
          </p>
          <h2 className="margin-bottom">Our Core Values</h2>
          <ListComponent />
        </Container>
      </React.Fragment>
    )
  }
}

export default withRouter(Careers)
