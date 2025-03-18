// server/routes/auth.js
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const express = require('express');
const auth = require('../middleware/auth');
require('dotenv').config();
const CLIENT_URL = process.env.CLIENT_URL;

const successLoginUrl = `${CLIENT_URL}/sucess`;
const errorLoginUrl = `${CLIENT_URL}`;

//defaultProfile for every user
const defaultProfile = {
  name: '',
  bio: '',
  phone: '',
  education: [],
  professional: [],
  skills: [],
  careerInterests: [],
  mmCoins: 0,
  engagement: {
    daily: 0,
    weekly: 0,
    monthly: 0,
    streak: 0
  }
};

// Protected route
router.get('/me', auth, async (req, res) => {
  res.json({
    user: req.user,
    profile: req.user.profile
  });
});

// Local Signup
// TODO: Add JWT_SECRET
router.post('/signup', async (req, res) => {
  try {
    const { email, password, ...userData } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: 'User already exists' });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password,
      profile: {
        ...defaultProfile,
        ...userData,
        name: userData.name || '',
        email
      }
    });  

    // const newUser = new User({ email, password });
    await newUser.save();
    
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Local Login
// TODO: Add JWT_SECRET
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//logout route
router.post('/logout', (req, res) => {
  try {
    console.log("Logout request received");

    // There’s no session to destroy in JWT-based auth.
    res.clearCookie('token'); // Optional: only if using HTTP-only cookies
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Logout failed' });
  }
});


// Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// failureMessage: "Cannot login in using Google",
//     failureRedirect: errorLoginUrl,
//     successRedirect: successLoginUrl 
// TODO: Add JWT_SECRET
router.get('/google/callback',
  passport.authenticate('google', { 
    session: false,
    }),
  (req, res) => {
    try {
    const user = req.user.user;
    const isNewUser = req.user.NewUser;

    console.log("User :",user);
    res.header('Cross-Origin-Opener-Policy', 'same-origin');
    res.header('Cross-Origin-Embedder-Policy', 'require-corp');
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}&newUser=${isNewUser}`);
    
    } catch (error){
      console.error("Google Auth Callback Error:", error);
      res.redirect(`${process.env.CLIENT_URL}/auth-success?error=Authentication failed`);
    }
  }
);

module.exports = router;