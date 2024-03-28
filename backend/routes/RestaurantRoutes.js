const express = require('express');
const path = require('path');
const RestaurantModel = require('../models/RestaurantModel');
const usermodel = require('../models/usermodel');
const orderModel = require('../models/order');
const fs = require('fs');
const { default: mongoose } = require('mongoose');
const app = express();
const Router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Review = require('../models/RestauranrReview');

Router.get('/', async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
Router.post('/review/:name', fetchuser, async function (req, res) {
  try {
    const review = await Review.create({
      item: req.params.name,
      user: req.user._id,
      rating: req.body.rating,
      review: req.body.review,
    });

    res.status(200).json({
      status: 'success',
      review,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
module.exports = Router;
