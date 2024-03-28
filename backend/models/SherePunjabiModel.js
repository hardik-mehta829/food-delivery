const mongoose = require('mongoose');
const SherePunjabiSchema = new mongoose.Schema({
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
    default: 'SherePunjabi',
  },
  image: {
    type: String,
  },
  ratingsAverage: {
    type: Number,
  },
});
SherePunjabiSchema.virtual('reviews', {
  ref: 'SherePunjabiReview',
  foreignField: 'item',
  localField: '_id',
});
const SherePunjabi = mongoose.model('SherePunjabi', SherePunjabiSchema);
module.exports = SherePunjabi;
