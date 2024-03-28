const express = require('express');
const ChawlaChicken = require('../models/ChawlaChickenModel');
const usermodel = require('../models/usermodel');
const orderModel = require('../models/order');
const fetchuser = require('../middleware/fetchUser');
const CartChecker = require('../middleware/ChawlaCart');
const { default: mongoose } = require('mongoose');
const app = express();
const Router = express.Router();
const nodemailer = require('nodemailer');
Router.get('/', async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const exculdedFields = ['sort', 'page', 'limit', 'fields'];
    exculdedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    console.log(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    // console.log(JSON.parse(queryStr));
    let query = ChawlaChicken.find(JSON.parse(queryStr));
    if (req.query.sort) query = query.sort(req.query.sort);
    const page = req.query.page || 1;
    const skip = (page - 1) * 5;
    const numitems = await ChawlaChicken.countDocuments();
    if (skip >= numitems)
      return res.status(400).json({ error: 'This page does not exist' });
    // query = query.skip(skip).limit(5);
    const data = await query.select('-__v ');

    res.status(200).json({ results: data.length, data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
Router.get('/item/:id', fetchuser, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ChawlaChicken.findOne({ _id: id }).populate({
      path: 'reviews',
      select: 'user review rating -item',
      options: { strictPopulate: false },
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
Router.post('/', async (req, res) => {
  try {
    const data = await ChawlaChicken.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
Router.post('updateitem/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ChawlaChicken.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
Router.delete('deleteitem/:id', async (req, res) => {
  const id = req.params.id;
  const data = await ChawlaChicken.deleteOne({ _id: id });
  res.status(200).json(data);
});
Router.get('/viewcart', fetchuser, CartChecker, async function (req, res) {
  try {
    const user = await usermodel.findOne({ _id: req.user._id });
    // .populate({ path: 'cartPunjabiZyaka.item', select: '-__v -image' });
    if (user.cartChawla.length === 0)
      throw { statusCode: 400, message: 'This cart is empty' };

    res.status(200).json({
      results: user.cartChawla.length,
      cart: user.cartChawla,
      totalcost: user.totalcost,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
Router.get('/clearcart', fetchuser, CartChecker, async function (req, res) {
  try {
    const user = await usermodel.findOne({ _id: req.user._id });
    // .populate({ path: 'cartPunjabiZyaka', select: '-__v' });
    if (user.cartChawla.length === 0)
      throw { statusCode: 400, message: 'This cart is already empty' };
    user.cartChawla = [];
    user.selectedRestaurant = '';
    user.totalcost = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({ message: 'The cart is cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
Router.get('/additem/:id', fetchuser, CartChecker, async function (req, res) {
  try {
    const user = await usermodel.findOne({ _id: req.user._id });
    const cartItems = [...user.cartChawla];
    if (cartItems.length === 0) {
      user.selectedRestaurant = 'ChawlaChicken';
    }
    const x = cartItems.find((value) => {
      return value.itemid.toString() === req.params.id;
    });
    if (x) {
      // const y = cartItems.map(
      //   (value) => value.itemid.toString() !== req.params.id
      // );
      const y = cartItems.map((value) => {
        if (value.itemid.toString() === req.params.id) {
          return { ...value, quantity: value.quantity + 1 };
        }
        return value;
      });
      user.cartChawla = [...y];
      // x.quantity = x.quantity + 1;
      // user.cartPunjabiZyaka = [...y, x];
    } else {
      const data = await ChawlaChicken.findOne({ _id: req.params.id });

      user.cartChawla = [
        ...user.cartChawla,
        {
          itemid: req.params.id,
          name: data.name,
          price: data.price,
          quantity: 1,
        },
      ];
    }

    // console.log(user.cartMc);
    user.totalcost = user.cartChawla.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      message: 'Item added to cart successfully',
      cart: user.cartChawla,
      totalcost: user.totalcost,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
Router.delete(
  '/deleteitemfromCart/:id',
  fetchuser,
  CartChecker,
  async function (req, res) {
    try {
      const user = await usermodel.findOne({ _id: req.user._id });
      const cartItems = [...user.cartChawla];
      const x = cartItems.find((value) => {
        return value.itemid.toString() === req.params.id;
      });

      const y = cartItems
        .map((value) => {
          if (value.itemid.toString() === req.params.id) {
            return { ...value, quantity: value.quantity - 1 };
          }
          return value;
        })
        .filter((value) => value.quantity > 0);
      user.cartChawla = [...y];
      // const y = cartItems.filter(
      //   (value) => value.itemid.toString() !== req.params.id
      // );
      // x.quantity = x.quantity - 1;
      // if (x.quantity === 0) user.cartPunjabiZyaka = [...y];
      // else user.cartPunjabiZyaka = [...y, x];
      if (y.length === 0) {
        user.selectedRestaurant = '';
      }
      // } else throw new Error('Item is not present in the cart', 400);
      user.totalcost = user.cartChawla.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      await user.save({ validateBeforeSave: false });
      // console.log(user.cartMc);
      res.status(200).json({
        message: 'Item deleted successfully',
        cart: user.cartChawla,
        totalcost: user.totalcost,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
Router.post('/placeorder', fetchuser, CartChecker, async function (req, res) {
  try {
    const user = await usermodel.findOne({ _id: req.user._id });

    if (user.cartChawla.length === 0)
      throw { statusCode: 400, message: 'Add items to your cart' };
    const order = await orderModel.create({
      user: req.user._id,
      cart: user.cartChawla,
      totalcost: user.totalcost,
      restaurant: user.selectedRestaurant,
      location: req.body.location,
      date: req.body.date,
    });
    const length = user.cartChawla.length;
    user.cartChawla = [];
    user.selectedRestaurant = undefined;
    user.totalcost = undefined;
    await user.save({ validateBeforeSave: false });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hardikm554@gmail.com',
        pass: 'sqwr nwzd gtnq hzpm',
      },
    });
    const mailOptions = {
      from: 'hardikm554@gmail.com',
      to: req.user.email,
      subject: 'FoodZone:Thank you for choosing us',
      text: 'Your order is being prepared . Our delivery partner will be arriving soon.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        // res.status(400).json({ message: 'Error sending the email' });
      } else {
        // res.status(200).json({ message: 'Email sent successfully' });
      }
    });
    res.status(200).json({
      cartLength: length,
      order,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = Router;