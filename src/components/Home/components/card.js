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

const styles = theme => ({
  card: {},
  media: {
    height: 250,
    width: 250,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

class ProfileCard extends React.Component {
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
    } = this.props
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="350"
            image={path}
            title="Contemplative Reptile"
            className={type == 'home' ? classes.media : ''}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
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
          <CardActions style={{ marginTOP: 20 }}>
            <Button size="small" color="primary" target="_blank" href={fbPath}>
              {buttonName}
            </Button>
            <Button
              size="small"
              color="primary"
              target="_blank"
              href={linkedinPath}
            >
              {buttonOneName}
            </Button>
          </CardActions>
        )}
      </Card>
    )
  }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileCard)
