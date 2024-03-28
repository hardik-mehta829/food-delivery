const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const usermodel = require('../models/usermodel');
const orderModel = require('../models/order.js');
const McDonald = require('../models/McDonaldModel');
const McReview = require('../models/McDonaldReview.js');
const burgerkingReview = require('../models/burgerkingReview.js');
const PatelReview = require('../models/PatelReview.js');
const PunjabiZyakaReview = require('../models/PunjabiZyakaReview.js');
const TansenReview = require('../models/TansenReview.js');
const McCart = require('../middleware/McCart.js');
const KingCart = require('../middleware/Kingcart.js');
const {
  body,
  ExpressValidator,
  validationResult,
} = require('express-validator');
const Router = express.Router();
const SECRET_KEY = 'hardik';
const fetchuser = require('../middleware/fetchUser');
// const fetchuser = async (req, res, next) => {
//   try {
//     const token = req.headers.token;
//     if (!token) throw new Error('Log in or signup first');
//     const decoded = jwt.verify(token, SECRET_KEY);
//     const user = await usermodel.findOne({ _id: decoded.id });
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
Router.get('/', async (req, res) => {
  try {
    const allusers = await usermodel.find();
    res.status(200).json(allusers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
Router.post('/createuser', async (req, res) => {
  try {
    if (req.body.password !== req.body.passwordconfirm)
      throw {
        statusCode: 400,
        message: 'Passwords should be same',
        status: 'fail',
      };
    const user = await usermodel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordconfirm: req.body.passwordconfirm,
    });
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '35m' });
    req.headers.token = token;
    res.status(200).json({ token, id: user._id });
  } catch (error) {
    res.json({ error: error.message });
  }
});
Router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email }).select('+password');
    if (!user)
      throw {
        statusCode: 404,
        message: 'Signup first',
        status: 'fail',
      };
    if (!(await bcrypt.compare(password, user.password)))
      throw {
        statusCode: 400,
        message: 'Invalid password',
        status: 'fail',
      };
    const id = user._id;
    const token = jwt.sign({ id: id }, SECRET_KEY, { expiresIn: '30m' });
    res.status(200).json({ token, name: user.name, id });
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
});
Router.get('/finduser/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = usermodel.findOne({ _id: id });

    const user = await query;

    await user.save({ validateBeforeSave: false });
    res.status(200).json({ user: user, status: 'success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
Router.post('/updateuser', fetchuser, async (req, res) => {
  try {
    let err;
    if (req.body.password) {
      throw {
        statusCode: 400,
        message: 'You cannot update password from this route',
      };
    }
    const user = await usermodel.findOneAndUpdate(
      { _id: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ user: user, status: 'success' });
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
});
Router.delete('/deleteuser', fetchuser, async (req, res) => {
  try {
    await usermodel.deleteOne({ _id: req.user._id });
    res.status(200).json({ message: 'Successfully deleted' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
Router.post('/forgotpassword', async function (req, res) {
  try {
    const user = await usermodel.findOne({ email: req.body.email });
    if (!user) res.status(400).json({ message: 'Error sending the email' });
    const resetToken = user.generateToken();
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
      to: user.email,
      subject: 'Password reset token sent',
      text: `127.0.0.1:3000/api/v1/users/resetpassword/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(400).json({ message: 'Error sending the email' });
      } else {
        res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
});
Router.post('/resetpassword/:resetToken', async function (req, res) {
  try {
    const token = req.params.resetToken;
    const { password, passwordconfirm } = req.body;
    if (!token) throw { statusCode: 400, message: 'No token available' };
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await usermodel.findOne({
      passwordResetToken: hashedToken,
      TokenExpires: { $gt: Date.now() },
    });
    if (!user) throw { statusCode: 400, message: 'user does not exist' };
    user.password = password;
    user.passwordconfirm = passwordconfirm;
    user.passwordResetToken = undefined;
    user.TokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Router.get('/reviews/mcDonald', fetchuser, async function (req, res) {
  try {
    const reviews = await McReview.find({ user: req.user._id }).populate({
      path: 'item',
      select: 'name class',
    });
    res.status(200).json({
      status: 'success',
      reviews,
    });
  } catch (error) {
    res.status(200).json({
      error: error.message,
    });
  }
});
Router.get('/reviews/burgerKing', fetchuser, async function (req, res) {
  try {
    const reviews = await burgerkingReview
      .find({ user: req.user._id })
      .populate({
        path: 'item',
        select: 'name class',
      });
    res.status(200).json({
      status: 'success',
      reviews,
    });
  } catch (error) {
    res.status(200).json({
      error: error.message,
    });
  }
});
Router.get('/reviews/Patel', fetchuser, async function (req, res) {
  try {
    const reviews = await PatelReview.find({ user: req.user._id }).populate({
      path: 'item',
      select: 'name class',
    });
    res.status(200).json({
      status: 'success',
      reviews,
    });
  } catch (error) {
    res.status(200).json({
      error: error.message,
    });
  }
});
Router.get('/reviews/Tansen', fetchuser, async function (req, res) {
  try {
    const reviews = await TansenReview.find({ user: req.user._id }).populate({
      path: 'item',
      select: 'name class',
    });
    res.status(200).json({
      status: 'success',
      reviews,
    });
  } catch (error) {
    res.status(200).json({
      error: error.message,
    });
  }
});
Router.get('/allorders', fetchuser, async function (req, res) {
  try {
    const orders = await orderModel.find({ user: req.user._id });
    // .populate({ path: 'cartMc', select: '-__v -image' });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
Router.get('/reviews/PunjabiZyaka', fetchuser, async function (req, res) {
  try {
    const reviews = await PunjabiZyakaReview.find({
      user: req.user._id,
    }).populate({
      path: 'item',
      select: 'name class',
    });
    res.status(200).json({
      status: 'success',
      reviews,
    });
  } catch (error) {
    res.status(200).json({
      error: error.message,
    });
  }
});
module.exports = Router;
