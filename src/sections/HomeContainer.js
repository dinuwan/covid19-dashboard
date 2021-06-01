import React from 'react'
import { Grid } from '@material-ui/core'

import TopCards from './TopCards'
import LineChartSection from './LineChartSection'
import BarChartSection from './BarChartSection'
import TableSection from './TableSection'

const HomeContainer = ({
  globaldata,
  countrydata,
  localdata,
  selectedCountry
}) => {
  return (
    <Grid container direction='column' spacing={5}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <TopCards
          globaldata={globaldata}
          localdata={localdata}
          selectedCountry={selectedCountry}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <LineChartSection
          globaldata={globaldata}
          localdata={localdata}
          selectedCountry={selectedCountry}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <BarChartSection
          globaldata={globaldata}
          localdata={localdata}
          selectedCountry={selectedCountry}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <TableSection countrydata={countrydata} />
      </Grid>
    </Grid>
  )
}

export default HomeContainer
