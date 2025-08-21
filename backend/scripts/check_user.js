#!/usr/bin/env node
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { ehcuserModel } from '../src/models/master/ehcuserModel.js';

const email = process.argv[2] || process.env.CHECK_EMAIL || 'admin@example.com';
const password = process.argv[3] || process.env.CHECK_PASSWORD || 'P@ssw0rd';

(async () => {
  try {
    console.log('Checking credentials for:', email);
    const user = await ehcuserModel.findByEmail(email);
    if (!user) {
      console.log('❌ No ehcuser found with email:', email);
      process.exit(0);
    }
    console.log('✅ Found ehcuser:', { 
      id: user.id, 
      email: user.email, 
      username: user.username, 
      role: user.role,
      isActive: user.isActive 
    });
    
    // The model might exclude password for security, so we need to get it directly
    const userWithPassword = await ehcuserModel.findByEmail(email);
    if (!userWithPassword || !userWithPassword.password) {
      console.log('❌ Could not retrieve password field from model');
      process.exit(1);
    }
    
    const passwordMatch = await bcrypt.compare(password, userWithPassword.password);
    console.log('Password match:', passwordMatch ? '✅ TRUE' : '❌ FALSE');
    
    if (!passwordMatch) {
      console.log('Hash in DB:', userWithPassword.password.substring(0, 20) + '...');
      console.log('Testing password:', password);
    }
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();
