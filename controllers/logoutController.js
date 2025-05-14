const { MENU_LINKS } = require("../constants/navigation");
const Cart = require("../models/Cart");
const logger = require("../utils/logger");

const getLogoutView = (req, res) => {
  const cartCount = Cart.getProductsQuantity();
  res.render("logout", {
    headTitle: "Shop - Logout",
    path: "/logout",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/logout",
    cartCount,
  });
};

const killApplication = (req, res) => {
  logger.getProcessLog();
  res.send("Server terminated");
  process.exit(0);
};

module.exports = { getLogoutView, killApplication };