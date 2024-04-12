export type Cart = {
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
