import * as footerActions from '../../Footer/actions'

import React, { Component } from 'react'

import Feedbacks from './Feedbacks'
import { List } from 'immutable'
import ProfileCard from './card'
import PropTypes from 'prop-types'
import advice from '../../../../assets/advice.svg'
import { connect } from 'react-redux'
import cons from '../../../../assets/cons.svg'
import home from '../../../../assets/people.svg'
import pros from '../../../../assets/pros.svg'
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
    if (this.props.user && this.props.user.size) {
      this.props.history.push(`/dashboard`)
    }
    this.props.getFeedbacks()
  }

  render() {
    const { classes, authenticate } = this.props
    return (
      <React.Fragment>
        <section className="body-section">
          <div className="row">
            <div className="content-column col-lg-5 col-md-12 col-sm-12">
              <div className="inner-column">
                <h2 className="h2-header">Writenpost - The Social Platform</h2>
                <p>Welcome to your social community.</p>
                <p>
                  Join your friends, colleagues, classmates, family members etc
                  on Writenpost.
                </p>
                <p>
                  Writenpost began in co-founder{' '}
                  <code>Hemadri Dasari & Rajesh Pemmasani</code> in 2018 and was
                  officially launched on Jan 5, 2020.
                </p>
              </div>
            </div>
            <div className="image-column col-lg-7 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image">
                  <img src={home} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="body-section">
          <h2 className="h2-header">Our Core Features</h2>
          <p>
            We built this system to help people in sharing feedback about each
            other if they are interested. The core features are knowing
            <code> pros, cons and advice</code> from your colleagues,
            classmates, friends, familie members, etc
          </p>
          <div className="row fl-justify-content">
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
              <ProfileCard
                path={pros}
                title="Pros"
                subTitle="Pros about people"
                content="Think and write pros about people you are interested"
                button={true}
                buttonName="Pros"
                type="home"
                routePath="/pros"
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
              <ProfileCard
                path={cons}
                title="Cons"
                subTitle="Cons about people"
                content="Think and write cons about people you are interested"
                button={true}
                buttonName="Cons"
                type="home"
                routePath="/cons"
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
              <ProfileCard
                path={advice}
                title="Advice"
                subTitle="Advices to people"
                content="Think and write advice about people you are interested"
                button={true}
                buttonName="Advice"
                type="home"
                routePath="/advice"
              />
            </div>
          </div>
        </section>
        <section className="body-section">
          <Feedbacks />
        </section>
      </React.Fragment>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'], List())
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
