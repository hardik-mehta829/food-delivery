const mongoose = require('mongoose');
const burgerSchema = new mongoose.Schema(
  {
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
      default: 'McDonald',
    },
    ratingsAverage: {
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
burgerSchema.virtual('reviews', {
  ref: 'McReview2',
  foreignField: 'item',
  localField: '_id',
});
const McDonald = mongoose.model('McDonald', burgerSchema);
module.exports = McDonald;
