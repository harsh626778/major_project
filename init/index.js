const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("68c8cedd7dda9617c33c303e"), // ✅ must be ObjectId
  }));

  await Listing.insertMany(initData.data);
  console.log("🌱 Data was initialized successfully!");
};

main()
  .then(() => {
    console.log("✅ Connected to DB");
    initDB();
  })
  .catch((err) => {
    console.log("❌ Error:", err);
  });
