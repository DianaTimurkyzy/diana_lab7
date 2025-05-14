const { MongoClient } = require("mongodb");
const { DB_USER, DB_PASS } = require("./config");

let database;

const mongoConnect = (callback) => {
    const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@dianacluster.kfvzuiw.mongodb.net/?retryWrites=true&w=majority&appName=DianaCluster`;

    const client = new MongoClient(uri);

    client
        .connect()
        .then(() => {
            console.log("Connection to the database has been established.");
            database = client.db("shop");
            callback();
        })
        .catch((error) => {
            console.error("Connection error:", error);
            process.exit(1);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error("No database found.");
    }
    return database;
};

module.exports = { mongoConnect, getDatabase };