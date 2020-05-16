import React, { Component } from 'react'

import Fab from '@material-ui/core/Fab'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  avatar: {},
  small: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  fab: {
    width: '300px !important',
    color: '#ffffff !important',
    margin: '15px 0 30px 20px',
  },
})

class Linkedin extends Component {
  render() {
    const { classes } = this.props
    return (
      <>
        <Tooltip title="Login With Linkedin" aria-label="Add">
          <Fab
            className={classes.fab}
            size="medium"
            color="primary"
            aria-label="add"
            variant="extended"
          >
            <LinkedInIcon color="secondary" />
            &nbsp; Sign In with Linkedin
          </Fab>
        </Tooltip>
        {/*<Button onClick={() => this.auth()} variant="contained" size="small">
							Facebook
						</Button>*/}
      </>
    )
  }
}

Linkedin.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Linkedin)
