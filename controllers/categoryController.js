const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.status(201).send(category);
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
};
