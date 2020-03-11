import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { List } from 'immutable'
import ProfileCard from './card'
import pros from '../../../../assets/pros.svg'
import cons from '../../../../assets/cons.svg'
import advice from '../../../../assets/advice.svg'

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
      this.props.history.push('/dashboard')
    }
  }
  render() {
    const { classes, authenticate } = this.props
    return (
      <React.Fragment>
        {/*<div className="content">
        {text.map((text, index) => (
          <Fab size="small" key={'Key-'+index} aria-label="Delete" style={{
            backgroundColor: colors[Math.floor(Math.random()*colors.length)], margin: 30, color: '#fff'
          }}>
            {text[Math.floor(Math.random()*text.length)]}
          </Fab>
        ))}

        </div> */}
        <div className="col-lg-12 col-md-12 col-sm-4 col-xs-3">
          <div className="home-background margin-bottom">
            <div className=""></div>
          </div>
        </div>
        <div className="container">
          <h2 className="h2-header">Our Core Features</h2>
          <p>
            We built this system to help people to share feedback about people
            they are interested. This system core features are knowing about
            <code> pros, cons and advice</code> from your colleagues, friends,
            families, etc
          </p>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <ProfileCard
                path={pros}
                title="Pros"
                subTitle="Pros about people"
                content="Think and write pros about people you are interested"
                button={true}
                buttonName="Pros"
                type="home"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <ProfileCard
                path={cons}
                title="Cons"
                subTitle="Cons about people"
                content="Think and write cons about people you are interested"
                button={true}
                buttonName="Cons"
                type="home"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <ProfileCard
                path={advice}
                title="Advice"
                subTitle="Advices to people"
                content="Think and write advice about people you are interested"
                button={true}
                buttonName="Advice"
                type="home"
              />
            </div>
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
  const user = state.getIn(['user', 'data'], List())
  const authenticate = state.getIn(['user', 'auth'], false)

  return {
    user,
    authenticate,
  }
}

export default withRouter(
  connect(mapStateToProps, null)(withStyles(styles)(Home)),
)
