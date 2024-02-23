import numeral from 'numeral'
import { FORMATS } from '../constants/currency'

export const formatPrice = (price: string | number) => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  if (isNaN(numericPrice)) {
    throw new Error('Invalid Price')
  }

  return numeral(numericPrice).format(FORMATS.PRODUCT)
}
