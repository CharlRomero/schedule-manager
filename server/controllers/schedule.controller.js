import { pool } from "../database.js";



export const getCourseSchedules = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM CourseSchedule"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};



export const getCourseSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const [row] = await pool.query("SELECT * FROM CourseSchedule WHERE idCurso = ?", [
      id,
    ]);
    res.json(row);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createCourseSchedule = async (req, res) => {
  const { idCurso, lunes, martes, miercoles, jueves, viernes } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO CourseSchedule (idCurso, lunes, martes, miercoles, jueves, viernes) VALUES (?, ?, ?, ?, ?, ?)",
      [idCurso, lunes, martes, miercoles, jueves, viernes]
    );

    res.send({
      idCurso: rows.insertId,
      lunes,
      martes,
      miercoles,
      jueves,
      viernes,
    });
  } catch (error) {
    console.error("Error al insertar en la tabla CourseSchedule:", error);
    res.status(500).json({
      message: "Error al insertar en la tabla CourseSchedule",
    });
  }
};

export const updateCourseSchedule = async (req, res) => {
  const { id } = req.params;
  const { lunes, martes, miercoles, jueves, viernes } = req.body;

  const [result] = await pool.query(
    "UPDATE CourseSchedule SET lunes = IFNULL(?, lunes), martes = IFNULL(?, martes), miercoles = IFNULL(?, miercoles), jueves = IFNULL(?, jueves), viernes = IFNULL(?, viernes) WHERE idCurso = ?",
    [lunes, martes, miercoles, jueves, viernes, id]
  );

  if (result.affectedRows === 0)
    return res.status(404).json({
      message: "Course schedule not found",
    });

  const [rows] = await pool.query("SELECT * FROM CourseSchedule WHERE idCurso = ?", [
    id,
  ]);

  res.json(rows);
};

export const deleteCourseSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const [row] = await pool.query("DELETE FROM CourseSchedule WHERE idCurso = ?", [
      id,
    ]);
    res.json(row);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
