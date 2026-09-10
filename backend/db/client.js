const path = require("path");
const { Pool } = require("pg");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
require("dotenv").config({
   path: path.join(__dirname, "..", ".env.local"),
   override: true,
});

function createPool() {
   return new Pool({
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "equipment_dashboard",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      port: Number(process.env.DB_PORT) || 5432,
   });
}

module.exports = { createPool };
