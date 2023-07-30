import { pool } from "../database.js";

export const getRooms = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM ROOM");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const [row] = await pool.query("SELECT * FROM ROOM WHERE ROOM = ?", [
      id,
    ]);
    res.json(row);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};