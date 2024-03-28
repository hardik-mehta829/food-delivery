const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'usermodel',
    required: true,
  },
  restaurant: String,
  // cart: [
  //   {
  //     item: { type: mongoose.Schema.Types.ObjectId, ref: 'McDonald' },
  //     quantity: { type: Number, default: 0 },
  //   },
  // ],
  cart: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalcost: { type: Number },
  location: {},
  rated: { type: Boolean, default: false },
  date: { type: String },
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
