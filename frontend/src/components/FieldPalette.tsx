import { useDraggable } from "@dnd-kit/core";
import { FIELD_TYPES, FieldType } from "../dsl";

export function FieldPalette() {
  return (
    <div className="palette-col">
      <div className="palette-header">组件库</div>
      {FIELD_TYPES.map((t) => (
        <PaletteItem key={t.type} type={t.type} label={t.label} />
      ))}
    </div>
  );
}

function PaletteItem({ type, label }: { type: FieldType; label: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`palette-item ${isDragging ? "palette-dragging" : ""}`}
      {...listeners}
      {...attributes}
    >
      <span className="field-type">{type}</span>
      <span>{label}</span>
    </div>
  );
}