import React, { PropsWithChildren } from 'react'
import { Grid, Typography, Box, Button as MuiButton } from '@mui/material'

import { formatPrice } from '../../utils/numberFormatter'
import { formatImageUrl } from '../../utils/formatImageUrl'
import { Image } from '../../components/Image'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  CartItem as CartItemType,
  Cart as CartType,
  CartItemActions,
} from './types'

type CartItemProps = PropsWithChildren<
  CartItemType & {
    handleAction: (cartId: CartType['id'], action: CartItemActions) => void
  }
>

type ButtonProps = PropsWithChildren<{
  label: string
  disableHover?: boolean
  onClick?: ([key]: any) => any
}>

//Todo: make generic buttons later
const Button = (props: ButtonProps) => {
  const { disableHover = false, ...rest } = props
  // todo use mui styles
  const styles: any = {}
  if (disableHover) {
    styles['&:hover'] = {
      background: 'none',
    }
  }

  return (
    <MuiButton {...rest} sx={styles} disableRipple={!!props.disableHover}>
      {props.label}
    </MuiButton>
  )
}

const CartItem = (props: CartItemProps) => {
  const { id, title, quantity, images, pricePerUnit } = props

  const handleIncrementQuantity = (
    _event: React.MouseEvent<HTMLButtonElement>
  ) => {
    props.handleAction(id, CartItemActions.increment)
  }

  const handleDecrementQuantity = (
    _event: React.MouseEvent<HTMLButtonElement>
  ) => {
    props.handleAction(id, CartItemActions.decrement)
  }

  const handleRemoveItem = (_event: React.MouseEvent<HTMLButtonElement>) => {
    props.handleAction(id, CartItemActions.remove)
  }

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
                  onClick={handleDecrementQuantity}
                  disableHover={true}
                  label="-"
                />
                <Box alignContent="center">
                  <Typography variant="subtitle2">{quantity}</Typography>
                </Box>
                <Button
                  onClick={handleIncrementQuantity}
                  disableHover={true}
                  label="+"
                />
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
            <IconButton onClick={handleRemoveItem} disableRipple>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default CartItem
