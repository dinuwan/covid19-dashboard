import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TableRow
} from '@material-ui/core'

function createData(
  name,
  newConfirmed,
  newDeaths,
  confirmed,
  deaths,
  recovered,
  critical,
  deathRate,
  recoveryRate,
  casesPerMillion,
  population
) {
  return {
    name,
    newConfirmed,
    newDeaths,
    confirmed,
    deaths,
    recovered,
    critical,
    deathRate,
    recoveryRate,
    casesPerMillion,
    population
  }
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Country'
  },

  {
    id: 'newConfirmed',
    numeric: true,
    disablePadding: false,
    label: 'New cases'
  },
  {
    id: 'newDeaths',
    numeric: true,
    disablePadding: false,
    label: 'New deaths'
  },
  {
    id: 'confirmed',
    numeric: true,
    disablePadding: false,
    label: 'Total cases'
  },
  { id: 'deaths', numeric: true, disablePadding: false, label: 'Total deaths' },
  {
    id: 'recovered',
    numeric: true,
    disablePadding: false,
    label: 'Recovered'
  },
  { id: 'critical', numeric: true, disablePadding: false, label: 'Critical' },
  {
    id: 'deathRate',
    numeric: true,
    disablePadding: false,
    label: 'Death rate'
  },
  {
    id: 'recoveryRate',
    numeric: true,
    disablePadding: false,
    label: 'Recovery rate'
  },
  {
    id: 'casesPerMillion',
    numeric: true,
    disablePadding: false,
    label: 'Cases/Million'
  },
  {
    id: 'population',
    numeric: true,
    disablePadding: false,
    label: 'Population'
  }
]

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding='checkbox'> */}
        {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
        {/* </TableCell> */}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

function roundUp(num, precision) {
  precision = Math.pow(10, precision)
  return Math.ceil(num * precision) / precision
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

export default function EnhancedTable({ countrydata }) {
  const classes = useStyles()
  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('confirmed')

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  let rows = []
  countrydata.forEach(country => {
    rows.push(
      createData(
        country.name,
        country.today.confirmed,
        country.today.deaths,
        country.latest_data.confirmed,
        country.latest_data.deaths,
        country.latest_data.recovered,
        country.latest_data.critical,
        roundUp(country.latest_data.calculated.death_rate, 2),
        roundUp(country.latest_data.calculated.recovery_rate, 2),
        country.latest_data.calculated.cases_per_million_population,
        country.population
      )
    )
  })

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby='tableTitle'
          aria-label='enhanced table'
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map(
              (row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.name}>
                    <TableCell component='th' scope='row' padding='default'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>{row.newConfirmed}</TableCell>
                    <TableCell align='right'>{row.newDeaths}</TableCell>
                    <TableCell align='right'>{row.confirmed}</TableCell>
                    <TableCell align='right'>{row.deaths}</TableCell>
                    <TableCell align='right'>{row.recovered}</TableCell>
                    <TableCell align='right'>{row.critical}</TableCell>
                    <TableCell align='right'>{row.deathRate}</TableCell>
                    <TableCell align='right'>{row.recoveryRate}</TableCell>
                    <TableCell align='right'>{row.casesPerMillion}</TableCell>
                    <TableCell align='right'>{row.population}</TableCell>
                  </TableRow>
                )
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
