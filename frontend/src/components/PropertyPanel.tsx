import { useDesigner } from "../store";
import { FIELD_TYPES, FieldType, FormField } from "../dsl";

export function PropertyPanel() {
  const schema = useDesigner((s) => s.schema);
  const selectedIndex = useDesigner((s) => s.selectedIndex);
  const updateMeta = useDesigner((s) => s.updateMeta);
  const updateField = useDesigner((s) => s.updateField);
  const removeField = useDesigner((s) => s.removeField);

  const field = selectedIndex !== null ? schema.fields[selectedIndex] : null;

  return (
    <div className="panel">
      <h3>表单设置</h3>
      <label>标识 key</label>
      <input
        type="text"
        value={schema.key}
        onChange={(e) => updateMeta({ key: e.target.value })}
      />
      <label>表单名称</label>
      <input
        type="text"
        value={schema.name ?? ""}
        onChange={(e) => updateMeta({ name: e.target.value })}
      />

      <h3>字段属性</h3>
      {field ? (
        <FieldEditor
          field={field}
          onPatch={(p) => selectedIndex !== null && updateField(selectedIndex, p)}
          onRemove={() => selectedIndex !== null && removeField(selectedIndex)}
        />
      ) : (
        <p className="hint" style={{ margin: "12px 0" }}>
          点击画布中的字段进行配置
        </p>
      )}
    </div>
  );
}

function FieldEditor({
  field,
  onPatch,
  onRemove,
}: {
  field: FormField;
  onPatch: (p: Partial<FormField>) => void;
  onRemove: () => void;
}) {
  return (
    <>
      <label>标签 label</label>
      <input
        type="text"
        value={field.label}
        onChange={(e) => onPatch({ label: e.target.value })}
      />

      <label>字段名 key</label>
      <input
        type="text"
        value={field.key}
        onChange={(e) => onPatch({ key: e.target.value })}
      />

      <label>类型</label>
      <select
        value={field.type}
        onChange={(e) => onPatch({ type: e.target.value as FieldType })}
      >
        {FIELD_TYPES.map((t) => (
          <option key={t.type} value={t.type}>
            {t.label}
          </option>
        ))}
      </select>

      <label style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={!!field.required}
          onChange={(e) => onPatch({ required: e.target.checked })}
        />
        必填
      </label>

      {(field.type === "text" || field.type === "textarea") && (
        <>
          <label>占位提示 placeholder</label>
          <input
            type="text"
            value={field.placeholder ?? ""}
            onChange={(e) => onPatch({ placeholder: e.target.value })}
          />
        </>
      )}

      {field.type === "number" && (
        <>
          <label>最小值 min</label>
          <input
            type="number"
            value={field.min ?? ""}
            onChange={(e) =>
              onPatch({ min: e.target.value === "" ? undefined : Number(e.target.value) })
            }
          />
          <label>最大值 max</label>
          <input
            type="number"
            value={field.max ?? ""}
            onChange={(e) =>
              onPatch({ max: e.target.value === "" ? undefined : Number(e.target.value) })
            }
          />
        </>
      )}

      {field.type === "select" && (
        <>
          <label>选项（每行一个）</label>
          <textarea
            rows={4}
            value={(field.options ?? []).join("\n")}
            onChange={(e) =>
              onPatch({
                options: e.target.value.split("\n").filter((s) => s.trim().length > 0),
              })
            }
          />
        </>
      )}

      <button className="danger" onClick={onRemove}>
        删除该字段
      </button>
    </>
  );
}