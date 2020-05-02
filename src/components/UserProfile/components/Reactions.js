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
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import LoveIcon from '@material-ui/icons/Favorite'
import { Link } from 'react-router-dom'
import moment from 'moment'
import getPastTime from '../../../util/getPastTime'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

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
                          alt={pu.likedBy.userName}
                          src={pu.likedBy.photoURL}
                        />
                      </ListItemAvatar>
                      <Tooltip
                        title={pu.likedBy.userName}
                        placement="right-end"
                      >
                        <ListItemText
                          primary={
                            <>
                              <Link
                                className="hyperlink"
                                to={`/profile/${pu.likedBy._id}`}
                              >
                                {user && user._id === pu.likedBy._id
                                  ? 'You '
                                  : pu.likedBy.userName + ' '}
                              </Link>
                              <small className="grey-color ">
                                {getPastTime(pu.updatedAt)}
                              </small>
                            </>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                A {pu.likedBy.providerId} User
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </Tooltip>
                      <ListItemSecondaryAction>
                        <Tooltip
                          title={pu.type.toUpperCase()}
                          placement="bottom"
                        >
                          <IconButton
                            style={{
                              color:
                                pu.type === 'like' ? '#2a7fff' : '#ff0016c7',
                            }}
                          >
                            {pu.type === 'love' && (
                              <LoveIcon className="icon-display" />
                            )}
                            {pu.type === 'like' && (
                              <LikeIcon className="icon-display" />
                            )}
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
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
