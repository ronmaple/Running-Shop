import { PropsWithChildren } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { formatPrice } from '../../utils/numberFormatter'
import { Cart } from './types'

type CartProps = PropsWithChildren<Cart>

const CheckoutSummary = (props: CartProps) => {
  const rows = [
    {
      label: 'Subtotal',
      value: props.items.length ? formatPrice(props.totalPrice, true) : '-',
    },
    {
      label: 'Shipping',
      value: 'Free',
    },
    {
      label: 'Taxes',
      value: 'Calculated at checkout',
    },
    {
      label: 'Estimated Total',
      value: props.items.length ? formatPrice(props.totalPrice, true) : '-',
    },
  ]
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5" component="h5" gutterBottom>
                Order Summary
              </Typography>
            </TableCell>
            <TableCell align="right">filler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.label}>
              <TableCell component="th" scope="row">
                {row.label}
              </TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CheckoutSummary
