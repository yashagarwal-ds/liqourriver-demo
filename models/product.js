const mongoose = require("mongoose");
const {getDate} = require("../constants/date");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    productType: {
      type: String,
      required: true,
    },

    price: {
        type : String,
        required : true
    },

    rating: {
        type : Number,
        required : true
    },

    image : {
        type : String,
        required : true
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

module.exports = new mongoose.model("product", productSchema);
