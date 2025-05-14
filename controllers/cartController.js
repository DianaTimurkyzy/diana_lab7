const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { STATUS_CODE } = require("../constants/statusCode");

const addProductToCart = async (req, res) => {
  const { name, description, price } = req.body;
  const product = new Product(name, description, parseFloat(price));
  try {
    await Product.add(product);
    await Cart.add(name);
    res.status(STATUS_CODE.FOUND).redirect("/products/new");
  } catch (error) {
    res.status(STATUS_CODE.NOT_FOUND).render("404", {
      headTitle: "404 - Product Not Found",
      menuLinks: require("../constants/navigation").MENU_LINKS,
      activeLinkPath: "",
      cartCount: 0,
    });
  }
};

const getProductsCount = async (req, res) => {
  const quantity = await Cart.getProductsQuantity();
  res.json({ quantity });
};

module.exports = { addProductToCart, getProductsCount };