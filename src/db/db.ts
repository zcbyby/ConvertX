import { mkdirSync } from "node:fs";
import { Database } from "bun:sqlite";

mkdirSync("./data", { recursive: true });
const db = new Database("./data/mydb.sqlite", { create: true });

const jobsTableExists = db
  .query("SELECT name FROM sqlite_master WHERE type='table' AND name='jobs'")
  .get();
if (!jobsTableExists) {
  db.exec(`
CREATE TABLE IF NOT EXISTS jobs (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	date_created TEXT NOT NULL,
  status TEXT DEFAULT 'not started',
  num_files INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS file_names (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER NOT NULL,
  file_name TEXT NOT NULL,
  output_file_name TEXT NOT NULL,
  status TEXT DEFAULT 'not started',
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);
PRAGMA user_version = 1;`);
}

const fileNamesTableExists = db
  .query("SELECT name FROM sqlite_master WHERE type='table' AND name='file_names'")
  .get();
if (!fileNamesTableExists) {
  db.exec(`
CREATE TABLE IF NOT EXISTS file_names (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER NOT NULL,
  file_name TEXT NOT NULL,
  output_file_name TEXT NOT NULL,
  status TEXT DEFAULT 'not started',
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);`);
  const dbVersion = (db.query("PRAGMA user_version").get() as { user_version?: number })
    .user_version;
  if (dbVersion === 0) {
    db.exec("PRAGMA user_version = 1;");
    console.log("Updated database to version 1.");
  }
}

const dbVersion = (db.query("PRAGMA user_version").get() as { user_version?: number }).user_version;
if (dbVersion === 0) {
  const fileNamesTableExists = db
    .query("SELECT name FROM sqlite_master WHERE type='table' AND name='file_names'")
    .get();
  if (!fileNamesTableExists) {
    db.exec(`
CREATE TABLE IF NOT EXISTS file_names (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER NOT NULL,
  file_name TEXT NOT NULL,
  output_file_name TEXT NOT NULL,
  status TEXT DEFAULT 'not started',
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);`);
  }
  db.exec("PRAGMA user_version = 1;");
  console.log("Updated database to version 1.");
}

// enable WAL mode
db.exec("PRAGMA journal_mode = WAL;");

export default db;
