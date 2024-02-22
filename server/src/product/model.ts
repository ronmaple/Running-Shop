import mongoose, { Schema } from 'mongoose'

export interface Product {
  id?: string
  title: string
  description?: string
  unitPrice: number
  salePrice: number
  inventory?: number
  images: string[]
}

const productSchema = new Schema(
  {
    id: String,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: false,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    // TODO possibly add inventory location at some point
    inventory: {
      type: Number,
      default: 0,
    },
    images: [String],

    // Todo: product categories
    // Todo: distinguish between unit price and price to sell
  },
  {
    timestamps: true,
  }
)

const product = mongoose.model('product', productSchema)

export default product
