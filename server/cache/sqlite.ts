import Database from "better-sqlite3";
import {safeParse, safeStringify} from "@/server/cache/storage";

const db = new Database("storage.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS store (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

type RowEntry = {
    key: string,
    value: string
}

export class SQLiteStorage {
    async get(key: string): Promise<unknown | null> {
        const row = db.prepare("SELECT value FROM store WHERE key = ?").get(key) as RowEntry;
        return row ? safeParse(row.value) : null;
    }

    async set(key: string, value: unknown): Promise<void> {
        db.prepare(
            "INSERT INTO store (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
        ).run(key, safeStringify(value));
    }

    async delete(key: string): Promise<void> {
        db.prepare("DELETE FROM store WHERE key = ?").run(key);
    }

    async getByPrefix(prefix: string): Promise<Record<string, unknown>> {
        const rows: RowEntry[] = db.prepare("SELECT * FROM store WHERE key LIKE ?").all(`${prefix}%`) as RowEntry[];
        return Object.fromEntries(rows.map( (row: RowEntry) => [row.key, safeParse(row.value)]));
    }
}
