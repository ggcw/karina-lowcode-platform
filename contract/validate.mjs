import Ajv from "ajv";
import fs from "node:fs";

const schema = JSON.parse(fs.readFileSync("dsl.schema.json", "utf8"));
const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
const validate = ajv.compile(schema);

const files = ["example-form.json", "example-flow.json"];
let failed = false;

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const ok = validate(data);
  if (ok) {
    console.log(`PASS  ${file}`);
  } else {
    failed = true;
    console.log(`FAIL  ${file}`);
    console.log(JSON.stringify(validate.errors, null, 2));
  }
}

process.exit(failed ? 1 : 0);
