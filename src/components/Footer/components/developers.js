import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch,
} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ListComponent from './list'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import rajesh from '../../../../assets/rajesh.jpg'
import lokesh from '../../../../assets/lokesh.jpg'
import hemadri from '../../../../assets/hemadri.jpg'

const styles = {
  avatar: {
    margin: 10,
    width: 300,
    height: 300,
  },
  root: {
    marginTop: 0,
    padding: 50,
    width: '100%',
    textAlign: 'center',
  },
}

class Developers extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <div className="container">
          <h2 className="h2-header">We are small team of developers</h2>
          <p>
            We started this project as an experienment as we wanted to build
            something that helps people to communicate and understand what
            people are thinking about you. This idea has born between Hemadri
            Dasari and Rajesh Pemmasani in the year 2018. Hemadri Dasari as a
            developer intially started devloping this project.
          </p>
          <List className={classes.root}>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Rajesh Pemmasani" src={rajesh}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Rajesh Pemmasani"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          I am currently working as Assistant Vice President at
                          JP Morgan & Co, Singapore
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Lokesh Pemmasani" src={lokesh}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Lokesh Pemmasani"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          I am currently working as Solution Architect II at
                          Ericsson, USA
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Hemadri Dasari" src={hemadri}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Hemadri Dasari"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          I am currently working as Full Stack Developer at
                          Emirates NBD, Dubai
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </div>
            </div>
          </List>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Developers))
