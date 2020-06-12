import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
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

export default function SkeletonCreatePost(props) {
  const { loading = false } = props
  const classes = useStyles()

  return (
    <Card>
      <CardHeader
        title={
          <Skeleton variant="text" animation="wave" height={10} width="40%" />
        }
      />
      <CardContent style={{ minHeight: '300px !important' }}>
        <Grid container spacing={1}>
          <Grid item lg={1} md={1} xs={1} sm={1}>
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          </Grid>
          <Grid item lg={10} md={11} xs={11} sm={11}>
            <span className={classes.root}>
              <Skeleton
                animation="wave"
                variant="rect"
                height={40}
                width="100%"
                style={{ marginLeft: 10, borderRadius: 20 }}
              />
            </span>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <Skeleton
          animation="wave"
          variant="rect"
          height={30}
          width="35%"
          style={{ borderRadius: 20 }}
        />
        <Skeleton
          animation="wave"
          variant="rect"
          height={30}
          width="35%"
          style={{ borderRadius: 20 }}
        />
      </CardActions>
    </Card>
  )
}

SkeletonCreatePost.propTypes = {
  loading: PropTypes.bool,
}
