import express from "express";
import { execSync } from "node:child_process";
import sqlite3 from "sqlite3";

const app = express();
const db = new sqlite3.Database(":memory:");
db.exec("CREATE TABLE users (id TEXT, name TEXT, bio TEXT)");

// The frontend's ?uid= value lands here verbatim.
app.get("/api/users/:id", (req, res) => {
  const sql = `SELECT * FROM users WHERE id = '${req.params.id}'`;
  db.all(sql, (err, rows) => res.json(rows?.[0] ?? { bio: "" }));
});

app.get("/api/search", (req, res) => {
  // Reflected into a shell command — command injection.
  const out = execSync(`grep -r ${req.query.q} ./data`).toString();
  res.send(out);
});

app.get("/api/export", (req, res) => {
  // Path traversal: ?file=../../etc/passwd
  res.sendFile(`/srv/reports/${req.query.file}`);
});

app.listen(4000);
