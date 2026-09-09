const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//    res.send("Backend is running");
// });

// app.listen(3001, () => {
//    console.log("Server running on http://localhost:3001");
// });

const pool = new Pool({
   host: "localhost",
   database: "equipment_dashboard",
   port: 5432,
});

app.get("/api/equipment", async (req, res) => {
   const result = await pool.query("SELECT * FROM equipment");

   res.json(result.rows);
});

app.post("/api/equipment", async (req, res) => {
   const { name, category, status } = req.body;

   try {
      const result = await pool.query(
         `INSERT INTO equipment (name, model, status)
         VALUES ($1, $2, $3) 
         RETURNING *`,
         [name, category, status],
      );

      res.status(201).json(result.rows[0]);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create equipment" });
   }
});

app.delete("/api/equipment/:id", async (req, res) => {
   const { id } = req.params;

   if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: "Invalid equipment id" });
   }

   try {
      const result = await pool.query(
         `DELETE FROM equipment 
         WHERE id = $1 
         RETURNING *`,
         [id],
      );

      if (result.rows.length === 0) {
         return res.status(404).json({ error: "Equipment not found" });
      }

      res.status(200).json(result.rows[0]);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete equipment" });
   }
});

app.listen(3001);
