const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ 
      _id: decoded.userId,
    }).select('-password');

    if (!user) throw new Error();
    console.log("User Authernticated",user);
    req.user = user;
    next();
  } catch (error) {
    console.log("Unable to authenticate",error);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = auth;