import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  actions: {
    justifyContent: 'space-between',
  },
}

class CardComponent extends Component {
  render() {
    const { classes } = this.props
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            height="140"
            image="https://lh6.googleusercontent.com/of53xqd-Qnv4MKcvHlfXxWwwqLBxu68dH7WuSBmUPH7UxfT1bFY-uGBjzEVnz1wrEANaPWCIFQ=w1200"
          />
        </CardActionArea>
        <CardActions className={classes.actions}>
          <Button size="small" color="primary">
            {this.props.name}
          </Button>
          <span>Total Users: 1.5m</span>
        </CardActions>
      </Card>
    )
  }
}

CardComponent.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CardComponent)
