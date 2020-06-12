import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import hemadri from '../../../../assets/hemadri.jpg'
import lokesh from '../../../../assets/lokesh.jpg'
import rajesh from '../../../../assets/rajesh.jpg'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  avatar: {
    margin: 10,
    width: 300,
    height: 300,
  },
  root: {
    marginTop: 0,
    marginBottom: 80,
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
      <Container fixed>
        <Zoom in={true} timeout={1500}>
          <h1 className="mb-3">We are small team of developers</h1>
        </Zoom>
        <p className="font-size-lg text-black-50">
          We started this project as an experienment as we wanted to build
          something that helps people to communicate and understand what people
          are thinking about you. This idea has born between Hemadri Dasari and
          Rajesh Pemmasani in the year 2018.
        </p>
        <p className="font-size-lg text-black-50">
          Hemadri Dasari is only developer worked on end to end from UI design
          to DB design. He has coded close to 2 years developing this beautiful
          platform in his offline time.
        </p>
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Zoom in={true} timeout={1500}>
                <Avatar alt="Rajesh Pemmasani" src={rajesh}></Avatar>
              </Zoom>
            </ListItemAvatar>
            <ListItemText
              primary="Rajesh Pemmasani"
              secondary={
                <React.Fragment>
                  <Typography
                    component="p"
                    variant="body2"
                    className={classes.inline}
                  >
                    Assistant Vice President at JP Morgan & Co, Singapore
                  </Typography>
                  <br />
                  <p className="text-black-50">
                    Rajesh Pemmasani is a CO-Founter of Writenpost Inc. He is
                    currently working as Assistant Vice President at JP Morgan
                    Chase & Co, Singapore, heading two internal group production
                    systems. He’s also worked as Manager at Australia &
                    Newzealand company(A&Z). Rajesh Pemmasani has completed his
                    MCA from Osmania, Hyderabad, India.
                  </p>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Zoom in={true} timeout={1500}>
                <Avatar alt="Lokesh Pemmasani" src={lokesh}></Avatar>
              </Zoom>
            </ListItemAvatar>
            <ListItemText
              primary="Lokesh Pemmasani"
              secondary={
                <React.Fragment>
                  <Typography
                    component="p"
                    variant="body2"
                    className={classes.inline}
                  >
                    Solution Architect II at Ericsson, USA
                  </Typography>
                  <br />
                  <p className="text-black-50">
                    Lokesh Pemmasani is a CO-Founder of Writenpost Inc. He is
                    currently working as Solution Architect at Ericsson, USA,
                    heading two internal group systems. He’s also worked as
                    Solution Architect at Verizon Communications, Hyderabad.
                    Lokesh Pemmasani has completed his B.E, Elections
                    Communications Engineering, India.
                  </p>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Zoom in={true} timeout={1500}>
                <Avatar alt="Hemadri Dasari" src={hemadri}></Avatar>
              </Zoom>
            </ListItemAvatar>
            <ListItemText
              primary="Hemadri Dasari"
              secondary={
                <React.Fragment>
                  <Typography
                    component="p"
                    variant="body2"
                    className={classes.inline}
                  >
                    Full Stack Developer at Emirates NBD, Dubai
                  </Typography>
                  <br />
                  <p className="text-black-50">
                    Hemadri Dasari is a Founder of Writenpost Inc. He is
                    currently working as Full Stack Developer at Emirates NBD,
                    Dubai, developed private cloud applications for Emirates
                    NBD. He’s also worked as Full Stack Developer at Verizon
                    Communications. Hemadri Dasari has completed his B.E,
                    Computer Science Engineering from Anna University, Chennai,
                    India.
                  </p>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Container>
    )
  }
}

export default withRouter(withStyles(styles)(Developers))
