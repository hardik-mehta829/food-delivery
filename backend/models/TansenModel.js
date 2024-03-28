const mongoose = require('mongoose');
const MenuSchema = new mongoose.Schema({
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
  image: {
    type: 'String',
    required: [true, 'A food item must have an image'],
  },
  place: {
    type: String,
    default: 'Tansen',
  },
  ratingsAverage: {
    type: Number,
  },
});
MenuSchema.virtual('reviews', {
  ref: 'TansenReview',
  foreignField: 'item',
  localField: '_id',
});
const Tansen = mongoose.model('Tansen', MenuSchema);
module.exports = Tansen;
