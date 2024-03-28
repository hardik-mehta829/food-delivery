const mongoose = require('mongoose');
const MenuSchema = new mongoose.Schema(
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
      default: 'Volga',
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
MenuSchema.virtual('reviews', {
  ref: 'VolgaReview',
  foreignField: 'item',
  localField: '_id',
});
const Volga = mongoose.model('Volga', MenuSchema);
module.exports = Volga;
