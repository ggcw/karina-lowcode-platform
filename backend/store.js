const db = require("./db");

function saveDsl(data) {
  const stmt = db.prepare(
    "INSERT INTO dsl (type, key, name, payload) VALUES (?, ?, ?, ?)"
  );
  const info = stmt.run(data.type, data.key, data.name || null, JSON.stringify(data));
  return info.lastInsertRowid;
}

function listDsl() {
  return db
    .prepare("SELECT id, type, key, name, created_at FROM dsl ORDER BY id DESC")
    .all();
}

function getDsl(id) {
  const row = db.prepare("SELECT * FROM dsl WHERE id = ?").get(id);
  if (!row) return null;
  return { ...row, payload: JSON.parse(row.payload) };
}

module.exports = { saveDsl, listDsl, getDsl };