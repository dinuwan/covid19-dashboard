import React from 'react'
import { Card, CardContent } from '@material-ui/core'

import DataTable from '../components/DataTable'

const TableSection = ({ countrydata }) => {
  return (
    <Card variant='outlined'>
      <CardContent>
        <DataTable countrydata={countrydata} />
      </CardContent>
    </Card>
  )
}

export default TableSection
