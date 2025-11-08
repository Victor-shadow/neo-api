const express = require('express');
const User = require('../models/User');
const {verifyToken} = require('../middleware/auth');

const router = express.Router();

//Register a new User
router.post('/register', async(req,res) => {
  try {
    const {name, email, password, phoneNumber} = req.body;
    const user = await User.create({name, email, password, phoneNumber});
    res.status(201).json({message: 'User registered successfully', user});

  } catch(error) {
    console.error('Error registering user:', error);
    res.status(500).json({error: 'Internal server error' });
  }
});

// Get user Profile
router.get('/profile', verifyToken, async(req, res) => {
  try{
    const user = await User.findById(req.user.id);

    if(!user){
      return res.status(404).json({ error: 'User not found'});
    }
    res.json({user});
  } catch(error){
    console.error('Error fetching user profile: ', error);
    res.status(500).json({error:"Internal server error"});
  }
});


//Update User Profile
router.put('/profile', verifyToken, async (req, res) => {
  try{
    const {name, email, password, phoneNumber} = req.body;
    const user = await User.update(req.user.id, {name, email, password, phoneNumber});
    if(!user){
      return res.status(404).json({ error: 'User not found'});
    }
    res.json({message: 'Profile updated successfully', user});
  } catch(error){
    console.error('Error updating user profile:', error);
    res.status(500).json({error: 'Internal server error' });
  }
});

module.exports = router;
