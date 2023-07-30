import { pool } from "../database.js";

export const getYears = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM EDUCATIONYEAR");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getYear = async (req, res) => {
  try {
    const { id } = req.params;

    const [row] = await pool.query("SELECT * FROM EDUCATIONYEAR WHERE YEAR_ID = ?", [
      id,
    ]);
    res.json(row);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createYear = async (req, res) => {
  const { PER_NAME } = req.body;
  const [rows] = await pool.query("INSERT INTO YEAR (PER_NAME) VALUES (?)", [
    PER_NAME,
  ]);
  res.send({
    PER_ID: rows.insertId,
    PER_NAME,
  });
};