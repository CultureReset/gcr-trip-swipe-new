const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const saasAuthRoutes = require('./routes/saas-auth');
const saasAppsRoutes = require('./routes/saas-apps');
const saasUserRoutes = require('./routes/saas-user');

app.use('/api/saas/auth', saasAuthRoutes);
app.use('/api/saas/apps', saasAppsRoutes);
app.use('/api/saas/user', saasUserRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SaaS API running on port ${PORT}`);
});
