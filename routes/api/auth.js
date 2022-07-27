const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('config');


// @route   api/auth
// @desc    Get User
// @access  public
router.get('/', auth, async ( req, res ) => {
   try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }
});

// @route     POST api/auth
// @desc      Authenticate user and get token
// @access    public
router.post('/', [
   check('email', 'Please enter a valid email').isEmail(),
   check('password', 'Password is required').exists()
], async ( req, res ) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   // See if user exists
   const { email, password } = req.body;

   try {
      let user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isPassMatch = await bcrypt.compare(password, user.password);

      if (!isPassMatch) {
         res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
         user: {
            id: user.id
         }
      };

      jwt.sign(
         payload,
         JWT_SECRET,
         { expiresIn: 36000 },
         ( err, token ) => {
            if (err) throw err;
            res.json({ token });
         });

   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
   }

});


module.exports = router;