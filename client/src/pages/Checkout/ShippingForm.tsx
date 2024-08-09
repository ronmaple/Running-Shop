import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'

const provinces = [
  { label: 'AB', value: 'AB' },
  { label: 'BC', value: 'BC' },
  { label: 'MB', value: 'MB' },
  { label: 'NB', value: 'NB' },
  { label: 'NL', value: 'NL' },
  { label: 'NS', value: 'NS' },
  { label: 'ON', value: 'ON' },
  { label: 'PE', value: 'PE' },
  { label: 'QC', value: 'QC' },
  { label: 'SK', value: 'SK' },
  { label: 'NT', value: 'NT' },
  { label: 'NU', value: 'NU' },
  { label: 'YT', value: 'YT' },
]

const ShippingForm = () => {
  const navigate = useNavigate()
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Card>
          <form>
            <CardContent>
              <Grid item container spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    name="First Name"
                    value="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    value="Last Name"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={12}>
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    value="778-555-1234"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={12}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    value="778-555-1234"
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    name="city"
                    value="City"
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Province</InputLabel>
                    <Select label="Province" name="occupation">
                      <MenuItem>None</MenuItem>
                      {provinces.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <TextField
                    label="Postal Code"
                    variant="outlined"
                    fullWidth
                    name="postalCode"
                    value="V5V2B2"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate('/order/checkout/payment')
                }}
              >
                Next Steps
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ShippingForm
