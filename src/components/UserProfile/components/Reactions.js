import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Loader from '../../Loader/components/Loader'
import { Map, fromJS } from 'immutable'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import formateNumber from '../../../util/formateNumber'
import * as globalActions from '../../../actions/index'
import LoveIcon from '../../SvgIcons/components/Love'
import LikeIcon from '../../SvgIcons/components/Like'

class Reactions extends Component {
  async componentDidMount() {
    await this.props.getUser(this.props.match.params.id)
  }

  handleReaction = async type => {
    const data = {
      likedBy: this.props.user._id,
      user: this.props.profileUser._id,
      type,
    }
    await this.props.createOrUpdateProfileReaction(data).then(async res => {
      await this.props.getProfileReaction(
        this.props.profileUser._id,
        this.props.user._id,
      )
    })
  }

  render() {
    const {
      classes,
      profileUser,
      profileUserError,
      profileUserLoading,
    } = this.props
    return (
      <React.Fragment>
        <Card>
          <CardHeader
            title="Top Reactions"
            action={
              <a>
                View All{' '}
                <b>
                  {formateNumber(
                    profileUser ? profileUser.reactions.length : 0,
                  )}
                </b>
              </a>
            }
          ></CardHeader>
          <CardContent className="p-0">
            <List>
              {!profileUserLoading &&
              profileUser &&
              profileUser.reactions.length ? (
                profileUser.reactions.slice(0, 5).map(pu => (
                  <ListItem key={pu._id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={pu.likedBy[0].userName}
                        src={pu.likedBy[0].photoURL}
                      />
                    </ListItemAvatar>
                    <Tooltip
                      title={pu.likedBy[0].userName}
                      placement="right-end"
                    >
                      <ListItemText
                        primary={pu.likedBy[0].userName}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              A {pu.likedBy[0].providerId} User
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </Tooltip>
                    <Tooltip
                      title={pu.type.toUpperCase()}
                      placement="right-end"
                    >
                      <IconButton>
                        {pu.type === 'love' && (
                          <LoveIcon className="icon-display" color="#f10571" />
                        )}
                        {pu.type === 'like' && (
                          <LikeIcon className="icon-display" color="#2a7fff" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                ))
              ) : (
                <Typography variant="h4" className="text-center">
                  No reactions yet
                </Typography>
              )}

              {profileUserLoading && !profileUser && <Loader />}
            </List>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

Reactions.propTypes = {}

const mapStateToProps = state => {
  const profileUser = state.getIn(['user', 'success'])
  const profileUserLoading = state.getIn(['user', 'loading'], false)
  const profileUserError = state.getIn(['user', 'errors'], Map())
  return {
    profileUser: profileUser ? profileUser.user : undefined,
    profileUserError,
    profileUserLoading,
  }
}

const actionsToProps = {
  getUser: globalActions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Reactions))