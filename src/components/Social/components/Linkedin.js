import React, { Component } from 'react'
import linkedin from '../../../../assets/social/linkedin.svg'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

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
    margin: '15px 0 15px 20px',
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
            <Avatar src={linkedin} className={classes.small} />
            Sign In with Linkedin
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
