import { PropsWithChildren, useEffect, useState } from 'react'
import { Grid, Typography, Paper, Box, Button, Container } from '@mui/material'
import { useParams } from 'react-router-dom'

import { formatPrice } from '../../utils/numberFormatter'
import { formatImageUrl } from '../../utils/formatImageUrl'
import { Image } from '../../components/Image'
import cartService from '../../services/CartService'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

type Cart = {
  items: CartItem[]
  totalPrice: number
}

const Cart = () => {
  const [cart, setCart] = useState<Cart>({
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
              {cart.items.map((item: CartItem) => (
                <CartItemComponent {...item} />
              ))}
            </Container>
          </Paper>
        </Grid>
        {/* Checkout Totals */}
        <Grid item xs={5}>
          <Paper
            elevation={0}
            sx={{
              height: 500,
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#fafafa',
            }}
          >
            <Container
              sx={{
                height: '100%',
              }}
            >
              <Typography variant="h5" component="h5" gutterBottom>
                Order Summary
              </Typography>
              <Button>Checkout</Button>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

type CartItemProps = PropsWithChildren<CartItem>

type CartItem = {
  id: string
  description: string
  title: string
  quantity: number
  images: string[]
  pricePerUnit: number
}

// TODO: add to its own file
const CartItemComponent = (props: CartItemProps) => {
  const { id, description, title, quantity, images, pricePerUnit } = props

  return (
    <Grid container boxSizing={'border-box'}>
      <Grid item xs={4} sx={{ padding: 1 }} alignItems={'center'}>
        <Image src={formatImageUrl(images[0])} />
      </Grid>
      <Grid item xs={8}>
        <Box display="flex" flexDirection="column" height="100%">
          <Box padding={1}>
            <Typography variant="h6" component="h6" gutterBottom>
              {title}
              {/* In the future, add the size selection here too */}
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              padding: 1,
            }}
            boxSizing={'border-box'}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box textAlign={'center'}>
                <Typography variant="subtitle1">Qty</Typography>
              </Box>
              <Box display={'flex'}>
                <Button
                  sx={{
                    '&:hover': {
                      background: 'none',
                    },
                  }}
                  disableRipple
                >
                  -
                </Button>
                <Box sx={{ alignContent: 'center' }}>
                  <Typography variant="subtitle2">{quantity}</Typography>
                </Box>
                <Button
                  sx={{
                    '&:hover': {
                      background: 'none',
                    },
                  }}
                  disableRipple
                >
                  +
                </Button>
              </Box>
            </Box>

            <Box
              width="100%"
              alignContent="center"
              textAlign="right"
              marginRight={1}
            >
              <Typography variant="h6">
                {formatPrice(pricePerUnit * quantity, true)}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-start" marginLeft={2}>
            <IconButton disableRipple>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export { Cart }
