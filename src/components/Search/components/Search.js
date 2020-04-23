import React from 'react'
import { Map, List } from 'immutable'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import * as mainActions from '../../../actions/index'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

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
          type="submit"
          aria-label="Search people by name"
          style={{ padding: '2px 2px 0px 2px', marginLeft: 7 }}
        >
          <SearchIcon />
        </IconButton>
        <TextField
          fullWidth
          defaultValue={query}
          InputProps={{ disableUnderline: true }}
          placeholder="Search people by name"
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
