import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import * as postActions from '../../Post/actions'
import { Map, fromJS } from 'immutable'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import formateNumber from '../../../util/formateNumber'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import like from '../../../../assets/emojis/like.svg'
import angry from '../../../../assets/emojis/angry.svg'
import love from '../../../../assets/emojis/love.svg'
import silly from '../../../../assets/emojis/silly.svg'
import smiley from '../../../../assets/emojis/smiley.svg'
import wow from '../../../../assets/emojis/surprise.svg'
import sad from '../../../../assets/emojis/sad.svg'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Reactionslist from './List'

const styles = {
  default_tab: {
    color: '#68C222',
    width: '33.3%',
    backgroundColor: '#FFFFFF',
    fontSize: 15,
  },
  active_tab: {
    color: 'red',
    width: '33.3%',
    backgroundColor: '#FFFFFF',
    fontSize: 15,
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

//   function a11yProps(index) {
//     return {
//       id: `scrollable-prevent-tab-${index}`,
//       'aria-controls': `scrollable-prevent-tabpanel-${index}`,
//     };
//   }

class Reactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
    }
  }

  async componentDidMount() {
    if (this.props.match.params.id) {
      await this.props.getReactionsCount(this.props.match.params.id)
    }
  }

  renderUserOrigin = provider => {
    let name = ''
    switch (provider.toLowerCase()) {
      case 'google.com':
        name = 'Google User'
        break
      case 'facebook.com':
        name = 'facebook.com'
        break
      default:
        break
    }
    return name
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
    const { classes, reactionsCount } = this.props
    const { value } = this.state
    return (
      <React.Fragment>
        {reactionsCount ? (
          <>
            <AppBar position="static">
              <Tabs
                textColor="primary"
                value={value}
                variant="scrollable"
                scrollButtons="off"
                aria-label="scrollable prevent tabs example"
                initialSelectedIndex={value}
              >
                <Tab
                  onClick={() => this.handleChange(0)}
                  style={this.getStyle(value === 0)}
                  value={value}
                  label={'All ' + formateNumber(reactionsCount.total)}
                  aria-label="phone"
                  className="text-capitalize"
                />
                <Tab
                  onClick={() => this.handleChange(1, 'like')}
                  style={this.getStyle(value === 1)}
                  value={value}
                  label={formateNumber(reactionsCount.like)}
                  icon={<Avatar className="mr-7 small-avatar" src={like} />}
                  aria-label="phone"
                />
                <Tab
                  onClick={() => this.handleChange(2, 'love')}
                  style={this.getStyle(value === 2)}
                  value={value}
                  label={formateNumber(reactionsCount.love)}
                  icon={<Avatar className="mr-7 small-avatar" src={love} />}
                  aria-label="favorite"
                />
                <Tab
                  onClick={() => this.handleChange(3, 'angry')}
                  style={this.getStyle(value === 3)}
                  value={value}
                  label={formateNumber(reactionsCount.angry)}
                  icon={<Avatar className="mr-7 small-avatar" src={angry} />}
                  aria-label="person"
                />
                <Tab
                  onClick={() => this.handleChange(4, smiley)}
                  style={this.getStyle(value === 4)}
                  value={value}
                  label={formateNumber(reactionsCount.smiley)}
                  icon={<Avatar className="mr-7 small-avatar" src={smiley} />}
                  aria-label="help"
                />
                <Tab
                  onClick={() => this.handleChange(5, 'silly')}
                  style={this.getStyle(value === 5)}
                  value={value}
                  label={formateNumber(reactionsCount.silly)}
                  icon={<Avatar className="mr-7 small-avatar" src={silly} />}
                  aria-label="shopping"
                />
                <Tab
                  onClick={() => this.handleChange(6, 'wow')}
                  style={this.getStyle(value === 6)}
                  value={value}
                  label={formateNumber(reactionsCount.wow)}
                  icon={<Avatar className="mr-7 small-avatar" src={wow} />}
                  aria-label="up"
                />
                <Tab
                  onClick={() => this.handleChange(7, 'sad')}
                  style={this.getStyle(value === 7)}
                  value={value}
                  label={formateNumber(reactionsCount.sad)}
                  icon={<Avatar className="mr-7 small-avatar" src={sad} />}
                  aria-label="down"
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Reactionslist />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Reactionslist type="like" />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Reactionslist type="love" />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Reactionslist type="angry" />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Reactionslist type="smiley" />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <Reactionslist type="silly" />
            </TabPanel>
            <TabPanel value={value} index={6}>
              <Reactionslist type="wow" />
            </TabPanel>
            <TabPanel value={value} index={7}>
              <Reactionslist type="sad" />
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
  return {
    reactionsCount,
  }
}

const actionsToProps = {
  getReactionsCount: postActions.getReactionsCount,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Reactions)),
)
