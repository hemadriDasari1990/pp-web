import * as actions from '../actions'

import React, { Component, Suspense, lazy } from 'react'

import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Loader from '../../Loader/components/Loader'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const CountryList = lazy(() => import('./List'))

class Countries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      regions: [],
    }
  }

  componentDidMount() {
    this.props.getRegions().then(res => {
      this.setState({
        regions: res.data ? res.data.regions : [],
      })
    })
  }

  render() {
    const { regions } = this.state
    const { user } = this.props
    return (
      <Suspense fallback={<Loader />}>
        <Container fixed className="mt-3">
          <h1 className="text-center">Countries by region</h1>
          {regions &&
            regions.map(region => (
              <Grid
                container
                key={region._id}
                spacing={1}
                className="of-h w-us"
                disableGutters={true}
              >
                <h2>
                  {region.name}({region.code})
                </h2>
                <CountryList countries={region.countries} />
              </Grid>
            ))}
        </Container>
      </Suspense>
    )
  }
}

Countries.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {
  getRegions: actions.getRegions,
}

export default withRouter(connect(mapStateToProps, actionsToProps)(Countries))
