import mongoose, { Schema } from 'mongoose'

const cartItem = new Schema({
  id: String,
  description: String,
  title: String,
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  pricePerUnit: Number,
})

const cartSchema = new Schema(
  {
    id: String,
    items: [cartItem],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // TODO disambuigate tax
    totalPrice: Number,
  },
  {
    timestamps: true,
  }
)

const cart = mongoose.model('cart', cartSchema)

export default cart
