import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// import Country from '../../Countries/components/Country';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import PaperComponent from '../../Paper/components/Paper';
import CardComponent from '../../Card/components/Card';
import Loader from '../../Loader/components/Loader';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import {Map, List, fromJS} from 'immutable';

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
});

class Home extends Component {
  state = {
    completed: 0
  }

  componentDidMount(){
    if(this.props.user && this.props.user.size){
      this.props.history.push('/dashboard');
    }
  }
  render(){
    const { classes, authenticate } = this.props;
    const colors = ['#E65100', '#E91E63', '#3949AB', '#FFA000', '#8BC34A', '#7E57C2'];
    const text = ['P', 'E', '0', 'P', 'L', 'E', 'S', 'P', 'O', 'S', 'T'];
    const content = `Material-UI came about from our love of React and Google's Material Design. We're currently using it on a project at Call-Em-All and plan on adding to it and making it better in the coming months.`;
    return (
      <React.Fragment>
      <div className="content">
        {!authenticate && text.map((text, index) => (
          <Fab size="small" key={'Key-'+index} aria-label="Delete" style={{
            backgroundColor: colors[Math.floor(Math.random()*colors.length)], margin: 30, color: '#fff'
          }}>
            {text[Math.floor(Math.random()*text.length)]}
          </Fab>
        ))}
        </div>
        </React.Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'], List());
  const authenticate = state.getIn(['user', 'auth'], false);

  return {
    user,
    authenticate
  };
}

export default withRouter(connect(mapStateToProps, null)(withStyles(styles)(Home)))