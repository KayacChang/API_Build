
-- Games
CREATE TABLE IF NOT EXISTS games (
    -- pk
    game_id CHAR(32) PRIMARY KEY,

    -- properties
    name VARCHAR(256) NOT NULL UNIQUE,
    href VARCHAR NOT NULL UNIQUE,
    category VARCHAR(32) NOT NULL,

    -- times
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
