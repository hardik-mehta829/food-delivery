const mongoose = require('mongoose');
const ChawlaSchema = new mongoose.Schema({
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
ChawlaSchema.virtual('reviews', {
  ref: 'ChawlaChickenReview',
  foreignField: 'item',
  localField: '_id',
});
const ChawlaChicken = mongoose.model('ChawlaChicken', ChawlaSchema);
module.exports = ChawlaChicken;
