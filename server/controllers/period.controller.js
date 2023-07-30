import { pool } from "../database.js";

export const getPeriods = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM PERIOD");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getPeriod = async (req, res) => {
  try {
    const { id } = req.params;

    const [row] = await pool.query("SELECT * FROM PERIOD WHERE PER_ID = ?", [
      id,
    ]);
    res.json(row);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createPeriod = async (req, res) => {
  const { PER_NAME } = req.body;
  const [rows] = await pool.query("INSERT INTO PERIOD (PER_NAME) VALUES (?)", [
    PER_NAME,
  ]);
  res.send({
    PER_ID: rows.insertId,
    PER_NAME,
  });
};

export const updatePeriod = async (req, res) => {
  const { id } = req.params;
  const { COU_NAME, COU_YEAR, COU_PERIOD } = req.body;

  const [result] = await pool.query(
    "UPDATE COURSE SET COU_NAME = IFNULL(?, COU_NAME), COU_YEAR = IFNULL(?, COU_YEAR), COU_PERIOD = IFNULL(?, COU_PERIOD) WHERE COU_ID = ?",
    [COU_NAME, COU_YEAR, COU_PERIOD, id]
  );

  if (result.affectedRows === 0)
    return res.status(404).json({
      message: "Course not found",
    });

  const [rows] = await pool.query("SELECT * FROM COURSE WHERE COU_ID = ?", [
    id,
  ]);

  res.json(rows);
};
