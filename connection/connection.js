// connect db
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to DB", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
module.exports = connectDB;
