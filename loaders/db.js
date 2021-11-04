const mongoose = require("mongoose");
const { mongoUri } = require("../config/config");

const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  const conn = await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
