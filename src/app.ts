import { Application, Router } from "https://deno.land/x/oak@v16.1.0/mod.ts";
import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";
import { config } from "./config.ts";

interface CountResult {
  count: string;
}

interface TableExistsResult {
  exists: boolean;
}

const app = new Application();
const router = new Router();

const connectDB = async () => {
  const client = new Client({
    hostname: config.db.host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    tls: {
      enabled: false
    }
  });

  await client.connect();

  const tableExists = await client.queryArray<TableExistsResult[]>(`SELECT EXISTS (
    SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'entries'
  );`);

  if (!tableExists.rows[0][0]) {
    await client.queryArray(`CREATE TABLE entries (
      id SERIAL PRIMARY KEY,
      data TEXT NOT NULL
    );`);
  }

  return client;
};

router.get("/", async (context) => {
  const client = await connectDB();
  const data = crypto.randomUUID();

  await client.queryArray(`INSERT INTO entries(data) VALUES ($1)`, [data]);

  const result = await client.queryObject<CountResult>(`SELECT COUNT(*) FROM entries;`);
  const count = Number(result.rows[0].count);

  console.info('Entry succesfully added: ', data);

  context.response.status = 201;
  context.response.body = {
    message: `This is a simple, basic Deno / Oak application running on Zerops.io,
      each request adds an entry to the PostgreSQL database and returns a count.
      See the source repository (https://github.com/zeropsio/recipe-deno) for more information.`,
    newEntry: data,
    count: count,
  };

  await client.end();
});

router.get("/status", (context) => {
  context.response.status = 200;
  context.response.body = { status: "UP" };
});

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
