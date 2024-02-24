import { useEffect, useState } from 'react'
import { Grid, Typography, Paper, Box, Button, Container } from '@mui/material'
import { useParams } from 'react-router-dom'

import { formatPrice } from '../../utils/numberFormatter'
import { formatImageUrl } from '../../utils/formatImageUrl'
import { Image } from '../../components/Image'

export type Product = {
  id: string
  title: string
  description?: string
  unitPrice: number
  salePrice: number
  inventory?: number
  images: string[]
}

const getProduct = async (id) => {
  const response = await fetch(`http://localhost:3000/products/${id}`)
  const data = await response.json()
  return data
}

const ProductDetail = (props) => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product>({} as Product)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error>()

  console.log('----')
  useEffect(() => {
    // todo make this better
    setLoading(true)
    getProduct(id)
      .then((res) => {
        setProduct(res)
        console.log('2')
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [id])

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
            <Button>Add To Cart</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export { ProductDetail }
