import { QueryConfig, Pool } from "pg";

export default function Table(pool: Pool, name: string) {
  //
  async function exec(query: QueryConfig) {
    //
    const client = await pool.connect();

    const res = await client.query(query);

    client.release();

    return res;
  }

  async function insert<T>(data: T) {
    //
    const keys = Object.keys(data).join(",");
    const values = Object.values(data);

    const placeholders = values
      //
      .map((_, index) => "$" + (index + 1))
      .join(",");

    return await exec({
      text: `INSERT INTO ${name}(${keys}) VALUES(${placeholders})`,
      values: values
    });
  }

  async function update<T>(data: T, condition: string) {
    //
    const updateStr =
      //
      Object.keys(data)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(",");

    return await exec({
      text: `
        UPDATE ${name} 
        SET ${updateStr}
        WHERE ${condition}`,
      values: Object.values(data)
    });
  }

  async function exist<T>(data: T) {
    //
    const condition =
      //
      Object.keys(data)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(" AND ");

    const res = await exec({
      text: `SELECT exists(SELECT 1 FROM ${name} WHERE ${condition})`,
      values: Object.values(data)
    });

    return res.rows[0].exists;
  }

  return { insert, update, exist };
}
