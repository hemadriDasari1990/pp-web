import * as mainActions from '../../../actions/index'

import React, { Component } from 'react'

import AskIcon from '@material-ui/icons/PlaylistAddRounded'
import Avatar from '@material-ui/core/Avatar'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import FollowIcon from '@material-ui/icons/RssFeedOutlined'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Popover from '@material-ui/core/Popover'
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { connect } from 'react-redux'
import { getCardSubHeaderProfileSummary } from '../../../util/getCardSubHeaderText'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  input: {
    flex: 1,
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#050505',
      fontSize: 15,
    },
  },
  root: {
    width: '100%',
    marginTop: 8,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    // width: 350,
    backgroundColor: '#f0f2f5',
    color: '#606770',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  searchIcon: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 20,
  },
})

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      filteredUsers: [],
      // value: '',
      isLoading: false,
      query: '',
      anchorEl: null,
      open: false,
    }
    this.usersTimer = null
  }

  async componentDidMount() {
    await this.fetchUsers()
  }

  fetchUsers = async () => {
    this.props.user
      ? await this.props
          .getUsers(this.props.user._id, this.state.query)
          .then(res => {
            this.setState({
              users: res.data,
              filteredUsers: res.data,
              loading: false,
            })
          })
      : null
  }

  handleInput = event => {
    event.preventDefault()
    this.setState(
      {
        query: event.target.value,
        anchorEl: event.currentTarget,
        open: true,
        loading: true,
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          this.usersTimer = setTimeout(async () => {
            await this.fetchUsers()
          }, 500)
          // this.setState(prevState => {
          //   const filteredUsers = prevState.users.filter(element => {
          //     return element.userName.toLowerCase().includes(this.state.query.toLowerCase())
          //   })
          //   console.log("test...", this.state.users)
          //   console.log("test...", filteredUsers)
          //   return {
          //     filteredUsers,
          //   }
          // });
        } else {
          this.setState(
            {
              filteredUsers: this.props.users,
              anchorEl: null,
              loading: false,
              open: false,
            },
            () => {},
          )
        }
      },
    )
  }

  getSelectedProfile = (event, user) => {
    const { type } = this.props
    event.persist()
    this.setState({
      query: user.userName,
      anchorEl: null,
      open: false,
    })
    if (type === 'header') {
      user ? this.props.history.push(`/profile/${user._id}`) : null
    }
    if (type === 'post') {
      this.props.getSelectedUser(user)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.usersTimer)
  }

  renderProfiles = () => {
    const { classes } = this.props
    const { loading, filteredUsers } = this.state
    return (
      <List dense={true} style={{ width: 415, borderRadius: 50 }}>
        {loading ? (
          <ListItemText className="text-center" primary="Loading..." />
        ) : null}
        {!loading && filteredUsers
          ? filteredUsers.map(u => (
              <ListItem
                key={u._id}
                className="cursor ml-2"
                disableGutters={true}
                dense={true}
                onClick={e => this.getSelectedProfile(e, u)}
              >
                <ListItemAvatar>
                  <Avatar
                    aria-haspopup="true"
                    alt={u.userName}
                    src={u.photoURL}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={u.userName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {getCardSubHeaderProfileSummary(u)}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Ask For Opinion" placement="right-end">
                    <IconButton>
                      <Zoom in={true} timeout={2000}>
                        <AskIcon />
                      </Zoom>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Follow User" placement="right-end">
                    <IconButton>
                      <Zoom in={true} timeout={2000}>
                        <FollowIcon />
                      </Zoom>
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          : null}
        {!loading && (!filteredUsers || !filteredUsers.length) ? (
          <ListItem className="cursor" dense={true}>
            <Typography className="mt-2 mb-2" variant="inherit">
              No profiles found
            </Typography>
          </ListItem>
        ) : null}
      </List>
    )
  }

  showPopover = event => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  closePopover = () => {
    this.setState({
      anchorEl: null,
      open: false,
    })
  }

  renderSearch = () => {
    const { users, classes, id } = this.props
    const { isLoading, query } = this.state
    return (
      <>
        <label className={classes.root}>
          <SearchIcon className={classes.searchIcon} />
          <TextField
            id={id}
            className="cursor h-36 pl-12 search-box"
            onChange={this.handleInput}
            value={query}
            fullWidth
            InputProps={{
              disableUnderline: true,
              classes: { input: classes['input'] },
            }}
            placeholder="Search Writenpost"
            // autoFocus={true}
            onFocus={e => this.showPopover(e)}
            inputRef={input => (this.tf = input)}
            autoComplete="off"
          />
        </label>
      </>
    )
  }

  handleClickAway = () => {
    this.setState({
      anchorEl: null,
      open: false,
    })
  }

  render() {
    const { users, classes, id } = this.props

    const { anchorEl, open } = this.state
    return (
      <>
        {this.renderSearch()}
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <Popover
            open={open}
            anchorEl={document.getElementById(id)}
            onClick={() => this.closePopover()}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            disableAutoFocus={true}
            disableEnforceFocus={true}
            style={{
              opacity: this.tf && this.tf.value.length <= 0 ? 0 : 1,
              marginTop: 10,
              maxHeight: 200,
              overflow: 'auto',
            }}
          >
            {this.renderProfiles()}
          </Popover>
        </ClickAwayListener>
      </>
    )
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
}

const actionsToProps = {
  getUsers: mainActions.getUsers,
}
const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  const users = state.getIn(['user', 'all', 'success'])
  return {
    user,
    users,
  }
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Search)),
)
