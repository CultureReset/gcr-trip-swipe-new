-- SaaS Users Table
CREATE TABLE saas_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  business_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- SaaS Apps Catalog
CREATE TABLE saas_apps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  price_monthly DECIMAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- User Installed Apps
CREATE TABLE saas_user_apps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES saas_users(id) ON DELETE CASCADE,
  app_id TEXT REFERENCES saas_apps(id),
  is_active BOOLEAN DEFAULT true,
  config JSONB,
  installed_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, app_id)
);

-- Indexes
CREATE INDEX idx_saas_users_email ON saas_users(email);
CREATE INDEX idx_saas_apps_active ON saas_apps(is_active);
CREATE INDEX idx_saas_user_apps_user ON saas_user_apps(user_id);
CREATE INDEX idx_saas_user_apps_active ON saas_user_apps(user_id, is_active);
