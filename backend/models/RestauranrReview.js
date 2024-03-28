const mongoose = require('mongoose');
const RestaurantModel = require('./RestaurantModel');
const ReviewSchema = new mongoose.Schema({
  review: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usermodel',
    required: [true, 'Review must be posted by a user'],
  },
  // item: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'RestaurantModel',
  //   required: [true, 'Review must belong to an item '],
  // },
  item: {
    type: String,
    required: [true, 'Review must belong to an restaurant '],
  },
});
// ReviewSchema.index({ item: 1, user: 1 }, { unique: true });
ReviewSchema.statics.calcAvgRatings = async function (itemID) {
  const stats = await this.aggregate([
    { $match: { item: itemID } },
    { $group: { _id: '$item', avgRating: { $avg: '$rating' } } },
  ]);
  console.log(stats);
  await RestaurantModel.findOneAndUpdate(
    { name: itemID },
    {
      ratingsAverage: stats[0].avgRating,
    }
  );
};
ReviewSchema.post('save', function (next) {
  this.constructor.calcAvgRatings(this.item);
});

const RestaurantReview = mongoose.model('RestaurantReview', ReviewSchema);
module.exports = RestaurantReview;
