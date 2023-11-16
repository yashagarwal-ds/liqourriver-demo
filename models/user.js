const mongoose = require("mongoose");
const {getDate} = require("../constants/date");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
    },

    zipcode: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },

    cpassword: {
      type: String,
      required: true,
    },

    created_at: {
      type: String,
      default: getDate(new Date())
    },

    updated_at: {
      type: String,
      default: getDate(new Date())
    },

    Date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("user", userSchema);
