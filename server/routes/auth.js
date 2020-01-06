/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check } = require('express-validator/check');
const auth = require('../middleware/auth');

const User = require('../models/User');

console.log(User);
// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Veuillez entrer une adresse email').isEmail(),
    check('password', 'Un mot de passe est requis ').exists(),
  ],
  async (req, res) => {
    console.log(req.body);


    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Password' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
);

module.exports = router;
