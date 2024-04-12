import { useEffect, useState } from 'react'
import { Grid, Typography, Paper, Box, Button, Container } from '@mui/material'

import cartService from '../../services/CartService'
import { Cart as CartType, CartItem as CartItemType } from './types'
import CartItem from './CartItem'
import CheckoutSummary from './CheckoutSummary'

const Cart = () => {
  const [cart, setCart] = useState<CartType>({
    items: [],
    totalPrice: 0,
  })
  useEffect(() => {
    const cartId = localStorage.getItem('cartId')
    if (cartId) {
      cartService.getCart(cartId).then((data) => {
        setCart({
          totalPrice: data.totalPrice,
          items: data.items,
        })
      })
    }
  }, [])
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
                Items
              </Typography>
              {cart.items.map((item: CartItemType) => (
                <CartItem {...item} />
              ))}
            </Container>
          </Paper>
        </Grid>
        {/* Checkout Totals */}
        <Grid item xs={5}>
          <CheckoutSummary {...cart} />
          <Box>
            <Button>Checkout</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export { Cart }
