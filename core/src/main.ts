import { config } from "dotenv";
import PG from "./postgres";
import Redis from "./redis";
import { User, Order } from "./models";

async function main(env: NodeJS.Dict<string>) {
  //
  await Promise.all([
    //
    PG.init({
      user: env.PG_USER,
      host: env.PG_HOST,
      database: env.PG_NAME,
      password: env.PG_PASSWORD,
      port: Number(env.PG_PORT)
    }),
    //
    Redis.init({
      host: env.REDIS_HOST,
      port: Number(env.REDIS_PORT),
      sleep: Number(env.SLEEP)
    })
  ]);

  const models = {
    users: User,
    orders: Order
  };

  for (const [tablename, Model] of Object.entries(models)) {
    //
    Redis.observe(tablename, async res => {
      //
      const data = JSON.parse(res);

      console.log(`=== Get data from Redis.${tablename} ===`);
      console.table(data);

      console.log(`=== Check if data existed in Postgres.${tablename} ===`);

      const existed = await PG.table(tablename).exist({
        [Model.pk]: data[Model.pk]
      });

      if (existed) {
        //
        console.log(`=== Update Postgres.${tablename} ===`);

        await PG.table(tablename)
          //
          .update(Model(data), `${Model.pk} = '${data[Model.pk]}'`);

        return;
      }

      console.log(`=== Insert into Postgres.${tablename} ===`);

      await PG.table(tablename).insert(Model(data));
    });
  }
}

config();
main(process.env);
