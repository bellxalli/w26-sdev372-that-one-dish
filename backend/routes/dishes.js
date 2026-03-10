import express from "express";
import { pool } from "../db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM dishes");    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const { dish_name, cuisine, dish_details, restaurant_name, restaurant_address } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const sql = `
    INSERT INTO dishes
    (dish_name, cuisine, dish_details, restaurant_name, restaurant_address, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      dish_name,
      cuisine,
      dish_details,
      restaurant_name,
      restaurant_address,
      image_url,
    ]);

    res.status(201).json({ message: "Dish added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add dish" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { dish_name, cuisine, dish_details, restaurant_name, restaurant_address } = req.body;

  const sql = `
    UPDATE dishes
    SET dish_name = ?, cuisine = ?, dish_details = ?, restaurant_name = ?, restaurant_address = ?
    WHERE id = ?
  `;

  try {
    const [result] = await pool.query(sql, [dish_name, cuisine, dish_details, restaurant_name, restaurant_address, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Dish not found" });
    res.json({ message: "Dish updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update dish" });
  }
});

router.delete("/uploads/:filename", async (req, res) => {
  const filePath = path.join(process.cwd(), "uploads", req.params.filename);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: "Image deleted" });
    } else res.status(404).json({ error: "File not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

router.delete("/uploads", async (req, res) => {
  const uploadsDir = path.join(process.cwd(), "uploads");
  try {
    fs.readdirSync(uploadsDir).forEach(file => fs.unlinkSync(path.join(uploadsDir, file)));
    res.json({ message: "All uploaded images deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete uploaded images" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM dishes WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Dish not found" });
    res.json({ message: "Dish deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete dish" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await pool.query("DELETE FROM dishes");
    res.json({ message: "All dishes deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete all dishes" });
  }
});

export default router;