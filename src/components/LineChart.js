import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import { Card, CardContent, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    height: 500
  },
  cardContent: {
    height: 450,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 16,
    '&:last-child': {
      paddingBottom: 16
    }
  },
  title: {
    fontSize: 22
    // color: '#fff'
  }
}))

const MainChart = ({ globaldata, localdata, selectedCountry }) => {
  const classes = useStyles()

  let d = []

  if (selectedCountry && selectedCountry.name === 'World') {
    for (let index = globaldata.length - 1; index >= 0; index--) {
      d.push({
        confirmed: globaldata[index].confirmed,
        deaths: globaldata[index].deaths,
        recovered: globaldata[index].recovered,
        date: globaldata[index].date
      })
    }
  } else if (selectedCountry && selectedCountry.name !== 'World' && localdata) {
    for (let index = localdata.timeline.length - 1; index >= 0; index--) {
      d.push({
        confirmed: localdata.timeline[index].confirmed,
        deaths: localdata.timeline[index].deaths,
        recovered: localdata.timeline[index].recovered,
        date: localdata.timeline[index].date
      })
    }
  }

  return (
    <Card variant='outlined' className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography variant='subtitle1'>Timeline</Typography>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            // width={500}
            //   height={300}
            data={d}
            margin={{
              top: 0,
              right: 0,
              left: 32,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis type='number' />
            <Tooltip />
            <Legend iconType='square' margin={{ top: 8 }} />
            <Line
              type='monotone'
              dataKey='confirmed'
              name='Confirmed'
              stroke='#ef5350'
              // activeDot={{ r: 8 }}
              dot={false}
              strokeWidth={3}
            />
            <Line
              type='monotone'
              dataKey='recovered'
              name='Recovered'
              stroke='#66bb6a'
              dot={false}
              strokeWidth={3}
            />
            <Line
              type='monotone'
              dataKey='deaths'
              name='Deaths'
              stroke='#bdbdbd'
              dot={false}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default MainChart
