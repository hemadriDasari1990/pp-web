import * as postActions from '../../Post/actions'

import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import DisLikeIcon from '@material-ui/icons/ThumbDownAlt'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import LoveIcon from '@material-ui/icons/Favorite'
import PropTypes from 'prop-types'
import Reactionslist from './List'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import perfect from '../../../../assets/emojis/perfect.svg'
import thinking from '../../../../assets/emojis/thinking.svg'
import tounghout from '../../../../assets/emojis/tounghout.svg'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  tab: {
    minWidth: 65, // a number of your choice
    width: 65, // a number of your choice
  },
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="subtitle1"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <React.Fragment className="mt-10">{children}</React.Fragment>
      )}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

class Reactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
  }

  async componentDidMount() {
    if (this.props.postId) {
      await this.props.getReactionsCount(this.props.postId)
    }
  }

  handleChange = async index => {
    this.setState({
      value: index,
    })
  }

  getStyle(isActive) {
    const { classes } = this.props
    return isActive
      ? {
          color: '#fff',
          background:
            'linear-gradient(45deg, #2a7fff 1%, #00ff43 80%, #2a7fff 96%, #37ff2a 100%) 0% 0% / 150% 150%',
        }
      : {}
  }

  render() {
    const { classes, reactionsCount, postId } = this.props
    const { value } = this.state
    return (
      <React.Fragment>
        {reactionsCount ? (
          <>
            <Tabs
              textColor="primary"
              value={value}
              scrollButtons="auto"
              aria-label="scrollable prevent tabs example"
              initialSelectedIndex={value}
              indicatorColor="primary"
              variant="scrollable"
            >
              <Tab
                onClick={() => this.handleChange(0)}
                value={0}
                label={'All ' + formateNumber(reactionsCount.total)}
                aria-label="phone"
                className="text-capitalize"
                classes={{ root: classes.tab }}
              />
              <Tab
                onClick={() => this.handleChange(1, 'like')}
                value={1}
                label={formateNumber(reactionsCount.like)}
                icon={
                  <Avatar className="mr-2 small-avatar">
                    <LikeIcon color="secondary" style={{ fontSize: 10 }} />
                  </Avatar>
                }
                aria-label="like"
                classes={{ root: classes.tab }}
              />
              <Tab
                onClick={() => this.handleChange(2, 'dislike')}
                value={2}
                label={formateNumber(reactionsCount.dislike)}
                icon={
                  <Avatar className="mr-2 small-avatar">
                    <DisLikeIcon color="secondary" style={{ fontSize: 10 }} />
                  </Avatar>
                }
                aria-label="dislike"
                classes={{ root: classes.tab }}
              />
              <Tab
                onClick={() => this.handleChange(3, 'love')}
                value={3}
                label={formateNumber(reactionsCount.love)}
                icon={
                  <Avatar
                    className="mr-2 small-avatar"
                    style={{ backgroundColor: '#ff0016c7' }}
                  >
                    <LoveIcon color="secondary" style={{ fontSize: 10 }} />
                  </Avatar>
                }
                aria-label="loove"
                classes={{ root: classes.tab }}
              />
              <Tab
                onClick={() => this.handleChange(4, tounghout)}
                value={4}
                label={formateNumber(reactionsCount.tounghout)}
                icon={<Avatar className="mr-2 small-avatar" src={tounghout} />}
                aria-label="tounghout"
                classes={{ root: classes.tab }}
              />
              <Tab
                onClick={() => this.handleChange(5, 'thinking')}
                value={5}
                label={formateNumber(reactionsCount.thinking)}
                icon={<Avatar className="mr-2 small-avatar" src={thinking} />}
                aria-label="thinking"
                classes={{ root: classes.tab }}
              />
              <Tab
                onClick={() => this.handleChange(6, 'perfect')}
                value={6}
                label={formateNumber(reactionsCount.perfect)}
                icon={<Avatar className="mr-2 small-avatar" src={perfect} />}
                aria-label="perfect"
                classes={{ root: classes.tab }}
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Reactionslist />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Reactionslist type="like" />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Reactionslist type="dislike" />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Reactionslist type="love" />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Reactionslist type="tounghout" />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <Reactionslist type="thinking" />
            </TabPanel>
            <TabPanel value={value} index={6}>
              <Reactionslist type="perfect" />
            </TabPanel>
          </>
        ) : null}
      </React.Fragment>
    )
  }
}

Reactions.propTypes = {}

const mapStateToProps = state => {
  const reactionsCount = state.getIn(['Post', 'reactions', 'count', 'success'])
  const postId = state.getIn(['Timeline', 'post', 'id', 'save'])
  return {
    reactionsCount,
    postId,
  }
}

const actionsToProps = {
  getReactionsCount: postActions.getReactionsCount,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Reactions)),
)
