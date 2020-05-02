import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

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
              <Avatar style={{ color: '#ffffff', backgroundColor: '#2a7fff' }}>
                NR
              </Avatar>
            }
            title={title}
            subheader="0m"
          />
          <CardContent style={{ minHeight: '300px !important' }}>
            <Typography variant="h4" className="text-center">
              {message}
            </Typography>
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
