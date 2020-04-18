import React from 'react'
import deburr from 'lodash.deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
// import { Map, List } from 'immutable'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Avatar from '@material-ui/core/Avatar'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import * as mainActions from '../../../actions/index'
import PropTypes from 'prop-types'
import { debounce } from 'underscore'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import MenuList from '@material-ui/core/MenuList'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  listItem: {
    height: 30,
  },
  list: {
    // overflowY: 'scroll'
  },
})

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      isLoading: false,
    }
  }

  componentDidMount() {
    // this.fetchUsers('');
  }

  renderProfiles = (user, { selected }) => {
    const { classes } = this.props
    const { isLoading } = this.state
    if (isLoading) {
      return <CircularProgress color="inherit" size={20} />
    }
    return (
      <List className={classes.list} dense={true} disablePadding={true}>
        <ListItem
          className={classes.listItem}
          disableGutters={true}
          dense={true}
          autoFocus={true}
        >
          <ListItemAvatar>
            <Avatar
              aria-haspopup="true"
              alt={user.userName}
              src={user.photoURL}
            />
          </ListItemAvatar>
          <Typography variant="inherit">{user.userName}</Typography>
        </ListItem>
      </List>
    )
  }

  renderInputComponent = params => {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          backgroundColor: '#ffffff',
          borderRadius: 25,
          height: 40,
          // width: 270,
          boxShadow: '0 14px 28px rgba(145, 148, 170, 0.25)',
        }}
      >
        <IconButton
          style={{ padding: 2, marginLeft: 10 }}
          type="submit"
          aria-label="Search people by name"
        >
          <SearchIcon />
        </IconButton>
        <TextField
          fullWidth
          {...params}
          InputProps={{ ...params.InputProps, disableUnderline: true }}
          placeholder="Search people by name"
        />
      </div>
    )
  }

  handleSelected = (event, option) => {
    event.persist()
    if (this.props.type === 'header') {
      option ? this.props.history.push(`/profile/${option._id}`) : null
    }
    if (this.props.type === 'post') {
      this.props.getSelectedUser(option)
    }
  }

  handleOnInputChange = (event, searchText) => {
    if (!searchText) {
      this.setState({ value: searchText, isLoading: false })
    } else {
      this.setState({ value: searchText, isLoading: false }, () => {
        // this.fetchUsers(searchText);
      })
    }
  }

  /**
   * Updates the state of the autocomplete data with the remote data obtained via AJAX.
   *
   * @param {String} searchText content of the input that will filter the autocomplete data.
   * @return {Nothing} The state is updated but no value is returned
   */
  fetchUsers = searchText => {
    if (!this.props.user) {
      return null
    }
    // this.props
    //   .getUsers(this.props.user._id, searchText)
    //   .then(res => {
    //     this.setState({
    //       isLoading: false,
    //       users: res.data,
    //     })
    //   })
    //   .catch(err => {
    //     this.setState({
    //       isLoading: false,
    //     })
    //   })
  }

  getOptionLabel = option => {
    return typeof option === 'object' ? option.userName : option
  }

  render() {
    const { users } = this.props
    const { value, isLoading } = this.state
    return (
      <div>
        {users && (
          <Autocomplete
            options={users}
            getOptionLabel={option => this.getOptionLabel(option)}
            id="user-search"
            value={value}
            loading={isLoading}
            blurOnSelect
            loadingText="Loading..."
            autoHighlight={true}
            onInputChange={(event, value) =>
              this.handleOnInputChange(event, value)
            }
            onChange={(e, newValue) => this.handleSelected(e, newValue)}
            renderInput={params => this.renderInputComponent(params)}
            renderOption={(option, { selected }) =>
              this.renderProfiles(option, { selected })
            }
            noOptionsText="No Profiles Found"
            getOptionSelected={(option, value) =>
              option.userName === value.userName
            }
          />
        )}
      </div>
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
