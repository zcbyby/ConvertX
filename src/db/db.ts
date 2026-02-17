import { mkdirSync } from "node:fs";
import { Database } from "bun:sqlite";

mkdirSync("./data", { recursive: true });
const db = new Database("./data/mydb.sqlite", { create: true });

if (!db.query("SELECT * FROM sqlite_master WHERE type='table'").get()) {
  db.exec(`
CREATE TABLE IF NOT EXISTS jobs (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	date_created TEXT NOT NULL,
  status TEXT DEFAULT 'not started',
  num_files INTEGER DEFAULT 0
);
PRAGMA user_version = 1;`);
}

const dbVersion = (db.query("PRAGMA user_version").get() as { user_version?: number }).user_version;
if (dbVersion === 0) {
  db.exec("ALTER TABLE file_names ADD COLUMN status TEXT DEFAULT 'not started';");
  db.exec("PRAGMA user_version = 1;");
  console.log("Updated database to version 1.");
}

// enable WAL mode
db.exec("PRAGMA journal_mode = WAL;");

export default db;
