const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    body: {
      type: String,
      trim: true,
      required: true,
    },
    userId: {
      type: objectId,
      trim: true,
      ref: "user",
      reuired: true,
    },
    tags: [{ type: String, trim: true }],
    category: { type: String, trim: true, required: true },
    subcategory: [{ type: String, trim: true }],
    isDeleted: { type: Boolean, default: false },
    deletedAt: {
      type: String,
    },
    publishedAt: {
      type: String,
    },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);