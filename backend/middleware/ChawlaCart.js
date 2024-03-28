const usermodel = require('../models/usermodel');
const ChawlaCart = async function (req, res, next) {
  const user = await usermodel.findOne({ _id: req.user._id });
  // if (
  //   user.cartKing.length !== 0 ||
  //   user.cartPatel.length !== 0 ||
  //   user.cartPunjabiZyaka.length !== 0 ||
  //   user.cartTansen.length !== 0 ||
  //   user.cartDreamArena.length !== 0 ||
  //   user.cartSherePunjabi.length !== 0 ||
  //   user.cartRaj.length !== 0 ||
  //   user.cartVolga.length !== 0 ||
  //   user.cartMc.length !== 0
  // )
  //   return res
  //     .status(400)
  //     .json({ error: 'You need to empty the cart from another restaurant ' });
  // next();
  if (!user.selectedRestaurant || user.selectedRestaurant === 'ChawlaChicken')
    next();
  else
    res
      .status(400)
      .json({ error: 'You need to empty the cart from another restaurant' });
};
module.exports = ChawlaCart;