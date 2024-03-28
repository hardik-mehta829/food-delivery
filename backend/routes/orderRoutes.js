const express = require('express');
const usermodel = require('../models/usermodel');
const orderModel = require('../models/order');
const Review = require('../models/RestauranrReview');
const {
  body,
  ExpressValidator,
  validationResult,
} = require('express-validator');
const Router = express.Router();
const SECRET_KEY = 'hardik';
const fetchuser = require('../middleware/fetchUser');
Router.get('/singleorder/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const data = await orderModel.findOne({ _id: id });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
Router.post('/review/:id', fetchuser, async function (req, res) {
  try {
    const id = req.params.id;
    console.log(req.body);
    const order = await orderModel.findOne({ _id: id });
    const review = await Review.create({
      item: order.restaurant,
      user: req.user._id,
      rating: req.body.rating,
      review: req.body.review,
    });
    order.rated = true;
    await order.save({ validateBeforeSave: false });
    res.status(200).json({ message: 'Thank you for your feedback' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = Router;
