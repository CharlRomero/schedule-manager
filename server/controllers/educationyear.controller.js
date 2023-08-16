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

export const getYearByType = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT YEAR_LEVEL FROM EDUCATIONYEAR y, EDUCATIONTYPE t WHERE y.TYPE_ID = t.TYPE_ID and t.TYPE_ID = ?",
      [id]
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getYear = async (req, res) => {
  try {
    const { id } = req.params;

    const [row] = await pool.query(
      "SELECT * FROM EDUCATIONYEAR WHERE YEAR_ID = ?",
      [id]
    );
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

export const updateEducationYear = async (req, res) => {
  const { id } = req.params;
  const { YEAR_LEVEL, TYPE_ID } = req.body;

  const [result] = await pool.query(
    "UPDATE EDUCATIONYEAR SET YEAR_LEVEL = IFNULL(?, YEAR_LEVEL), TYPE_ID = IFNULL(?, TYPE_ID) WHERE YEAR_ID = ?",
    [YEAR_LEVEL, TYPE_ID, id]
  );

  if (result.affectedRows === 0)
    return res.status(404).json({ message: "Education year not found" });

  const [rows] = await pool.query(
    "SELECT * FROM EDUCATIONYEAR WHERE YEAR_ID = ?",
    [id]
  );

  res.json(rows);
};
