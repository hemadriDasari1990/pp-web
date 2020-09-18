import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
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
  center: {},
}))

export default function SkeletonListCard(props) {
  const { loading = false } = props
  const classes = useStyles()

  return (
    <Card>
      <CardHeader
        title={
          <Skeleton variant="text" animation="wave" height={10} width="60%" />
        }
        action={
          <Skeleton variant="text" animation="wave" height={10} width="30%" />
        }
      ></CardHeader>
      <CardContent>
        <List>
          <ListItem className="p-1 w-us">
            <ListItemAvatar>
              <Skeleton
                animation="wave"
                variant="circle"
                width={40}
                height={40}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Skeleton
                  variant="text"
                  animation="wave"
                  height={10}
                  width="90%"
                  style={{ marginBottom: 6 }}
                />
              }
              secondary={
                <Skeleton
                  variant="text"
                  animation="wave"
                  height={10}
                  width="70%"
                  style={{ marginBottom: 6 }}
                />
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}

SkeletonListCard.propTypes = {
  loading: PropTypes.bool,
}
