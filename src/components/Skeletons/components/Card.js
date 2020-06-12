import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PropTypes from 'prop-types'
import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
    borderRadius: 20,
  },
}))

export default function SkeletonCard(props) {
  const { loading = false } = props
  const classes = useStyles()

  return (
    <Grid item lg={12} md={6} xs={12} sm={9} className="middle-content">
      <Card>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          }
          action={null}
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <CardContent>
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        </CardContent>
        <CardActions>
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        </CardActions>
        <Divider />
        <CardActions>
          <Skeleton animation="wave" variant="circle" width={30} height={30} />
          <Skeleton
            animation="wave"
            height={10}
            width="90%"
            style={{ marginBottom: 6 }}
          />
        </CardActions>
      </Card>
    </Grid>
  )
}

SkeletonCard.propTypes = {
  loading: PropTypes.bool,
}
