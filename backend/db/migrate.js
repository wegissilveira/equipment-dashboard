const fs = require("fs");
const path = require("path");
const { createPool } = require("./client");

const MIGRATIONS_DIR = path.join(__dirname, "migrations");

async function migrate() {
   const pool = createPool();
   const client = await pool.connect();

   try {
      await client.query(`
         CREATE TABLE IF NOT EXISTS schema_migrations (
            id TEXT PRIMARY KEY,
            applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
         )
      `);

      const files = fs
         .readdirSync(MIGRATIONS_DIR)
         .filter((file) => file.endsWith(".sql"))
         .sort();

      const applied = await client.query("SELECT id FROM schema_migrations");
      const appliedIds = new Set(applied.rows.map((row) => row.id));

      for (const file of files) {
         if (appliedIds.has(file)) {
            console.log(`skip  ${file}`);
            continue;
         }

         const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");

         await client.query("BEGIN");
         try {
            await client.query(sql);
            await client.query("INSERT INTO schema_migrations (id) VALUES ($1)", [
               file,
            ]);
            await client.query("COMMIT");
            console.log(`apply ${file}`);
         } catch (error) {
            await client.query("ROLLBACK");
            throw error;
         }
      }
   } finally {
      client.release();
      await pool.end();
   }
}

migrate().catch((error) => {
   console.error(error);
   process.exit(1);
});
