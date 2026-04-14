-- =========================
-- EXTENSIONS
-- =========================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================
-- TABLE: client
-- =========================
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,

    preferred_language TEXT DEFAULT 'en',
    account_status TEXT DEFAULT 'active',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    subscription_status TEXT DEFAULT 'free',
    role TEXT DEFAULT 'user',

    last_login_at TIMESTAMPTZ,

    consent_accepted BOOLEAN DEFAULT FALSE,
    consent_timestamp TIMESTAMPTZ,

    gdpr_deleted_at TIMESTAMPTZ,

    total_projects_created INTEGER DEFAULT 0,
    total_images_generated INTEGER DEFAULT 0
    );

-- =========================
-- UPDATED_AT TRIGGER FUNCTION
-- =========================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- TRIGGER
-- =========================
CREATE TRIGGER clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();