import { useEffect, useState } from 'react'
import { Grid, Typography, Paper, Box, Button, Container } from '@mui/material'
import { useParams } from 'react-router-dom'

import { formatPrice } from '../../utils/numberFormatter'
import { formatImageUrl } from '../../utils/formatImageUrl'
import { Image } from '../../components/Image'

const Cart = () => {
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
            <Container
              sx={{
                height: '100%',
              }}
            >
              <Typography py={2} variant="h4" component="h4" gutterBottom>
                Items
              </Typography>
              <Button>+</Button>
              <Button>-</Button>
              <Button>Remove</Button>
              <Button>Favorite</Button>
            </Container>
          </Paper>
        </Grid>
        {/* Checkout Totals */}
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

export { Cart }
