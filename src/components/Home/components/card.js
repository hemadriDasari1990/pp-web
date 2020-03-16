import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  card: {},
  media: {
    margin: '30px 0px 15px 30px',
    width: 70,
    height: 70,
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
})

class ProfileCard extends React.Component {
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
            alt="Contemplative Reptile"
            height="350"
            image={path}
            title=""
            className={type == 'home' ? classes.media : ''}
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              <h2>{title}</h2>
            </Typography>
            <Typography gutterBottom variant="subTitle1" component="p">
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
              <Button
                className={classes.button}
                size="small"
                color="secondary"
                target="_blank"
                href={fbPath}
              >
                {buttonName}
              </Button>
            )}
            {linkedinPath && !routePath && (
              <Button
                className={classes.button}
                size="small"
                color="primary"
                target="_blank"
                href={linkedinPath}
              >
                {buttonOneName}
              </Button>
            )}

            {routePath && (
              <Button
                className={classes.button}
                size="small"
                color="primary"
                target="_blank"
                onClick={() => this.handleButton(routePath)}
              >
                {buttonName}
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
