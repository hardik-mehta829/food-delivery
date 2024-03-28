const mongoose = require('mongoose');
const ArenaSchema = new mongoose.Schema({
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
    default: 'DreamArena',
  },
  image: {
    type: String,
  },
  ratingsAverage: {
    type: Number,
  },
});
ArenaSchema.virtual('reviews', {
  ref: 'DreamArenaReview',
  foreignField: 'item',
  localField: '_id',
});
const DreamArena = mongoose.model('DreamArena', ArenaSchema);
module.exports = DreamArena;
