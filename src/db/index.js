
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";


if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(process.env.DATABASE_URL), { schema });
} else {
  if (!global.db) {
    global.db = drizzle(postgres(process.env.DATABASE_URL), { schema });
  }
  
  db = global.db;
}

export { db };
