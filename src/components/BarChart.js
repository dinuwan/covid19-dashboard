import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import {
  BarChart,
  Bar,
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
  }
}))

const BarCharts = ({ title, data, dataKey, labelName, fill }) => {
  const classes = useStyles()

  return (
    <Card variant='outlined' className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography variant='subtitle1'>{title}</Typography>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            // width={500}
            // height={300}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 8,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill={fill} name={labelName} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default BarCharts
