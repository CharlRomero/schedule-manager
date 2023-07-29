import { pool } from "../database.js";

export const getCourses = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM COURSE_VW");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const [row] = await pool.query("SELECT * FROM COURSE_VW WHERE COU_ID = ?", [
      id,
    ]);
    res.json(row);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createCourse = async (req, res) => {
  const { COU_NAME, COU_YEAR, COU_PERIOD } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO COURSE (COU_NAME, COU_YEAR, COU_PERIOD) VALUES (?, ?, ?)",
    [COU_NAME, COU_YEAR, COU_PERIOD]
  );
  res.send({
    COU_ID: rows.insertId,
    COU_NAME,
    COU_YEAR,
    COU_PERIOD,
  });
};

export const updateCourse = async (req, res) => {
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
