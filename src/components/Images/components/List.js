import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import ClearIcon from '@material-ui/icons/Clear'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import { Map } from 'immutable'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import PhotoIcon from '@material-ui/icons/InsertPhoto'
import SmileIcon from '@material-ui/icons/InsertEmoticon'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Tooltip from '@material-ui/core/Tooltip'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
})

class ImagesList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  covertBufferToBase64 = buffer => {
    return Buffer.from(buffer, 'base64')
  }

  getImageWidth = buffer => {
    const img = new Image()
    img.src = buffer
    return img.width
  }

  getImageHeight = buffer => {
    const img = new Image()
    img.src = buffer
    return img.width
  }
  getGridListStyle = imagesLength => {
    return imagesLength == 1 ? { width: 500, height: 'auto' } : null
  }
  render() {
    const { classes, images } = this.props
    const { message, errorMessage } = this.state
    return (
      <div className={classes.root}>
        <GridList spacing={1} className={classes.gridList} cols={2}>
          {images.map((image, index) => (
            <GridListTile
              style={this.getGridListStyle(images.length)}
              key={image._id}
              cols={1}
            >
              <Zoom in={true} timeout={2000}>
                <img
                  src={this.covertBufferToBase64(image.buffer)}
                  alt={image.name}
                />
              </Zoom>
              <GridListTileBar
                title={image.name}
                className={classes.titleBar}
                actionIcon={
                  <IconButton
                    aria-label={`View image`}
                    className={classes.icon}
                  >
                    <ViewCarouselIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

ImagesList.propTypes = {}

// export default withStyles(styles)(Post);

const mapStateToProps = state => {
  return {}
}

const actionsToProps = {}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(ImagesList)),
)
