import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const PaymentForm = () => {
  // TODO: Implement Stripe
  const navigate = useNavigate()
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Card>
          <form>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate('/order/checkout/payment')
                }}
              >
                Pay
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PaymentForm
