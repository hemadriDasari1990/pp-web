import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as mainActions from '../../../actions/index'
import { Map } from 'immutable'
import Tooltip from '@material-ui/core/Tooltip'
import * as profileActions from '../../UserProfile/actions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Loader from '../../Loader/components/Loader'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { getCardSubHeaderProfileSummary } from '../../../util/getCardSubHeaderText'
import getPastTime from '../../../util/getPastTime'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    await this.props.getUsers(this.props.user._id, '')
  }

  handleViewProfile = userId => {
    this.props.history.push(`/profile/${userId}`)
  }

  handleMenu = () => {}

  render() {
    const { classes, users, usersLoading } = this.props
    const { open, anchorEl } = this.state
    return (
      <>
        <List className="row">
          {!usersLoading && users.length ? (
            users.map(user => (
              <Grid item lg={4} xs={12} sm={3} style={{ margin: 5 }}>
                <ListItem
                  key={user._id}
                  alignItems="flex-start"
                  className="shadow b-r-15"
                >
                  <ListItemAvatar>
                    <Avatar alt={user.userName} src={user.photoURL} />
                  </ListItemAvatar>
                  <Tooltip title={user.userName} placement="right-end">
                    <ListItemText
                      primary={
                        <>
                          <Link
                            className="hyperlink"
                            to={`/profile/${user._id}`}
                          >
                            {user.userName + ' '}
                          </Link>
                        </>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {getCardSubHeaderProfileSummary(user)}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </Tooltip>
                  <ListItemSecondaryAction className="t-37 r-5">
                    <small className="grey-color ">
                      {getPastTime(user.createdAt)}
                    </small>
                    <Tooltip title="Action">
                      <IconButton
                        aria-label="settings"
                        onClick={this.handleMenu}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              </Grid>
            ))
          ) : (
            <Typography variant="h4" className="text-center">
              No profiles found to list
            </Typography>
          )}
        </List>

        {usersLoading && !users.length && <Loader />}
      </>
    )
  }
}

Users.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const users = state.getIn(['user', 'all', 'success'], Map())
  const usersLoading = state.getIn(['user', 'all', 'loading'], false)
  return {
    user,
    users,
    usersLoading,
  }
}

const actionsToProps = {
  getUsers: mainActions.getUsers,
  createOrUpdateProfileReaction: profileActions.createOrUpdateProfileReaction,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Users))
