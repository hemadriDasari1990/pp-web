import * as actions from '../actions'
import * as globalActions from '../../../actions/index'

import { Link, withRouter } from 'react-router-dom'
import React, { Component, Suspense } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Loader from '../../Loader/components/Loader'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'

const styles = makeStyles(theme => ({
  root: {
    display: 'flex !important',
    flexDirection: 'column',
  },
  details: {
    display: 'flex !important',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
}))

class AboutMe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: undefined,
    }
  }

  componentDidMount() {}

  render() {
    const { profile } = this.state
    const { classes } = this.props
    return (
      <Suspense fallback={<Loader />}>
        <Card>
          <div className={classes.root} style={{ display: 'flex' }}>
            <CardContent className={classes.content}>
              <Typography variant="subtitle1" color="textSecondary">
                About Yourself
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Overview" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Details about you" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Select your country" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Single-line item" />
                </ListItem>
              </List>
            </CardContent>
            <Divider orientation="vertical" flexItem />
            <CardContent className={classes.content}>
              <Box mt={3}>
                <h5>About You</h5>
                <IconButton>
                  <AddIcon color="primary" />{' '}
                </IconButton>
                <Link to="#">Write some details about yourself</Link>
                <h5>Name pronounciation</h5>
                <IconButton>
                  <AddIcon color="primary" />{' '}
                </IconButton>
                <Link to="#">Add a name pronounciation</Link>
                <h5>Other Names</h5>
                <IconButton>
                  <AddIcon color="primary" />{' '}
                </IconButton>
                <Link to="#">Add a nickname, a birth name...</Link>
                <h5>Favourite Quotes</h5>
                <IconButton>
                  <AddIcon color="primary" />{' '}
                </IconButton>
                <Link to="#">Add your favourite quotations</Link>
              </Box>
            </CardContent>
          </div>
        </Card>
      </Suspense>
    )
  }
}

AboutMe.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const actionState = state.getIn(['UserProfile', 'action', 'save'])
  return {
    user,
    actionState,
  }
}

const actionsToProps = {
  getUser: globalActions.getUser,
  saveActionState: actions.saveActionState,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(AboutMe)),
)
