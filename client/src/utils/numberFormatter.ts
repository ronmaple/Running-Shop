import numeral from 'numeral'
import { FORMATS } from '../constants/currency'

export const formatPrice = (price: string | number, decimal?: true) => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  if (isNaN(numericPrice)) {
    throw new Error('Invalid Price')
  }

  let format = decimal ? FORMATS.CURRENCY : FORMATS.PRODUCT
  return numeral(numericPrice).format(format)
}
