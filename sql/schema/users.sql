
-- Users
CREATE TABLE IF NOT EXISTS users (
    -- pk
    user_id CHAR(32) PRIMARY KEY,

    -- properties
    username VARCHAR(256) NOT NULL UNIQUE,
    balance NUMERIC NOT NULL,

    -- times
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
