const connectDB = require("./db");
const expressLoader = require("./expressLoader");

module.exports = (app) => {
  console.log("Initializing server...");

  // Connecting to Database
  connectDB();

  // Load express app and middleware
  expressLoader(app);
};
