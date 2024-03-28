const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connected successfully');
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = dbconnection;
