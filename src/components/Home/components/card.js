import React, { Component } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Fab from '@material-ui/core/Fab'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import arrowIcon from '../../../../assets/arrow.svg'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    borderRadius: '15px 100px 15px 15px',
  },
  media: {
    margin: '30px 0px 0px 30px',
    width: 55,
    height: 55,
    display: 'block',
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
    height: 400,
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
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={title}
            image={path}
            title={title}
            className={type == 'home' ? classes.media : classes.profile}
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h4">
              {subTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
        {button && (
          <CardActions className={classes.actions}>
            {fbPath && !routePath && (
              <Fab
                target="_blank"
                href={fbPath}
                size="small"
                color="primary"
                aria-label="add"
                variant="extended"
              >
                {buttonName}{' '}
                <Avatar src={arrowIcon} className="b-s b-w-arrow" />
              </Fab>
            )}
            {linkedinPath && !routePath && (
              <Fab
                target="_blank"
                href={linkedinPath}
                size="small"
                color="primary"
                aria-label="add"
                variant="extended"
              >
                {buttonOneName}{' '}
                <Avatar src={arrowIcon} className="b-s b-w-arrow" />
              </Fab>
            )}

            {routePath && (
              <Fab
                className={classes.fab}
                onClick={() => this.handleButton(routePath)}
                size="small"
                color="primary"
                aria-label="add"
                variant="extended"
              >
                {buttonName}{' '}
                <Avatar src={arrowIcon} className="b-s b-w-arrow" />
              </Fab>
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
