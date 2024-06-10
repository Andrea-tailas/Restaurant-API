import "dotenv/config";
import {defineConfig} from "drizzle-kit";

export default defineConfig({
  schema:"./src/Drizzle/schema.ts",
  out:"./src/Drizzle/migrations",
  dialect:"postgresql",
  dbCredentials:{
    url:process.env.DATABASE_URL as string,
  },
  verbose:true,
  strict:true,
});