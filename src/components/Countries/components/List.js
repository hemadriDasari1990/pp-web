import * as actions from '../actions'

// import Link from '@material-ui/core/Link';
import { Link, withRouter } from 'react-router-dom'
import React, { Component, Suspense } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  smallAvatar: {
    width: 33,
    height: 33,
  },
  badge: {
    width: 20,
    height: 20,
  },
}

class CountriesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: props.countries,
    }
  }

  componentDidMount() {}

  handleReaction = async (countryId, index) => {
    const { user } = this.props
    const data = {
      reactedBy: user._id,
      country: countryId,
      type: 'like',
    }
    await this.props.createOrUpdateCountryReaction(data).then(async res => {
      const countries = [...this.state.countries]
      const countryReactionIndex = countries[index].reactions.findIndex(
        r => r._id === user._id,
      )
      countries[index].reactions.splice(countryReactionIndex, 1)
      // user.opinionRequestsSent = user.opinionRequestsSent.unshift(users[index]);
      if (res.data.reaction) {
        countries[index].reactions.unshift(user)
        countries[index].like_reactions.unshift(user)
        countries[index].likes += 1
        countries[index].reactionsCount += 1
        countries[index].reactedBy = user
      } else if (countries[index].likes) {
        countries[index].likes -= 1
        countries[index].reactionsCount -= 1
      }
      this.setState(
        {
          countries,
        },
        () => {},
      )
    })
  }

  isLiked = country => {
    const { classes, user } = this.props
    const reactions = country.reactions
    const reaction = reactions.find(lr => lr._id === user._id)
    return reaction ? true : false
  }

  render() {
    const { classes, user } = this.props
    const { countries } = this.state
    return (
      <Suspense>
        <List>
          <Grid container spacing={1}>
            {countries &&
              countries.map((country, index) => (
                <Grid
                  key={user._id}
                  item
                  lg={3}
                  md={12}
                  xs={12}
                  sm={12}
                  key={country._id}
                >
                  {/* <ListSubheader>1,23,500 Likes</ListSubheader> */}
                  <ListItem
                    alignItems="flex-start"
                    className="cursor b-r-15 mt-10 w-us"
                  >
                    <ListItemAvatar>
                      <Zoom in={true} timeout={1500}>
                        <Avatar
                          variant="square"
                          className="m-a"
                          src={country.flag}
                        />
                      </Zoom>
                    </ListItemAvatar>
                    <Tooltip title={country.name} placement="bottom-start">
                      <ListItemText
                        primary={
                          country.name && country.name.length > 20
                            ? country.name.substring(0, 20) + '...'
                            : country.name
                        }
                        secondary={
                          <>
                            <span>{country.likes + ' Likes'}</span>
                            <br />
                            <Link
                              to="#"
                              onClick={() => {
                                console.info("I'm a button.")
                              }}
                            >
                              See who Liked
                            </Link>
                          </>
                        }
                      />
                    </Tooltip>
                    <ListItemSecondaryAction className="r-5">
                      {/* <Tooltip title="Total Likes" placement="right-end">
                                    <IconButton>
                                        <Zoom in={true} timeout={2000}>
                                            <Badge badgeContent={4} color="primary">
                                            </Badge>
                                        </Zoom>
                                    </IconButton>
                                </Tooltip> */}
                      <Tooltip title={'Like'} placement="right-end">
                        <Zoom in={true} timeout={2000}>
                          <IconButton
                            onClick={() =>
                              this.handleReaction(country._id, index)
                            }
                            style={{
                              color: this.isLiked(country)
                                ? '#5383ff'
                                : '#0c0b0b5e',
                            }}
                          >
                            <LikeIcon />
                          </IconButton>
                        </Zoom>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
              ))}
          </Grid>
        </List>
      </Suspense>
    )
  }
}

CountriesList.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  createOrUpdateCountryReaction: actions.createOrUpdateCountryReaction,
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(CountriesList)),
)
