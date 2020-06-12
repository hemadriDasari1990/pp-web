import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

class NoRecords extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes, title, message } = this.props
    return (
      <div>
        <Card>
          <CardHeader
            avatar={
              <Zoom in={true} timeout={2000}>
                <Avatar>NR</Avatar>
              </Zoom>
            }
            title={title}
            subheader="0m"
          />
          <CardContent className="p-3">
            <Zoom in={true} timeout={2000}>
              <Typography variant="h4" className="text-center">
                {message}
              </Typography>
            </Zoom>
          </CardContent>
        </Card>
      </div>
    )
  }
}

NoRecords.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NoRecords)
