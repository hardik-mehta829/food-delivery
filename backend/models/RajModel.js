const mongoose = require('mongoose');
const RajSchema = new mongoose.Schema({
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
    default: 'Raj',
  },
  image: {
    type: String,
  },
  ratingsAverage: {
    type: Number,
  },
});
RajSchema.virtual('reviews', {
  ref: 'RajReview',
  foreignField: 'item',
  localField: '_id',
});
const Raj = mongoose.model('Raj', RajSchema);
module.exports = Raj;
