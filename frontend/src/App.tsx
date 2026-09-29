import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { FieldPalette } from "./components/FieldPalette";
import { Canvas } from "./components/Canvas";
import { PropertyPanel } from "./components/PropertyPanel";
import { DslView } from "./components/DslView";
import { useDesigner } from "./store";
import { FieldType } from "./dsl";

export default function App() {
  const addField = useDesigner((s) => s.addField);
  const moveField = useDesigner((s) => s.moveField);
  const undo = useDesigner((s) => s.undo);
  const redo = useDesigner((s) => s.redo);
  const canUndo = useDesigner((s) => s.past.length > 0);
  const canRedo = useDesigner((s) => s.future.length > 0);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const id = String(active.id);
    if (id.startsWith("palette-")) {
      addField(id.slice("palette-".length) as FieldType);
      return;
    }

    if (over.id === "canvas") return;

    if (active.data.current?.sortable && over.data.current?.sortable) {
      const from = active.data.current.sortable.index as number;
      const to = over.data.current.sortable.index as number;
      if (from !== to) moveField(from, to);
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>表单设计器</h1>
        <div className="tools">
          <button onClick={undo} disabled={!canUndo}>
            撤销
          </button>
          <button onClick={redo} disabled={!canRedo}>
            重做
          </button>
        </div>
      </header>
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <main className="layout">
          <FieldPalette />
          <Canvas />
          <aside className="right-col">
            <PropertyPanel />
            <DslView />
          </aside>
        </main>
      </DndContext>
    </div>
  );
}