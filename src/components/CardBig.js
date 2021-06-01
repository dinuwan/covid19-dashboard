import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Card,
  Grid,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.color,
    height: props.height || 120
  }),
  value: props => ({
    fontSize: 38,
    color: props.textColor || 'textSecondary'
  }),
  title: props => ({
    fontSize: 16,
    color: props.textColor || 'textPrimary'
  }),
  cardContent: props => ({
    // height: props.height || 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 16,
    '&:last-child': {
      paddingBottom: 16
    }
  })
}))

export default function CardBig({
  icon,
  value,
  color,
  title,
  height,
  textColor
}) {
  const classes = useStyles({ color, height, textColor })

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title}>{title}</Typography>
        <Typography className={classes.value}>{value}</Typography>
      </CardContent>
    </Card>
  )
}
