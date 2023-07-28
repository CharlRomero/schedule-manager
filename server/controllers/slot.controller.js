import { pool } from "../database.js";

export const getSlot = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM SLOT");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createSlot = async (req, res) => {
  const { SLOT_INITIME, SLOT_ENDTIME, SLOT_WEEKEND } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO SLOT (SLOT_INITIME, SLOT_ENDTIME, SLOT_WEEKEND) VALUES (?, ?, ?)",
    [SLOT_INITIME, SLOT_ENDTIME, SLOT_WEEKEND]
  );
  res.send({
    SLOT_ID: rows.insertId,
    SLOT_INITIME,
    SLOT_ENDTIME,
    SLOT_WEEKEND,
  });
};

export const updateSlot = async (req, res) => {
  const { id } = req.params;
  const { SLOT_INITIME, SLOT_ENDTIME, SLOT_WEEKEND } = req.body;

  const [result] = await pool.query(
    "UPDATE SLOT SET SLOT_INITIME = IFNULL(?, SLOT_INITIME), SLOT_ENDTIME = IFNULL(?, SLOT_ENDTIME), SLOT_WEEKEND = IFNULL(?, SLOT_WEEKEND) WHERE SLOT_ID = ?",
    [SLOT_INITIME, SLOT_ENDTIME, SLOT_WEEKEND, id]
  );

  if (result.affectedRows === 0)
    return res.status(404).json({
      message: "Slot not found",
    });

  const [rows] = await pool.query("SELECT * FROM SLOT WHERE SLOT_ID = ?", [id]);

  res.json(rows);
};
