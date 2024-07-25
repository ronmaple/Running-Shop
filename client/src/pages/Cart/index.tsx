import { useEffect, useState } from 'react'
import { Grid, Typography, Paper, Box, Button, Container } from '@mui/material'

import cartService from '../../services/CartService'
import {
  Cart as CartType,
  CartItem as CartItemType,
  CartItemActions,
} from './types'
import CartItem from './CartItem'
import CheckoutSummary from './CheckoutSummary'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
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

  // debounce? use cartId Map for state?
  // todo: loading
  const handleCartItemAction = async (
    itemId: string,
    action: CartItemActions
  ) => {
    const target = cart.items.find((c) => c.id === itemId)
    if (!target) {
      throw new Error('Cannot find item')
    }

    let updatedCart: CartType
    switch (action) {
      case CartItemActions.increment:
        const increasedQty = target.quantity + 1
        updatedCart = await cartService.updateCartItem(cart.id, itemId, {
          quantity: increasedQty,
        })
        break
      case CartItemActions.decrement:
        const decreasedQty = target.quantity - 1
        updatedCart = await cartService.updateCartItem(cart.id, itemId, {
          quantity: decreasedQty,
        })
        break
      case CartItemActions.remove:
        updatedCart = await cartService.removeCartItem(cart.id, itemId)
        break
      default:
        throw new Error('Unknown Action')
    }
    setCart({
      id: updatedCart.id,
      items: updatedCart.items,
      totalPrice: updatedCart.totalPrice,
    })
  }

  const handleToggleCheckout = () => {
    // console.log('handleToggleCheckout')
    navigate('/order/checkout')
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
                Items
              </Typography>
              {cart.items.map((item: CartItemType) => (
                <CartItem
                  key={item.id}
                  handleAction={handleCartItemAction}
                  {...item}
                />
              ))}
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <CheckoutSummary {...cart} />
          <Box>
            <Button onClick={handleToggleCheckout}>Checkout</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export { Cart }
