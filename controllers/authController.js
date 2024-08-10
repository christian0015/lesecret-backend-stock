const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.send({ user, token });
  } catch (error) {
    res.status(500).send({ error: 'Server Error' });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const user = new User({ username, email, password, role });
    await user.save();

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Error during registration' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};