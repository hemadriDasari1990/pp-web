import React from 'react'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { Map, List } from 'immutable'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Avatar from '@material-ui/core/Avatar'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps
  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node)
          inputRef(node)
        },
      }}
      {...other}
    />
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query)
  const parts = parse(suggestion.label, matches)

  return (
    <MenuItem selected={isHighlighted} component="div">
      <ListItemIcon>
        <Avatar
          aria-haspopup="true"
          alt="Avatar not available"
          src={suggestion.photoURL}
        />
      </ListItemIcon>
      {parts.map((part, index) =>
        part.highlight ? (
          <span key={String(index)} style={{ fontWeight: 500 }}>
            {part.text}
          </span>
        ) : (
          <strong key={String(index)} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        ),
      )}
    </MenuItem>
  )
}

function getSuggestions(users, value) {
  const inputValue = deburr(value.trim()).toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : users.filter(user => {
        const keep =
          count < 5 &&
          user &&
          user.label.slice(0, inputLength).toLowerCase() === inputValue
        if (keep) {
          count += 1
        }
        return keep
      })

  // if (inputLength === 0) {
  //   return [];
  // }

  // return users.filter(user => {
  //     return user.label.split(' ').some(term => {
  //         return term.toLowerCase().slice(0, inputLength) === inputValue;
  //     })
  // });
}

function getSuggestionValue(suggestion) {
  return suggestion.label
}

class Search extends React.Component {
  state = {
    single: '',
    popper: '',
    suggestions: [],
    users: [],
  }

  componentDidMount() {
    if (this.props.users && this.props.users.size) {
      let users = this.props.users.toJS().users.map(user => {
        if (user.uid !== this.props.user.uid) {
          return {
            _id: user['_id'],
            label: user.userName,
            photoURL: user.photoURL,
            uid: user.uid,
          }
        }
      })
      users = users.filter(user => user != undefined)
      this.setState({
        users,
      })
    }
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    const suggestions = getSuggestions(this.state.users, value)
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  handleChange = name => (event, { newValue }) => {
    const suggestions = getSuggestions(this.state.users, newValue)
    if (
      this.props.profile &&
      suggestions.filter(s => s.label == newValue).length
    ) {
      this.props.history.push(
        `/profile/${suggestions.filter(s => s.label == newValue)[0]._id}`,
      )
    }
    if (
      suggestions.filter(s =>
        s.label.toLowerCase().includes(newValue.toLowerCase()),
      ).length &&
      this.props.user &&
      this.props.post
    ) {
      this.props.createPost({
        postedBy: this.props.user._id,
        postedByName: this.props.user.displayName,
        postedByPhotoURL: this.props.user.photoURL,
        postedTo: suggestions.filter(s =>
          s.label.toLowerCase().includes(newValue.toLowerCase()),
        )[0]._id,
        postedToPhotoURL: suggestions.filter(s =>
          s.label.toLowerCase().includes(newValue.toLowerCase()),
        )[0].photoURL,
        postedToByName: suggestions.filter(s =>
          s.label.toLowerCase().includes(newValue.toLowerCase()),
        )[0].label,
      })
      this.setState({
        suggestions,
      })
    }
    this.setState({
      [name]: newValue,
    })
  }

  render() {
    const {} = this.props
    const { users } = this.state
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    }

    return (
      <div>
        <Autosuggest
          {...autosuggestProps}
          highlightFirstSuggestion={true}
          inputProps={{
            label: 'Search People',
            placeholder: 'Search ',
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    )
  }
}

Search.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'], List())
  const users = state.getIn(['user', 'all', 'success'], Map())
  return {
    user,
    users,
  }
}

export default withRouter(connect(mapStateToProps, null)(Search))
