import { PropsWithChildren } from 'react'
import { Grid, Typography, Box, Button } from '@mui/material'

import { formatPrice } from '../../utils/numberFormatter'
import { formatImageUrl } from '../../utils/formatImageUrl'
import { Image } from '../../components/Image'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { CartItem as CartItemType } from './types'

type CartItemProps = PropsWithChildren<CartItemType>

const CartItem = (props: CartItemProps) => {
  const { title, quantity, images, pricePerUnit } = props

  return (
    <Grid container boxSizing="border-box">
      <Grid item xs={4} sx={{ padding: 1 }} alignItems="center">
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
            boxSizing="border-box"
          >
            <Box display="flex" flexDirection="column">
              <Box textAlign="center">
                <Typography variant="subtitle1">Qty</Typography>
              </Box>
              <Box display="flex">
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
                <Box alignContent="center">
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

export default CartItem
