#!/usr/bin/env node
import 'dotenv/config';
// Use the model helper which hashes the password for us
import { ehcuserModel } from '../src/models/master/ehcuserModel.js';

const email = process.env.SUPERADMIN_EMAIL || 'admin@example.com';
const password = process.env.SUPERADMIN_PASSWORD || 'P@ssw0rd';
const username = process.env.SUPERADMIN_USERNAME || 'admin';

(async () => {
  try {
    const existing = await ehcuserModel.findByEmail(email);
    if (existing) {
      console.log('Superadmin already exists:', email);
      process.exit(0);
    }

    await ehcuserModel.createSuperadmin({ username, email, password, meta: {} });
    console.log('Superadmin created:', email);
    process.exit(0);
  } catch (err) {
    console.error('Failed to create superadmin:', err);
    process.exit(1);
  }
})();
