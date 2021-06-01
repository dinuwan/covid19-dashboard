import React from 'react'
import Grid from '@material-ui/core/Grid'

import CardBig from '../components/CardBig'

const TopCards = ({ globaldata, localdata, selectedCountry }) => {
  let data = []

  if (selectedCountry && selectedCountry.name === 'World') {
    data = [
      {
        title: 'Confimed cases',
        value: globaldata[0].confirmed,
        color: '#ffbcaf'
        // textColor: 'white'
      },
      {
        title: 'Recovered',
        value: globaldata[0].recovered,
        color: '#b9f6ca'
        // textColor: '#fff'
      },
      {
        title: 'Deaths',
        value: globaldata[0].deaths,
        color: '#cfd8dc'
        // textColor: '#fff'
      }
    ]
  } else if (selectedCountry && selectedCountry.name !== 'World' && localdata) {
    data = [
      {
        title: 'Confimed cases',
        value: localdata.latest_data.confirmed,
        color: '#ffbcaf'
        // textColor: 'white'
      },
      {
        title: 'Recovered',
        value: localdata.latest_data.recovered,
        color: '#b9f6ca'
        // textColor: '#fff'
      },
      {
        title: 'Deaths',
        value: localdata.latest_data.deaths,
        color: '#cfd8dc'
        // textColor: '#fff'
      }
    ]
  }

  return (
    <Grid container spacing={3}>
      {data.map(i => (
        <Grid item xs={12} md={4} lg={4} key={i.title}>
          <CardBig
            title={i.title}
            value={i.value}
            color={i.color}
            textColor={i.textColor}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default TopCards
