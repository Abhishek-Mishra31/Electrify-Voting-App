require("dotenv").config();
const mongoose = require("mongoose");
const liveServerUrl = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASSWORD}@scrapping.66hnucn.mongodb.net/?retryWrites=true&w=majority&appName=Scrapping`;
const dbServerUrl = process.env.LOCAL_DB_SERVER_URL;
const db = mongoose.connection;


mongoose.connect(liveServerUrl);

db.on("connected", () => {
  console.log("connected to database");
});

db.on("disconnected", () => {
  console.log("disconnected with database");
});

db.on("error", () => {
  console.log("error with database");
});

module.exports = db;
