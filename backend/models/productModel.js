/**
 * This file is a model/mongoose schema for products.
 * 
 */

import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        data: Buffer, // Binary image data
        contentType: String, // MIME type of the image
      },
    ],
  },
  {
    timestamps: true,
  }
)

export const Product = mongoose.model('Product', productSchema);