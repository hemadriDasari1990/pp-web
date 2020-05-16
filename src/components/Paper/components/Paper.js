import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
})

class PaperComponent extends Component {
  render() {
    const { classes, title, content } = this.props
    return (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h1">
          {title}
        </Typography>
        <Typography component="p">{content}</Typography>
      </Paper>
    )
  }
}

PaperComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PaperComponent)
