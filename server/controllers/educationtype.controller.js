import { pool } from "../database.js";

export const getTypes = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM EDUCATIONTYPE");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const getType = async (req, res) => {
    try {
        const { id } = req.params;

        const [row] = await pool.query("SELECT * FROM EDUCATIONTYPE WHERE TYPE_ID = ?", [
            id,
        ]);
        res.json(row);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const createType = async (req, res) => {
    try {
        const { TYPE_NAME } = req.body;
        const [rows] = await pool.query("INSERT INTO EDUCATIONTYPE (TYPE_NAME) VALUES (?)", [
            TYPE_NAME,
        ]);
        res.send({
            TYPE_ID: rows.insertId,
            TYPE_NAME,
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};

export const updateType = async (req, res) => {
    try {
        const { TYPE_NAME, TYPE_STATUS } = req.body;
        const [rows] = await pool.query("UPDATE EDUCATIONTYPE SET TYPE_NAME=?, TYPE_STATUS=?", [
            TYPE_NAME,
            TYPE_STATUS
        ]);
        res.send({
            TYPE_ID: rows.insertId,
            TYPE_NAME,
            TYPE_STATUS,
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
}

export const deleteType = async (req, res) => {
    try {
        const { id } = req.params;
        const [row] = await pool.query("DELETE FROM EDUCATIONTYPE WHERE TYPE_ID = ?", [
            id,
        ]);
        res.json(row);
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong",
        });
    }
};