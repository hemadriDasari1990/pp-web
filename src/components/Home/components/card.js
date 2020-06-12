import React, { Component } from 'react'

import ArrowIcon from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  media: {
    height: 270,
  },
  content: {
    marginLeft: 20,
    marginBottom: 15,
  },
  actions: {
    margin: 15,
  },
  button: {
    fontWeight: 600,
  },
  small: {
    width: 30,
    height: 30,
    marginRight: 5,
    marginLeft: 20,
  },
  fab: {
    marginLeft: '40%',
  },
  profile: {
    height: 300,
  },
})

class ProfileCard extends Component {
  handleButton = path => {
    this.props.history.push(path)
  }
  render() {
    const {
      classes,
      path,
      title,
      subTitle,
      fbPath,
      linkedinPath,
      content,
      button,
      buttonName,
      buttonOneName,
      type,
      routePath,
    } = this.props
    return (
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={title}
            image={path}
            title={title}
            className={classes.media}
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h4" component="h1">
              {title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h4">
              {subTitle}
            </Typography>
            <p className="text-black-50">{content}</p>
          </CardContent>
        </CardActionArea>
        {button && (
          <CardActions className={classes.actions}>
            {fbPath && !routePath && (
              <Button
                target="_blank"
                href={fbPath}
                variant="contained"
                color="primary"
                size="small"
              >
                {buttonName} <ArrowIcon color="secondary" />
              </Button>
            )}
            {linkedinPath && !routePath && (
              <Button
                target="_blank"
                href={linkedinPath}
                variant="contained"
                color="primary"
                size="small"
              >
                {buttonOneName} <ArrowIcon color="secondary" />
              </Button>
            )}

            {routePath && (
              <Button
                className={classes.fab}
                onClick={() => this.handleButton(routePath)}
                variant="contained"
                color="primary"
                size="small"
              >
                {buttonName} <ArrowIcon color="secondary" />
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    )
  }
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(connect(null, null)(withStyles(styles)(ProfileCard)))
