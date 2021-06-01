import React from 'react'
import { Grid } from '@material-ui/core'

import BarChart from '../components/BarChart'

const LineChartSection = ({ globaldata, localdata, selectedCountry }) => {
  let data = {
    confirmed: [],
    recovered: [],
    deaths: []
  }

  if (selectedCountry && selectedCountry.name === 'World') {
    for (let index = globaldata.length - 1; index >= 0; index--) {
      data.confirmed.push({
        confirmed: globaldata[index].new_confirmed,
        date: globaldata[index].date
      })
      data.recovered.push({
        recovered: globaldata[index].new_recovered,
        date: globaldata[index].date
      })
      data.deaths.push({
        deaths: globaldata[index].new_deaths,
        date: globaldata[index].date
      })
    }
  } else if (selectedCountry && selectedCountry.name !== 'World' && localdata) {
    for (let index = localdata.timeline.length - 1; index >= 0; index--) {
      data.confirmed.push({
        confirmed: localdata.timeline[index].new_confirmed,
        date: localdata.timeline[index].date
      })
      data.recovered.push({
        recovered: localdata.timeline[index].new_recovered,
        date: localdata.timeline[index].date
      })
      data.deaths.push({
        deaths: localdata.timeline[index].new_deaths,
        date: localdata.timeline[index].date
      })
    }
  }

  return (
    <Grid container direction='row' spacing={3}>
      <Grid item xs={12} lg={4}>
        <BarChart
          title='Daily Infections'
          data={data.confirmed}
          dataKey='confirmed'
          labelName='Confirmed'
          fill='#66bb6a'
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <BarChart
          title='Daily Recoveries'
          data={data.recovered}
          dataKey='recovered'
          labelName='Recovered'
          fill='#66bb6a'
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <BarChart
          title='Daily Deaths'
          data={data.deaths}
          dataKey='deaths'
          labelName='Deaths'
          fill='#66bb6a'
        />
      </Grid>
    </Grid>
  )
}

export default LineChartSection
