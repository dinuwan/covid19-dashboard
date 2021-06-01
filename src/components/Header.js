import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

import CountrySelector from './CountrySelector'
import Logo from '../logo.svg'

const useStyles = makeStyles(theme => ({
  root: {
    // height: 100
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  logo: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginBottom: theme.spacing(2)
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    }
  }
}))

const Header = ({ setSelectedCountry, selectedCountry }) => {
  const classes = useStyles()

  return (
    <Grid
      container
      justify='space-between'
      alignItems='center'
      className={classes.root}
    >
      <Grid item xs={12} md={4} lg={4} className={classes.logo}>
        <img src={Logo} alt='logo' />
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <CountrySelector
          setSelectedCountry={setSelectedCountry}
          selectedCountry={selectedCountry}
        />
      </Grid>
    </Grid>
  )
}

export default Header
