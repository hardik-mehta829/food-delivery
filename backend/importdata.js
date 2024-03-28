const fs = require('fs');
const dbconnection = require('./db');
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/MenuData/Restaurants.json`, 'utf-8')
);
const McDonald = require('./models/McDonaldModel');
const Tansen = require('./models/TansenModel');
const Patel = require('./models/PatelModel');
const PunjabiZyaka = require('./models/PunjabiZyaka');
const burgerKingModel = require('./models/burgerKingModel');
const ChawlaChicken = require('./models/ChawlaChickenModel');
const DreamArena = require('./models/DreamArenaModel');
const Raj = require('./models/RajModel');
const SherePunjabi = require('./models/SherePunjabiModel');
const Volga = require('./models/VolgaModel');
const RestaurantModel = require('./models/RestaurantModel');
// const deleteData = async () => {
//   try {
//     console.log('data deleted successfully');
//   } catch (error) {
//     console.log(error.message);
//   }
// };
dbconnection();
const importData = async () => {
  try {
    await RestaurantModel.deleteMany();
    await RestaurantModel.create(data);
    console.log('data loaded successfully');
    process.exit();
  } catch (error) {
    console.log(error.message);
  }
};

importData();
