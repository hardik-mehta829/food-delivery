const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Email is not correct',
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [5, 'Minimum length should be 5'],
    select: false,
  },
  passwordconfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    minLength: [5, 'Minimum length should be 5'],
    // validate: {
    //   validator: function (val) {
    //     return val === this.password;
    //   },
    //   message: 'Passwords are not the same',
    // },
  },
  passwordResetToken: String,
  TokenExpires: Date,
  passwordChangedAt: Date,
  cartMc: [
    {
      // item: { type: mongoose.Schema.Types.ObjectId, ref: 'PunjabiZyaka' },
      itemid: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 0 },
    },
  ],
  cartKing: [
    {
      // item: { type: mongoose.Schema.Types.ObjectId, ref: 'PunjabiZyaka' },
      itemid: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 0 },
    },
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'burgerking',
    // },
  ],
  cartPatel: [
    // { type: mongoose.Schema.Types.ObjectId, ref: 'Patel' }
    {
      // item: { type: mongoose.Schema.Types.ObjectId, ref: 'PunjabiZyaka' },
      itemid: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 0 },
    },
  ],
  cartPunjabiZyaka: [
    {
      // item: { type: mongoose.Schema.Types.ObjectId, ref: 'PunjabiZyaka' },
      itemid: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 0 },
    },
    // { type: mongoose.Schema.Types.ObjectId, ref: 'PunjabiZyaka' },
  ],
  cartTansen: [
    {
      // item: { type: mongoose.Schema.Types.ObjectId, ref: 'PunjabiZyaka' },
      itemid: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 0 },
    },
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Tansen',
    // },
  ],
  cartChawla: [
    {
      // item: { type: mongoose.Schema.Types.ObjectId, ref: 'PunjabiZyaka' },
      itemid: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 0 },
    },
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'ChawlaChicken',
    // },
  ],
  cartDreamArena: [
    {
      // item: { type: mongoose.Schema.Types.ObjectId, ref: 'PunjabiZyaka' },
      itemid: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 0 },
    },
    // { type: mongoose.Schema.Types.ObjectId, ref: 'DreamArena' }
  ],
  cartSherePunjabi: [
    {
      // item: { type: mongoose.Schema.Types.ObjectId, ref: 'PunjabiZyaka' },
      itemid: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 0 },
    },
    // { type: mongoose.Schema.Types.ObjectId, ref: 'SherePunjabi' },
  ],
  cartRaj: [
    {
      // item: { type: mongoose.Schema.Types.ObjectId, ref: 'PunjabiZyaka' },
      itemid: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 0 },
    },
    // { type: mongoose.Schema.Types.ObjectId, ref: 'Raj' }
  ],
  cartVolga: [
    {
      // item: { type: mongoose.Schema.Types.ObjectId, ref: 'PunjabiZyaka' },
      itemid: { type: mongoose.Schema.Types.ObjectId },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 0 },
    },
    // { type: mongoose.Schema.Types.ObjectId, ref: 'Volga' }
  ],
  selectedRestaurant: String,
  totalcost: Number,
});
userschema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordconfirm = undefined;
  next();
});
userschema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;

  next();
});
userschema.methods.changedPasswordAfter = function (
  jwtTimeStamp,
  passwordChangedAt
) {
  console.log(jwtTimeStamp, Date.parse(passwordChangedAt));
  console.log(jwtTimeStamp < Date.parse(passwordChangedAt));
  return jwtTimeStamp * 1000 < Date.parse(passwordChangedAt);
};
userschema.methods.generateToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log(resetToken, this.passwordResetToken);
  this.TokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
userschema.methods.resetpassword = function () {};
const usermodel = mongoose.model('usermodel', userschema);
module.exports = usermodel;
