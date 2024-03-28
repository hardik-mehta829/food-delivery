const express = require('express');
const cors = require('cors');
const dbconnection = require('./db');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const RestaurantRoutes = require('./routes/RestaurantRoutes');
const burgerKingRoutes = require('./routes/burgerKingRoutes');
const McDonaldRoutes = require('./routes/McDonaldRoutes');
const PatelRoutes = require('./routes/PatelRoutes');
const TansenRoutes = require('./routes/TansenRoutes');
const PunjabiZyakaRoutes = require('./routes/PunjabiZyakaRoutes');
const ChawlaChickenRoutes = require('./routes/ChawlaChickenRoutes');
const DreamArenaRoutes = require('./routes/DreamArenaRoutes');
const RajRoutes = require('./routes/RajRoutes');
const SherePunjabiRoutes = require('./routes/SherePunjabiRoutes');
const VolgaRoutes = require('./routes/VolgaRoutes');
const orderRoutes = require('./routes/orderRoutes');
// const cartRoutes = require('./routes/CartRoutes');
// const importData = require('./importdata');
const Router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.send('hello hardik');
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/Restaurants', RestaurantRoutes);
app.use('/api/v1/Burgerking', burgerKingRoutes);
app.use('/api/v1/McDonald', McDonaldRoutes);
app.use('/api/v1/Patel', PatelRoutes);
app.use('/api/v1/Tansen', TansenRoutes);
app.use('/api/v1/PunjabiZyaka', PunjabiZyakaRoutes);
app.use('/api/v1/DreamArena', DreamArenaRoutes);
app.use('/api/v1/ChawlaChicken', ChawlaChickenRoutes);
app.use('/api/v1/Raj', RajRoutes);
app.use('/api/v1/SherePunjabi', SherePunjabiRoutes);
app.use('/api/v1/Volga', VolgaRoutes);
app.use('/api/v1/orders', orderRoutes);
dbconnection();
console.log(`${__dirname}`);
// app.use(function(err,req,res,next){
//   err.statusCode=err.statusCode||500;
//   err.status=err.status||"error";
//   res.status(err.statusCode).json({
//     status:err.status,
//     message:err.message
//   })
// })
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
