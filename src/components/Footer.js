import React from 'react'
import { Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}))

export default function Album() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Typography variant='h6' align='center' gutterBottom>
        COVID 19 UPDATES
      </Typography>
      <Typography variant='body2' color='textSecondary' align='center'>
        <Link
          color='inherit'
          href='https://github.com/dinuwan/covid19-dashboard'
        >
          Source
        </Link>
        {' - '}
        <Link color='inherit' href='https://about-corona.net/documentation'>
          API
        </Link>
      </Typography>
    </footer>
  )
}
