
-- Orders
CREATE TABLE IF NOT EXISTS orders (
    -- pk
    order_id CHAR(36) PRIMARY KEY,

    -- properties
    state CHAR(1) NOT NULL DEFAULT 'P',
    bet NUMERIC NOT NULL DEFAULT 0,
    win NUMERIC NOT NULL DEFAULT 0,
    
    -- fk
    game_id CHAR(32) NOT NULL REFERENCES games,
    user_id CHAR(32) NOT NULL REFERENCES users,

    -- times
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- Sub Orders
CREATE TABLE IF NOT EXISTS sub_orders (
    -- pk
    sub_order_id CHAR(36) PRIMARY KEY,

    -- properties
    state CHAR(1) NOT NULL DEFAULT 'P',
    bet NUMERIC NOT NULL DEFAULT 0,
    
    -- fk
    order_id CHAR(36) NOT NULL REFERENCES orders,

    -- times
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
