const mongoose = require('mongoose');
const { MONGO_URI } = require('../../config');

let _db;

const connectDB = async () => {
   try {
      await mongoose.connect(MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log("MongoDB Connected...");
   } catch (err) {
      console.error(err);
   }
};

module.exports = connectDB;