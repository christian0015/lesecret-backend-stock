const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Assure-toi que le chemin est correct
const Sale = require('../models/Sale'); // Assure-toi que le chemin est correct

// Route pour enregistrer une vente
router.post('/', async (req, res) => {
  const { productId, quantity, serverId, table } = req.body;
  
  try {
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    product.quantity -= quantity;
    await product.save();

    const totalPrice = product.price * quantity;

    const sale = new Sale({
      product: productId,
      quantity,
      totalPrice,
      server: serverId,
      table,
    });

    await sale.save();

    res.status(201).json({ message: 'Sale recorded successfully', sale });
  } catch (error) {
    res.status(500).json({ message: 'Error recording sale', error });
  }
});

// Route pour obtenir toutes les ventes
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().populate('product').populate('server');
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales', error });
  }
});

module.exports = router;
