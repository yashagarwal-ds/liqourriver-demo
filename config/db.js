const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`).then(() => console.log("Connection Succesfull")).catch((error) => {
        console.log(error);
    })
};

module.exports = connectDB;