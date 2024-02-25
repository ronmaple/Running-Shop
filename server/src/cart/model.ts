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

const cart = mongoose.model('cart', cartSchema)

export default cart
