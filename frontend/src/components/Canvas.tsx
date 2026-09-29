import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDesigner } from "../store";
import { FormField } from "../dsl";

export function Canvas() {
  const schema = useDesigner((s) => s.schema);
  const selectedIndex = useDesigner((s) => s.selectedIndex);
  const select = useDesigner((s) => s.select);
  const removeField = useDesigner((s) => s.removeField);

  const { setNodeRef, isOver } = useDroppable({ id: "canvas" });

  return (
    <div className="canvas-col">
      <div className="canvas-header">画布</div>
      <div ref={setNodeRef} className={`canvas ${isOver ? "canvas-over" : ""}`}>
        {schema.fields.length === 0 && (
          <p className="hint">从左侧组件库拖入字段，开始搭建表单</p>
        )}
        <SortableContext
          items={schema.fields.map((_, i) => String(i))}
          strategy={verticalListSortingStrategy}
        >
          {schema.fields.map((field, i) => (
            <FieldRow
              key={i}
              index={i}
              field={field}
              selected={i === selectedIndex}
              onSelect={() => select(i)}
              onRemove={() => removeField(i)}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

function FieldRow({
  index,
  field,
  selected,
  onSelect,
  onRemove,
}: {
  index: number;
  field: FormField;
  selected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: String(index),
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`field-row ${selected ? "field-selected" : ""} ${isDragging ? "field-dragging" : ""}`}
      onClick={onSelect}
    >
      <span className="drag-handle" {...attributes} {...listeners}>
        ⠿
      </span>
      <span className="field-type">{field.type}</span>
      <span className="field-label">{field.label || "(未命名)"}</span>
      <span className="field-key">{field.key}</span>
      <button
        className="icon-btn"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        ×
      </button>
    </div>
  );
}