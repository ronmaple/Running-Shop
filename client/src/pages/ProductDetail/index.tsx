import { useEffect, useState } from 'react'
import { Grid, Typography, Paper, Box, Button, Container } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { formatPrice } from '../../utils/numberFormatter'
import { formatImageUrl } from '../../utils/formatImageUrl'
import { Image } from '../../components/Image'

import productService from '../../services/ProductService'
import cartService from '../../services/CartService'

export type Product = {
  id: string
  title: string
  description?: string
  unitPrice: number
  salePrice: number
  inventory?: number
  images: string[]
}

const ProductDetail = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product>({} as Product)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    // todo make this better
    setLoading(true)
    productService
      .getById(id as string)
      .then((res) => {
        setProduct(res)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = async () => {
    // How to make this better?
    // 1. create a provider at root
    // 2. checks if user is present
    // 3. checks if user has open carts(?)
    // 4. or checks if cart is cached
    // 5. if not, create a cart

    // Consider also storing the whole cart
    // but for now, ID would probably do
    let cartId = localStorage.getItem('cartId')
    if (!cartId) {
      const cart = await cartService.createCart()
      cartId = cart.id
      localStorage.setItem('cartId', cart.id)
    }
    await cartService.addToCart(cartId as string, id as string)
    navigate('/cart')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  // TODO: find out why Box is not affecting Paper's height
  // TODO: just use 1 height for the entire thing
  return (
    <Box maxHeight={500} p={5}>
      <Grid container spacing={1}>
        <Grid container item xs={6}>
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
            <Image
              src={formatImageUrl(product.images[0])}
              alt={product.title}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
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
              <Typography py={2} variant="h4" component="h4" gutterBottom>
                {product.title}
              </Typography>
              <Typography py={1} variant="body1" gutterBottom>
                {product.description}
              </Typography>
              <Typography py={1} variant="body2" gutterBottom>
                {formatPrice(product.salePrice)}
              </Typography>
            </Container>
            <Button onClick={handleAddToCart}>Add To Cart</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export { ProductDetail }
