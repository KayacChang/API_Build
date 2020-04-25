import { createClient, RedisClient, ClientOpts } from "redis";
import { promisify } from "util";

type HandleFunc = {
  (res: string): Promise<void>;
};

type Config = ClientOpts & {
  sleep: number;
};

let client: RedisClient;
let _config: Config;

async function init(config: Config) {
  //
  _config = config;

  if (client) return { observe };

  client = createClient(_config);

  await new Promise(resolve => {
    client.once("ready", resolve);
  });

  console.log(`Connect to Redis ${config.host}:${config.port} success...`);

  return { observe };
}

function observe(name: string, handleFunc: HandleFunc) {
  //
  const lpush = promisify(client.lpush).bind(client);
  const lrem = promisify(client.lrem).bind(client);
  const blpop = promisify(client.blpop).bind(client);

  const wait = promisify(setTimeout);

  const { sleep } = _config;

  async function run(): Promise<void> {
    //
    const pending = `pending:${name}`;

    const res = await blpop(pending, 1);

    if (!res) {
      const ms = sleep;

      console.log(`Current ${pending} is empty, sleep ${ms} milliseconds ...`);

      await wait(ms);

      return run();
    }

    try {
      const processing = `processing:${name}`;

      const [, data] = res;

      await lpush(processing, data);

      await handleFunc(data);

      await lrem(processing, 1, data);
      //
    } catch (err) {
      console.error(err);
    }

    return run();
  }

  run();
}

export default {
  init,
  observe
};
