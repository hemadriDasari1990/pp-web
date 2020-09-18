import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
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

export default function SkeletonSummary(props) {
  const { loading = false } = props
  const classes = useStyles()

  return (
    <Card>
      <CardHeader
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        className="card-title"
        action={
          <Skeleton animation="wave" variant="circle" width={30} height={30} />
        }
      />
      <CardContent>
        {!loading ? (
          <>
            <List className="list-row">
              <ListItem alignItems="center">
                <ListItemText
                  primary={
                    <Skeleton
                      variant="text"
                      animation="wave"
                      height={10}
                      width="70%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  secondary={
                    <Skeleton
                      variant="text"
                      animation="wave"
                      height={10}
                      width="50%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                />
              </ListItem>
              <ListItem alignItems="center">
                <ListItemText
                  primary={
                    <Skeleton
                      variant="text"
                      animation="wave"
                      height={10}
                      width="70%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  secondary={
                    <Skeleton
                      variant="text"
                      animation="wave"
                      height={10}
                      width="50%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                />
              </ListItem>
            </List>
            <List className="list-row">
              <ListItem alignItems="center">
                <ListItemText
                  primary={
                    <Skeleton
                      variant="text"
                      animation="wave"
                      height={10}
                      width="70%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  secondary={
                    <Skeleton
                      variant="text"
                      animation="wave"
                      height={10}
                      width="50%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                />
              </ListItem>
              <ListItem alignItems="center">
                <ListItemText
                  primary={
                    <Skeleton
                      variant="text"
                      animation="wave"
                      height={10}
                      width="70%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  secondary={
                    <Skeleton
                      variant="text"
                      animation="wave"
                      height={10}
                      width="50%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                />
              </ListItem>
            </List>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}

SkeletonSummary.propTypes = {
  loading: PropTypes.bool,
}
