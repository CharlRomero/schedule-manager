import { pool } from "../database.js";

export const getCourses = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM COURSE_VW ORDER BY PER_CODE DESC"
    );
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
  const { YEAR_ID, PER_ID, ROOM_ID, COU_STATUS } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO COURSE (YEAR_ID, PER_ID, ROOM_ID) VALUES (?, ?, ?)",
    [YEAR_ID, PER_ID, ROOM_ID, COU_STATUS]
  );
  res.send({
    COU_ID: rows.insertId,
    YEAR_ID,
    PER_ID,
    ROOM_ID,
  });
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { YEAR_ID, PER_ID, ROOM_ID, COU_STATUS } = req.body;
  console.log(req.body);
  const [result] = await pool.query(
    "UPDATE COURSE SET YEAR_ID = IFNULL(?, YEAR_ID), PER_ID = IFNULL(?, PER_ID), ROOM_ID = IFNULL(?, ROOM_ID), COU_STATUS = IFNULL(?, COU_STATUS) WHERE COU_ID = ?",
    [YEAR_ID, PER_ID, ROOM_ID, COU_STATUS, id]
  );

  if (result.affectedRows === 0)
    return res.status(404).json({
      message: "Course not found",
    });

  return res.status(200).json({ message: "Course updated" });
};

// export const updateCourse = async (req, res) => {
//   const { id } = req.params;
//   const { COU_NAME, COU_YEAR, COU_PERIOD } = req.body;

//   const [result] = await pool.query(
//     "UPDATE COURSE SET COU_NAME = IFNULL(?, COU_NAME), COU_YEAR = IFNULL(?, COU_YEAR), COU_PERIOD = IFNULL(?, COU_PERIOD) WHERE COU_ID = ?",
//     [COU_NAME, COU_YEAR, COU_PERIOD, id]
//   );

//   if (result.affectedRows === 0)
//     return res.status(404).json({
//       message: "Course not found",
//     });

//   const [rows] = await pool.query("SELECT * FROM COURSE WHERE COU_ID = ?", [
//     id,
//   ]);

//   res.json(rows);
// };

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const [row] = await pool.query("DELETE FROM COURSE WHERE COU_ID = ?", [id]);
    res.json(row);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
