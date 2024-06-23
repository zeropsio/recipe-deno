import { config as dotenvConfig } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

dotenvConfig({ export: true });

export const config = {
  db: {
    host: Deno.env.get("DB_HOST")!,
    port: parseInt(Deno.env.get("DB_PORT") || "5432"),
    username: Deno.env.get("DB_USER")!,
    password: Deno.env.get("DB_PASS")!,
    database: Deno.env.get("DB_NAME")!,
  }
};
