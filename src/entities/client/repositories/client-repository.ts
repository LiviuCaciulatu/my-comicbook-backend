import { pool } from "../db";

export const getClients = async () => {
    const result = await pool.query("SELECT * FROM clients ORDER BY created_at DESC");
    return result.rows;
};

export const createClient = async (data: any) => {
    const { email, full_name } = data;

    const result = await pool.query(
        `INSERT INTO clients (email, full_name)
     VALUES ($1, $2)
     RETURNING *`,
        [email, full_name]
    );

    return result.rows[0];
};