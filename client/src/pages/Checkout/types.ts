export type Cart = {
  id: string
  items: CartItem[]
  totalPrice: number
}

export type CartItem = {
  id: string
  description: string
  title: string
  quantity: number
  images: string[]
  pricePerUnit: number
}

export enum CartItemActions {
  increment = 'increment',
  decrement = 'decrement',
  remove = 'remove',
}
