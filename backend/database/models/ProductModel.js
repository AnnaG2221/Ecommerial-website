const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description:{
      type: String,
      default:''
    },
    category: {
      type: String,
      default:''
    },
    price: {
      type:Number,
      default:0
    },
    quantity:{
      type: Number,
      default:0
    },
    link: {
      type: String,
      default:''
    },
    cartQuantity: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product;
