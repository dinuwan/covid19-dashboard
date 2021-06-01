import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid, CardContent, Typography } from '@material-ui/core'

import CardBig from '../components/CardBig'
import MainChart from '../components/LineChart'

const useStyles = makeStyles(theme => ({
  root: {
    height: 500
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

const LineChartSection = ({ globaldata, localdata, selectedCountry }) => {
  const classes = useStyles()

  let cardData = []

  if (selectedCountry && selectedCountry.name === 'World') {
    cardData = [
      {
        title: 'Confimed cases',
        value: globaldata[0].new_confirmed,
        textColor: '#fff'
      },
      {
        title: 'Recovered',
        value: globaldata[0].new_recovered,
        textColor: '#fff'
      },
      {
        title: 'Deaths',
        value: globaldata[0].new_deaths,
        textColor: '#fff'
      }
    ]
  } else if (selectedCountry && selectedCountry.name !== 'World' && localdata) {
    cardData = [
      {
        title: 'Confimed cases',
        value: localdata.today.confirmed,
        textColor: '#fff'
      },
      {
        title: 'Recovered',
        value: localdata.today.recovered || 0,
        textColor: '#fff'
      },
      {
        title: 'Deaths',
        value: localdata.today.deaths,
        textColor: '#fff'
      }
    ]
  }

  return (
    <Grid container spacing={3} direction='row'>
      <Grid item xs={12} lg={8}>
        <MainChart
          globaldata={globaldata}
          localdata={localdata}
          selectedCountry={selectedCountry}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card className={classes.root} variant='outlined'>
          <CardContent className={classes.cardContent}>
            <Grid
              spacing={3}
              container
              direction='column'
              justify='space-evenly'
              // alignItems='stretch'
            >
              <Grid item>
                <Typography
                  className={classes.heading}
                  variant='subtitle1'
                  component='h2'
                >
                  Daily Figures
                </Typography>
              </Grid>

              {cardData.map(i => (
                <Grid item key={i.title}>
                  <CardBig
                    title={i.title}
                    value={i.value}
                    color={i.color}
                    // textColor={i.textColor}
                    height='80'
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LineChartSection
