import { pool } from "../database.js";

export const getRooms = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM ROOM WHERE ROOM_STATUS = TRUE ORDER BY ROOM_NAME ASC"
    );
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

    const [row] = await pool.query("SELECT * FROM ROOM WHERE ROOM = ?", [id]);
    res.json(row);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createRoom = async (req, res) => {
  const { ROOM_NAME } = req.body;
  const [rows] = await pool.query("INSERT INTO ROOM (ROOM_NAME) VALUES (?)", [
    ROOM_NAME,
  ]);
  res.send({
    SLOT_ID: rows.insertId,
    ROOM_NAME,
  });
};

export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { ROOM_NAME } = req.body;

  const [result] = await pool.query(
    "UPDATE ROOM SET ROOM_NAME = IFNULL(?, ROOM_NAME) WHERE ROOM_ID = ?",
    [ROOM_NAME, id]
  );

  if (result.affectedRows === 0)
    return res.status(404).json({
      message: "Room not found",
    });

  const [rows] = await pool.query("SELECT * FROM ROOM WHERE ROOM_ID = ?", [id]);

  res.json(rows);
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;

  const [result] = await pool.query(
    "UPDATE ROOM SET ROOM_STATUS = FALSE WHERE ROOM_ID = ?",
    [id]
  );

  if (result.affectedRows === 0)
    return res.status(404).json({
      message: "Room not found",
    });

  const [rows] = await pool.query("SELECT * FROM ROOM WHERE ROOM_ID = ?", [id]);

  res.json(rows);
};
