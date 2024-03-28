const mongoose = require('mongoose');
const burgerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  class: {
    type: String,
  },
  place: {
    type: String,
    default: 'BurgerKing',
  },
  image: {
    type: String,
  },
  ratingsAverage: {
    type: Number,
  },
});
burgerSchema.virtual('reviews', {
  ref: 'burgerKingReview',
  foreignField: 'item',
  localField: '_id',
});
const burgerking = mongoose.model('burgerking', burgerSchema);
module.exports = burgerking;
