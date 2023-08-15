import { pool } from "../database.js";

export const getPeriods = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM PERIOD WHERE PER_STATUS = TRUE");
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
  const { PER_CODE } = req.body;
  const [rows] = await pool.query("INSERT INTO PERIOD (PER_CODE) VALUES (?)", [
    PER_CODE,
  ]);
  res.send({
    PER_ID: rows.insertId,
    PER_CODE,
  });
};

export const updatePeriod = async (req, res) => {
  const { id } = req.params;
  const { PER_CODE } = req.body;

  const [result] = await pool.query(
    "UPDATE PERIOD SET PER_CODE = IFNULL(?, PER_CODE) WHERE PER_ID = ?",
    [PER_CODE, id]
  );

  if (result.affectedRows === 0)
    return res.status(404).json({
      message: "Course not found",
    });

  const [rows] = await pool.query("SELECT * FROM PERIOD WHERE PER_ID = ?", [
    id,
  ]);

  res.json(rows);
};

export const deletePeriod = async (req, res) => {
  const { id } = req.params;

  const [result] = await pool.query(
    "UPDATE PERIOD SET PER_STATUS = FALSE WHERE PER_ID = ?",
    [id]
  );

  if (result.affectedRows === 0)
    return res.status(404).json({
      message: "Period not found",
    });

  const [rows] = await pool.query("SELECT * FROM PERIOD WHERE PER_ID = ?", [
    id,
  ]);

  res.json(rows);
};
