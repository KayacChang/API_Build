import { Pool, PoolConfig, native } from "pg";
import Table from "./table";

let pool: Pool;

async function init(config: PoolConfig) {
  //
  if (pool) return;

  pool = new native.Pool({
    ...config,
    connectionTimeoutMillis: 6 * 1000
  });

  await pool.query("SELECT NOW()");

  console.log(`Connect to Postgres ${config.host}:${config.port} success...`);
}

function table(tablename: string) {
  //
  return Table(pool, tablename);
}

export default {
  init,
  table
};
