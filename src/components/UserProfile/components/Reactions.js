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
import { Link } from 'react-router-dom'

class Reactions extends Component {
  async componentDidMount() {
    await this.props.getUser(this.props.match.params.id)
  }

  render() {
    const {
      classes,
      profileUser,
      profileUserError,
      profileUserLoading,
      user,
    } = this.props
    return (
      <React.Fragment>
        <Card>
          <CardHeader
            title="Profile Reactions"
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
          <CardContent
            className={
              !profileUserLoading &&
              profileUser &&
              !profileUser.reactions.length
                ? ''
                : 'p-0'
            }
          >
            <List>
              {!profileUserLoading &&
              profileUser &&
              profileUser.reactions.length
                ? profileUser.reactions.slice(0, 3).map(pu => (
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
                          primary={
                            <Link
                              className="hyperlink"
                              to={`/profile/${pu.likedBy[0]._id}`}
                            >
                              {user && user._id === pu.likedBy[0]._id
                                ? 'You'
                                : pu.likedBy[0].userName}
                            </Link>
                          }
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
                      <Tooltip title={pu.type.toUpperCase()} placement="bottom">
                        <IconButton>
                          {pu.type === 'love' && (
                            <LoveIcon
                              className="icon-display"
                              color="#f10571"
                            />
                          )}
                          {pu.type === 'like' && (
                            <LikeIcon
                              className="icon-display"
                              color="#2a7fff"
                            />
                          )}
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                  ))
                : null}
              {!profileUserLoading &&
                profileUser &&
                !profileUser.reactions.length && (
                  <Typography variant="h4" className="text-center">
                    No reactions yet
                  </Typography>
                )}
              {profileUserLoading &&
                profileUser &&
                !profileUser.reactions.length && <Loader />}
            </List>
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
}

Reactions.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const profileUser = state.getIn(['user', 'success'])
  const profileUserLoading = state.getIn(['user', 'loading'], false)
  const profileUserError = state.getIn(['user', 'errors'], Map())
  return {
    profileUser: profileUser ? profileUser.user : undefined,
    profileUserError,
    profileUserLoading,
    user,
  }
}

const actionsToProps = {
  getUser: globalActions.getUser,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Reactions))
