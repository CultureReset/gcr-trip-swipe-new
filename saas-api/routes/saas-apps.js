const express = require('express');
const router = express.Router();
const { supabase } = require('../db/saas-supabase');
const { verifyToken } = require('../middleware/saas-auth');

// Get available apps
router.get('/available', verifyToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('saas_apps')
      .select('*')
      .eq('is_active', true);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
