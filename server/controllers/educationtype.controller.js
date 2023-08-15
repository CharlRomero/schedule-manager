import { pool } from "../database.js";

export const getEducationTypes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM EDUCATIONTYPE WHERE TYPE_STATUS = TRUE"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getEducationType = async (req, res) => {
  try {
    const { id } = req.params;

    const [row] = await pool.query(
      "SELECT * FROM EDUCATIONTYPE WHERE TYPE_ID = ?",
      [id]
    );
    res.json(row);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createEducationType = async (req, res) => {
  const { TYPE_NAME } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO EDUCATIONTYPE (TYPE_NAME) VALUES (?)",
    [TYPE_NAME]
  );
  res.send({ TYPE_ID: rows.insertId, TYPE_NAME });
};

export const updateEducationType = async (req, res) => {
  const { id } = req.params;
  const { TYPE_NAME } = req.body;

  const [result] = await pool.query(
    "UPDATE EDUCATIONTYPE SET TYPE_NAME = IFNULL(?, TYPE_NAME) WHERE TYPE_IDx = ?",
    [TYPE_NAME, id]
  );

  if (result.affectedRows === 0)
    return res.status(404).json({ message: "Education type not found" });

  const [rows] = await pool.query(
    "SELECT * FROM EDUCATIONTYPE WHERE TYPE_ID = ?",
    [id]
  );

  res.json(rows);
};

export const deleteEducationType = async (req, res) => {
  const { id } = req.params;

  const [result] = await pool.query(
    "UPDATE EDUCATIONTYPE SET TYPE_STATUS = FALSE WHERE TYPE_ID = ?",
    [id]
  );

  if (result.affectedRows === 0)
    return res.status(404).json({ message: "Education type not found" });

  const [rows] = await pool.query(
    "SELECT * FROM EDUCATIONTYPE WHERE TYPE_ID = ?",
    [id]
  );

  res.json(rows)
};
