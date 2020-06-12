import * as actions from '../../../../../actions'
import * as timelineActions from '../../../../../../Timeline/actions'

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
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 160,
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
  gridListTile: {
    minHeight: '400px',
    minWidth: '664px',
  },
})

class ImagesPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      classes,
      createPostLoading,
      createPostError,
      createPostSuccess,
      user,
      files,
    } = this.props
    const { message, errorMessage } = this.state
    return (
      <div className={classes.root}>
        <GridList
          cellHeight={200}
          spacing={1}
          className={classes.gridList}
          cols={2}
        >
          {files.map((file, index) => (
            <GridListTile key={file.name}>
              <img src={file.buffer} alt={file.name} />
              <GridListTileBar
                title={file.name}
                subtitle={<span>by:</span>}
                actionIcon={
                  <Tooltip title="View Image">
                    <IconButton
                      aria-label={`star ${file.name}`}
                      className={classes.icon}
                      onClick={() => this.props.deleteImage(index)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                }
                actionPosition="right"
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

ImagesPreview.propTypes = {}

// export default withStyles(styles)(Post);

const mapStateToProps = state => {
  return {}
}

const actionsToProps = {}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(ImagesPreview)),
)
