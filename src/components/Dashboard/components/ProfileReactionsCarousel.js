import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  smallAvatar: {
    width: 23,
    height: 23,
  },
  customBadge: {
    top: '90%',
    width: 75,
    height: 75,
    backgroundColor: 'unset !important',
  },
}

class ProfileReactionsCarousel extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { classes, user } = this.props
    return (
      <Card>
        <CardContent>
          <div className="row m-2">
            {/* {user.reactions &&
                <Badge
                  className="m-1"
                  classes={{ badge: classes.customBadge }}
                  overlap="circle"
                  key={index + 1}
                  badgeContent={<Avatar className={classes.smallAvatar} />}
                >
                  <Avatar />
                </Badge>
              } */}
          </div>
        </CardContent>
      </Card>
    )
  }
}

ProfileReactionsCarousel.propTypes = {}

const mapStateToProps = state => {
  const user = state.getIn(['user', 'data'])
  return {
    user,
  }
}

const actionsToProps = {}

export default withRouter(
  connect(
    mapStateToProps,
    actionsToProps,
  )(withStyles(styles)(ProfileReactionsCarousel)),
)
