import { useEffect, useState } from 'react'
import { Grid, Typography, Paper, Box, Button, Container } from '@mui/material'

import cartService from '../../services/CartService'
import { Cart as CartType } from './types'
import OrderSummary from './OrderSummary'
import { useNavigate } from 'react-router-dom'
import ShippingForm from './ShippingForm'

const Checkout = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState<CartType>({
    id: '',
    items: [],
    totalPrice: 0,
  })
  useEffect(() => {
    const cartId = localStorage.getItem('cartId')
    if (cartId) {
      cartService.getCart(cartId).then((data) => {
        setCart({
          id: data.id,
          totalPrice: data.totalPrice,
          items: data.items,
        })
      })
    }
  }, [])

  const handleHandleCheckout = () => {
    navigate('/checkout')
  }

  return (
    <Box maxHeight={500} p={5}>
      <Grid container spacing={1}>
        <Grid container item xs={7}>
          <Paper
            elevation={0}
            sx={{
              maxHeight: 500,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              padding: 1,
            }}
          >
            <Container
              sx={{
                height: '100%',
                width: '100%',
                padding: 0,
                margin: 0,
              }}
            >
              <Typography variant="h5" component="h5" gutterBottom>
                Contact Information
              </Typography>
              <ShippingForm />
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <OrderSummary {...cart} />
          <Box>
            <Button onClick={handleHandleCheckout}>Proceed</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export { Checkout }
