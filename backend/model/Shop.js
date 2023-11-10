const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your shop name!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your shop email address"],
    },
    description: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    //   avatar: {
    //     public_id: {
    //       type: String,
    //       required: true,
    //     },
    //     url: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    zipCode: {
      type: Number,
      required: true,
    },
    withdrawMethod: {
      type: Object,
    },
    availableBalance: {
      type: Number,
      default: 0,
    },

    transactions: [
      {
        amount: {
          type: Number,
        },
        status: {
          type: String,
          default: "Processing",
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        updatedAt: {
          type: Date,
        },
      },
    ],
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Shop", shopSchema);
