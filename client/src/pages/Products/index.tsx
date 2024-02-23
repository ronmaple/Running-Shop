import { useEffect, useState } from 'react'
import {
  // Button,
  Card,
  // CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { formatPrice } from '../../utils/numberFormatter'

export type Product = {
  id: string
  title: string
  description?: string
  unitPrice: number
  salePrice: number
  inventory?: number
  images: string[]
}
interface ResponseData {
  data: any[]
  total: number
  cursor: any
}

interface ProductResponse extends ResponseData {
  data: Product[]
  total: number
  cursor: any
}

const getProducts = async () => {
  const response = await fetch('http://localhost:3000/products')
  const data = await response.json()
  // todo: { standardize server response }
  return data
}

// TODO:
// 1. environment variable for url
const Products = (props) => {
  const [products, setProducts] = useState<ProductResponse>({
    data: [],
    total: 0,
    cursor: null,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()

  useEffect(() => {
    // todo make this better
    setLoading(true)
    getProducts()
      .then((res) => {
        console.log(res)
        setProducts(res)
      })
      .catch((err) => {
        setError(err)
      })
    setLoading(false)
  }, [])

  return (
    <div>
      <>
        {loading ? (
          <div>loading...</div>
        ) : (
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {products.data.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 4:3
                        pt: '75%',
                      }}
                      image={`http://localhost:3000/static/${product.images[0]}`}
                    />
                    <CardContent sx={{ flexGrow: 3 }}>
                      <Typography variant="h6" component="h6">
                        {product.title}
                      </Typography>
                      <Typography variant="subtitle1">
                        {formatPrice(product.salePrice)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </>
    </div>
  )
}

export { Products }
