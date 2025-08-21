import express from 'express';
import { ehcuserModel } from '../models/master/ehcuserModel.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Debug endpoint to test ehcuser lookup
router.post('/debug-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Debug login attempt for:', email);
    
    // Step 1: Check if ehcuser exists
    const ehcUser = await ehcuserModel.findByEmail(email);
    if (!ehcUser) {
      return res.json({
        success: false,
        message: 'No ehcuser found',
        email: email
      });
    }
    
    console.log('Found ehcuser:', {
      id: ehcUser.id,
      email: ehcUser.email,
      role: ehcUser.role,
      hasPassword: !!ehcUser.password
    });
    
    // Step 2: Check password
    if (!ehcUser.password) {
      return res.json({
        success: false,
        message: 'Password field missing from ehcuser model'
      });
    }
    
    const passwordMatch = await bcrypt.compare(password, ehcUser.password);
    
    return res.json({
      success: true,
      message: 'Debug complete',
      user: {
        id: ehcUser.id,
        email: ehcUser.email,
        role: ehcUser.role
      },
      passwordMatch: passwordMatch
    });
    
  } catch (error) {
    console.error('Debug login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Debug error: ' + error.message
    });
  }
});

export default router;
