import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import PropTypes from 'prop-types'
import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
  center: {},
}))

export default function SkeletonWelcomeProfile(props) {
  const { loading = false } = props
  const classes = useStyles()

  return (
    <Card>
      <CardContent className="text-center p-2">
        <Skeleton animation="wave" variant="circle" className="l-35 profile" />
        <h5 className="center-elements">
          <Skeleton variant="text" animation="wave" height={10} width="60%" />
        </h5>
        <span className="mt-25 center-elements">
          <Skeleton variant="text" animation="wave" height={10} width="80%" />
        </span>
        <div className="mt-25 center-elements">
          <Skeleton
            animation="wave"
            variant="rect"
            height={40}
            width={200}
            style={{ borderRadius: 20 }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

SkeletonWelcomeProfile.propTypes = {
  loading: PropTypes.bool,
}
