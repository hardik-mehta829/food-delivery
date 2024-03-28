const mongoose = require('mongoose');
const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  ratingsAverage: {
    type: Number,
  },
});
// RestaurantSchema.virtual('reviews', {
//   ref: 'burgerKingReview',
//   foreignField: 'item',
//   localField: '_id',
// });
const Restaurants = mongoose.model('Restaurants', RestaurantSchema);
module.exports = Restaurants;
