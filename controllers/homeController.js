const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { MENU_LINKS } = require("../constants/navigation");

const getHomeView = async (req, res) => {
  const products = await Product.getAll();
  const cartCount = await Cart.getProductsQuantity();
  res.render("home", {
    headTitle: "Shop - Home",
    path: "/",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/",
    products,
    cartCount,
  });
};

module.exports = { getHomeView };