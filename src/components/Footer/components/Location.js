import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="content">
        <div>
          <h1>Location</h1>
          <p>Read, write and share stories</p>
        </div>
      </div>
    )
  }
}

export default withRouter(Location)
