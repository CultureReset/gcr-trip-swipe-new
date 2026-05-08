const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { supabase, supabaseAdmin } = require('../db/saas-supabase');

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase
      .from('saas_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, data.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: data.id, email: data.email, businessName: data.business_name }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { businessName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('saas_users')
      .insert([{
        email,
        business_name: businessName,
        password_hash: passwordHash,
        created_at: new Date()
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: data.id, email: data.email, businessName: data.business_name }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
