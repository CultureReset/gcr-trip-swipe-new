const express = require('express');
const router = express.Router();
const { supabase } = require('../db/saas-supabase');
const { verifyToken } = require('../middleware/saas-auth');

// Get installed apps
router.get('/installed-apps', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('saas_user_apps')
      .select('saas_apps(*)')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data.map(item => item.saas_apps));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Install app
router.post('/apps/install', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { appId } = req.body;

    const { data, error } = await supabase
      .from('saas_user_apps')
      .insert([{
        user_id: userId,
        app_id: appId,
        is_active: true,
        installed_at: new Date()
      }])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Uninstall app
router.delete('/apps/:appId', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const appId = req.params.appId;

    const { error } = await supabase
      .from('saas_user_apps')
      .delete()
      .eq('user_id', userId)
      .eq('app_id', appId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
