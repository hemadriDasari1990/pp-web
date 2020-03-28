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

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      suggestions: [],
      selections: [],
      isLoading: false,
    }

    this.cache = {
      suggestions: this.state.suggestions,
    }

    this.lastRequestId = null
    this.loadSuggestions = debounce(this.loadSuggestions, 1000)
  }

  componentDidMount() {}

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const regexp = new RegExp(`^(.*?)(${query})(.*)$`, 'i')
    let matches = this.getSuggestionValue(suggestion).match(regexp)
    if (!matches || matches.length < 3) return null
    if (matches) {
      matches.shift()
      matches[0] = <b>{matches[0]}</b>
      matches[2] = <b>{matches[2]}</b>
    } else {
      matches = suggestion.name
    }
    return (
      <MenuList>
        <MenuItem>
          <ListItemAvatar>
            <Avatar
              aria-haspopup="true"
              alt="Avatar not available"
              src={suggestion.photoURL}
            />
          </ListItemAvatar>
          <Typography variant="inherit">{suggestion.userName}</Typography>
          <span className="name">{matches}</span>
        </MenuItem>
      </MenuList>
    )
  }

  getRegexAnywhere = val => {
    return new RegExp(`${val}`, 'i')
  }

  getMatchingUser = (value, data) => {
    const escapedValue = this.escapeRegexCharacters(value.trim())
    if (escapedValue === '') {
      return []
    }
    const regex = this.getRegexAnywhere(escapedValue)
    return data.filter(user => regex.test(user.name))
  }

  sortMatches(matchesArr, query) {
    return matchesArr
      .sort((a, b) => {
        const matches1 = _.startsWith(a.name, query)
        const matches2 = _.startsWith(b.name, query)
        if (!matches1 && matches2) return true
        else if (matches1 && !matches2) return false
        return a.name < b.name ? -1 : +(a.name > b.name)
      })
      .slice(0, 4)
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  getSuggestionValue(suggestion) {
    return suggestion.name
  }

  renderInputComponent = inputProps => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          backgroundColor: '#ffffff',
          borderRadius: 25,
          height: 40,
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
        <InputBase
          placeholder="Search people by name"
          InputProps={{
            inputRef: node => {
              ref(node)
              inputRef(node)
            },
          }}
          {...other}
        />
      </div>
    )
  }

  loadSuggestions = value => {
    if (!this.props.user) {
      return null
    }
    this.props
      .getUsers(this.props.user._id, value)
      .then(res => {
        console.log('value', res.data)
        this.setState({
          isLoading: false,
          suggestions: res.data,
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false,
        })
      })

    // //Cancel the previous request
    // if (this.lastRequestId !== null) {
    // 	this.lastRequestId = null;
    // }

    // // if (this.cache.suggestions.length)
    // // 	this.setState({
    // // 		isLoading: true,
    // // 		suggestions: sortMatches(getMatchingUser(value, this.cache.suggestions), value)
    // // 	})
    // // else {
    // // 	this.setState({
    // // 		isLoading: true,
    // // 		suggestions: []
    // // 	});
    // // }

    // this.lastRequestId = await this.props.getUsers(this.props.user._id, value)
    // 	.then(res => {

    //     this.cache.suggestions = [...this.cache.suggestions, ...res.data]
    //     console.log("res", this.cache.suggestions, this.sortMatches(this.getMatchingUser(value, this.cache.suggestions), value))
    // 		this.cache.suggestions = _.uniqBy(this.cache.suggestions, (s) => s.userName)
    // 		this.setState({
    // 			isLoading: false,
    // 			suggestions: res.data
    //     })

    // 	}).catch(err => {
    // 		const data = this.cache.suggestions;
    // 		this.setState({
    // 			isLoading: false,
    // 			suggestions: this.sortMatches(this.getMatchingUser(value, data), value)
    // 		})
    // 	})
  }

  onChange = (event, { newValue }) => {
    event.persist()
    // event.preventDefault();
    this.setState({
      value: newValue,
    })
  }

  onSuggestionsFetchRequested = async ({ value }) => {
    if (value.length > 2) {
      await this.loadSuggestions(value)
    }
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  onSuggestionSelected = (evt, { suggestion }) => {
    this.setState({
      value: '',
      selections: [...this.state.selections, suggestion],
    })
  }

  render() {
    const { users } = this.props
    const { value, suggestions, isLoading } = this.state
    const autosuggestProps = {
      renderInputComponent: this.renderInputComponent,
      suggestions: suggestions,
      onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.onSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
      onSuggestionSelected: this.onSuggestionSelected,
    }
    const inputProps = {
      placeholder: 'Search people by name',
      value,
      onChange: this.onChange,
    }
    return (
      <div>
        {isLoading ? <span className="loading-spinner"></span> : null}
        <Autosuggest
          renderInputComponent={this.renderInputComponent}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          highlightFirstSuggestion={true}
          inputProps={inputProps}
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
  const user = state.getIn(['user', 'data'])
  const users = state.getIn(['user', 'all', 'success'])
  return {
    user,
    users,
  }
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Search))
