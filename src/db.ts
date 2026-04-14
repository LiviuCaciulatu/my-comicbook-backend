import type {PoolClient, QueryResult, QueryResultRow} from "pg";
import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

export type DbExecutor = Pick<Pool, "query"> | Pick<PoolClient, "query">;

// Ruleaza query-ul pe orice executor compatibil (pool global sau client de tranzactie),
// ca repository-urile sa poata folosi aceeasi functie in ambele contexte.
export async function executeQuery<T extends QueryResultRow = any>(
    executor: DbExecutor,
    text: string,
    params?: unknown[]
): Promise<QueryResult<T>> {
    try {
        return await executor.query<T>(text, params as any[] | undefined);
    } catch (err) {
        console.error("Database query error:", err);
        throw err;
    }
}

// Varianta simpla folosita in afara tranzactiilor explicite.
export async function query<T extends QueryResultRow = any>(text: string, params?: unknown[]): Promise<QueryResult<T>> {
    return executeQuery<T>(pool, text, params);
}

// Incapsuleaza commit/rollback automat pentru fluxurile care trebuie sa ramana atomice.
export async function withTransaction<T>(handler: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const result = await handler(client);
        await client.query("COMMIT");
        return result;
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error("Database rollback error:", rollbackError);
        }

        throw error;
    } finally {
        client.release();
    }
}
