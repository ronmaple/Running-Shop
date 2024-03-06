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
    // todo: standardize time formats
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      },
    },
  }
)

const product = mongoose.model('product', productSchema)

export default product
