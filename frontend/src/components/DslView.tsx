import { useDesigner } from "../store";

export function DslView() {
  const schema = useDesigner((s) => s.schema);
  return (
    <div>
      <div className="dsl-header">DSL / JSON Schema</div>
      <pre className="dsl-pre">{JSON.stringify(schema, null, 2)}</pre>
    </div>
  );
}