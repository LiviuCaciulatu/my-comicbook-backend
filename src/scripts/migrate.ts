import fs from "fs";
import path from "path";
import { pool } from "../db";

async function migrate() {
    try {
        const sql = fs.readFileSync(
            path.join(__dirname, "../../sql/init.sql"),
            "utf-8"
        );

        await pool.query(sql);

        console.log("Migration completed successfully");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

migrate();