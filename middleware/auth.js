const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = function( req, res, next ) {
   // Get token for header
   const token = req.header('x-auth-token');

   // Check if no token
   if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied!' });
   }

   // Verify token
   try {
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = decoded.user;
      next();

   } catch (err) {
      return res.status(401).json({ msg: 'Token invalid' });
   }
};