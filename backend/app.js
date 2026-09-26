const express = require("express");
const Ajv = require("ajv");
const schema = require("../contract/dsl.schema.json");
const store = require("./store");

const app = express();
app.use(express.json());

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
const validate = ajv.compile(schema);

// 接收 -> 校验 -> 存库
app.post("/api/dsl", (req, res) => {
  const data = req.body;

  if (!validate(data)) {
    return res.status(400).json({ ok: false, errors: validate.errors });
  }

  const id = store.saveDsl(data);
  res.status(201).json({ ok: true, id });
});

// 列表（验证用）
app.get("/api/dsl", (req, res) => {
  res.json(store.listDsl());
});

// 单条详情
app.get("/api/dsl/:id", (req, res) => {
  const row = store.getDsl(Number(req.params.id));
  if (!row) return res.status(404).json({ ok: false, error: "not found" });
  res.json(row);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`后端已启动：http://localhost:${PORT}`);
});