const { getDatabase } = require("../database");

const COLLECTION_NAME = "products";

class Product {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  static async add(product) {
    const db = getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    const existingProduct = await collection.findOne({ name: product.name });
    if (existingProduct) {
      throw new Error(`Product with name "${product.name}" already exists`);
    }
    const result = await collection.insertOne(product);
    console.log("Product added:", result);
    return result.insertedId;
  }

  static async getAll() {
    const db = getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    return await collection.find().toArray();
  }

  static async findByName(name) {
    const db = getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    return await collection.findOne({ name });
  }

  static async deleteByName(name) {
    const db = getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    const result = await collection.deleteOne({ name });
    console.log("Product deleted:", result);
    return result.deletedCount;
  }

  static async getLast() {
    const db = getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    const products = await collection.find().sort({ _id: -1 }).limit(1).toArray();
    return products[0] || null;
  }
}

module.exports = Product;