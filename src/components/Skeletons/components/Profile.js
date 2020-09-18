import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
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
  center: {},
}))

export default function SkeletonProfile(props) {
  const { loading = false } = props
  const classes = useStyles()

  return (
    <Card>
      <CardContent>
        <div className="row f-r mr-10">
          <Skeleton
            className="mr-3"
            animation="wave"
            variant="circle"
            height={30}
            width={30}
          />
          <Skeleton animation="wave" variant="circle" height={30} width={30} />
        </div>
      </CardContent>
      <CardContent>
        <Skeleton animation="wave" variant="circle" className="l-35 profile" />
        <h5 className="center-elements">
          <Skeleton variant="text" animation="wave" height={10} width="70%" />
        </h5>
        <div className="center-elements">
          <Skeleton variant="text" animation="wave" height={10} width="60%" />
        </div>
        <div className="mt-25 center-elements">
          <Skeleton
            animation="wave"
            variant="rect"
            height={30}
            width={200}
            style={{ borderRadius: 20 }}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions className="mt-10 p-0 fl-justify-content">
        <div className="row">
          <div className="col align-self-start text-center">
            <Skeleton
              animation="wave"
              variant="circle"
              height={40}
              width={40}
            />
            <p className="title">
              <Skeleton
                variant="text"
                animation="wave"
                height={10}
                width="50%"
              />
            </p>
            <div className="followers">
              <Skeleton
                variant="text"
                animation="wave"
                height={10}
                width="80%"
              />
            </div>
          </div>
          <div className="col align-self-center text-center">
            <Skeleton
              animation="wave"
              variant="circle"
              height={40}
              width={40}
            />
            <p className="title">
              <Skeleton
                variant="text"
                animation="wave"
                height={10}
                width="50%"
              />
            </p>
            <div className="followers">
              <Skeleton
                variant="text"
                animation="wave"
                height={10}
                width="80%"
              />
            </div>
          </div>
          <div className="col align-self-end text-center">
            <Skeleton
              animation="wave"
              variant="circle"
              height={40}
              width={40}
            />
            <p className="title">
              <Skeleton
                variant="text"
                animation="wave"
                height={10}
                width="50%"
              />
            </p>
            <div className="followers">
              <Skeleton
                variant="text"
                animation="wave"
                height={10}
                width="80%"
              />
            </div>
          </div>
        </div>
      </CardActions>
    </Card>
  )
}

SkeletonProfile.propTypes = {
  loading: PropTypes.bool,
}
