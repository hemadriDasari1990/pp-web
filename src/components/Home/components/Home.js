import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
// import Country from '../../Countries/components/Country';
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import PaperComponent from '../../Paper/components/Paper'
import CardComponent from '../../Card/components/Card'
import Loader from '../../Loader/components/Loader'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import { Map, List, fromJS } from 'immutable'
import ProfileCard from './card'
import positive from '../../../../assets/positive.jpg'
import negative from '../../../../assets/negative.jpg'
import advice from '../../../../assets/advice.jpg'

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
    const colors = [
      '#E65100',
      '#E91E63',
      '#3949AB',
      '#FFA000',
      '#8BC34A',
      '#7E57C2',
    ]
    const text = ['P', 'E', '0', 'P', 'L', 'E', 'S', 'P', 'O', 'S', 'T']
    const content = `Material-UI came about from our love of React and Google's Material Design. We're currently using it on a project at Call-Em-All and plan on adding to it and making it better in the coming months.`
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
        <div className="home-background margin-bottom"></div>
        <div className="container ">
          <h2 className="h2-header">Our Core Features</h2>
          <p>
            We built this system to help people to share feedback about people
            they are interested. This system core features are knowing about
            positive, negative and advice from your colleagues, friends,
            relatives etc
          </p>
          <div className="row align-card">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <ProfileCard
                path={positive}
                title="Positive"
                subTitle="Positive about people"
                content="Think and write positive about people you are interested"
                button={true}
                buttonName="Positive"
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <ProfileCard
                path={negative}
                title="Negative"
                subTitle="Negative about people"
                content="Think and write negative about people you are interested"
                button={true}
                buttonName="Negative"
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <ProfileCard
                path={advice}
                title="Advice"
                subTitle="Advices to people"
                content="Think and write advice about people you are interested"
                button={true}
                buttonName="Advice"
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
