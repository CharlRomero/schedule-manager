import { pool } from "../database.js";

export const getSubject = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM SUBJECT");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createSubject = async (req, res) => {
  const { SLOT_ID, COU_ID, COU_PERIOD, SUB_NAME } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO SUBJECT (SLOT_ID, COU_ID, COU_PERIOD, SUB_NAME) VALUES (?, ?, ?, ?)",
    [SLOT_ID, COU_ID, COU_PERIOD, SUB_NAME]
  );
  res.send({
    SUB_ID: rows.insertId,
    SLOT_ID,
    COU_ID,
    COU_PERIOD,
    SUB_NAME,
  });
};

export const updateSubject = async (req, res) => {
  const { id } = req.params;
  const { SLOT_ID, COU_ID, COU_PERIOD, SUB_NAME } = req.body;

  const [result] = await pool.query(
    "UPDATE SUBJECT SET SLOT_ID = IFNULL(?, SLOT_ID), COU_ID = IFNULL(?, COU_ID), COU_PERIOD = IFNULL(?, COU_PERIOD), SUB_NAME = IFNULL(?, SUB_NAME) WHERE SUB_ID = ?",
    [SLOT_ID, COU_ID, COU_PERIOD, SUB_NAME, id]
  );

  if (result.affectedRows === 0)
    return res.status(404).json({
      message: "Subject not found",
    });

  const [rows] = await pool.query("SELECT * FROM SUBJECT WHERE SUB_ID = ?", [
    id,
  ]);

  res.json(rows);
};
