import React from 'react'
import { Map, List } from 'immutable'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Autocomplete from '@material-ui/lab/Autocomplete'
import * as mainActions from '../../../actions/index'
import PropTypes from 'prop-types'

const styles = theme => ({
  input: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    boxShadow: '0 14px 28px rgba(145, 148, 170, 0.25)',
  },
  iconButton: {
    padding: 2,
    marginLeft: 10,
  },
  inputBase: {},
})

class Search extends React.Component {
  state = {
    users: [],
    query: '',
  }

  componentDidMount() {}

  handleSearch = e => {
    e.preventDefault()
    this.setState(
      {
        query: e.target.value,
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.props.user
              ? this.props.getUsers(this.props.user._id, this.state.query)
              : null
          }
        }
      },
    )
    if (!this.state.query || this.state.query.length == 1) {
      this.props.user ? this.props.getUsers(this.props.user._id, '') : null
    }
  }

  render() {
    const { user, users, classes } = this.props
    const { query } = this.state
    return (
      <div className={classes.input}>
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Search profiles by name"
          defaultValue={query}
          inputProps={{ 'aria-label': 'Search people by name' }}
          className={classes.inputBase}
          onChange={e => this.handleSearch(e)}
          value={query}
        />
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
  const user = state.getIn(['user', 'data'], List())
  const users = state.getIn(['user', 'all', 'success'], List())
  return {
    user,
    users,
  }
}

export default withRouter(
  connect(mapStateToProps, actionsToProps)(withStyles(styles)(Search)),
)
