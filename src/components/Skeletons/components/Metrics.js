import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
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
}))

export default function SkeletonMetrics(props) {
  const { loading = false } = props
  const classes = useStyles()

  return (
    <Card>
      <CardContent>
        <div className="row">
          <div className="col align-self-start text-center">
            <Skeleton
              style={{
                margin: '10% 30% 10% 30%',
              }}
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
            <span className="text-center">
              <Skeleton animation="wave" height={10} />
            </span>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="col text-center metrics-card-title pb-3">
            <span>
              <Skeleton animation="wave" height={10} />
            </span>
            <h3 className="f-w-600">
              <Skeleton animation="wave" height={10} />
              <Skeleton animation="wave" height={10} />
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

SkeletonMetrics.propTypes = {
  loading: PropTypes.bool,
}
