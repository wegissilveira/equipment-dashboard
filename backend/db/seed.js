const fs = require("fs");
const path = require("path");
const { createPool } = require("./client");

const SEED_FILE = path.join(__dirname, "seeds", "dev.sql");

async function seed() {
   const pool = createPool();

   try {
      const sql = fs.readFileSync(SEED_FILE, "utf8");
      await pool.query(sql);
      console.log("seed  seeds/dev.sql");
   } finally {
      await pool.end();
   }
}

seed().catch((error) => {
   console.error(error);
   process.exit(1);
});
