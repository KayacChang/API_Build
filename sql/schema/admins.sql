
-- Admins
CREATE TABLE IF NOT EXISTS admins (
    -- pk
    admin_id CHAR(32) PRIMARY KEY,

    -- properties
    email VARCHAR(256) NOT NULL UNIQUE,
    username VARCHAR(256),
    password VARCHAR(256) NOT NULL,

    -- times
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
