const { getDatabase } = require("../database");

const COLLECTION_NAME = "carts";

class Cart {
  static async add(productName) {
    const db = getDatabase();
    const productCollection = db.collection("products");
    const cartCollection = db.collection(COLLECTION_NAME);

    const product = await productCollection.findOne({ name: productName });
    if (!product) {
      throw new Error(`Product with name "${productName}" not found`);
    }

    const cartItem = await cartCollection.findOne({ productName });
    if (cartItem) {
      await cartCollection.updateOne(
          { productName },
          { $inc: { quantity: 1 } }
      );
    } else {
      await cartCollection.insertOne({ productName, quantity: 1 });
    }

    return await Cart.getProductsQuantity();
  }

  static async getItems() {
    const db = getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    return await collection.find().toArray();
  }

  static async getTotalPrice() {
    const db = getDatabase();
    const cartCollection = db.collection(COLLECTION_NAME);
    const productCollection = db.collection("products");

    const cartItems = await cartCollection.find().toArray();
    let total = 0;
    for (const item of cartItems) {
      const product = await productCollection.findOne({ name: item.productName });
      total += (product?.price || 0) * item.quantity;
    }
    return total;
  }

  static async getProductsQuantity() {
    const db = getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    const items = await collection.find().toArray();
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  static async clearCart() {
    const db = getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    await collection.deleteMany({});
  }
}

module.exports = Cart;