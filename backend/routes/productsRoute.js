/**
 * This file contains routes related to product creation,
 * editing, and deletion.
 */

import express from 'express';
import multer from 'multer';
import { Product } from '../models/productModel.js';

const router = express.Router();
const upload = multer();

// Route to create a new product with an image
router.post('/', upload.single('images'), async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.manufacturer ||
      !req.body.price ||
      !req.file
    ) {
      return res.status(400).send({
        message: 'Send all required fields: name, manufacturer, price, and images',
      });
    }
    
    const newProduct = {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      price: req.body.price,
      images: {
        data: req.file.buffer, // Use multer's buffer for image data
        contentType: req.file.mimetype, // Set MIME type from multer
      },
    };

    const product = await Product.create(newProduct);

    return res.status(201).send(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get all products from the database
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      count: products.length,
      data: products
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
});

// Route to get one product from the database by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    return res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
});

// Route to Update a product
router.put('/:id', async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.manufacturer ||
      !req.body.price ||
      !req.body.images
    ) {
      return res.status(400).send({
        message: 'Send all required fields: name, manufacturer, price',
      })
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).send({ message: 'Product updated successfully' });
  } catch {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Product not found' })
    }

    return res.status(200).send({ message: 'Product deleted successfully' })

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;