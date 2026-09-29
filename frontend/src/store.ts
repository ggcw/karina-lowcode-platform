import { create } from "zustand";
import { FormSchema, FormField, FieldType, createField } from "./dsl";

interface DesignerState {
  schema: FormSchema;
  selectedIndex: number | null;
  past: FormSchema[];
  future: FormSchema[];
  addField: (type: FieldType) => void;
  removeField: (index: number) => void;
  moveField: (from: number, to: number) => void;
  updateField: (index: number, patch: Partial<FormField>) => void;
  updateMeta: (patch: Partial<Pick<FormSchema, "key" | "name">>) => void;
  select: (index: number | null) => void;
  undo: () => void;
  redo: () => void;
}

const initialSchema: FormSchema = {
  type: "form",
  key: "general_apply",
  name: "通用申请单",
  fields: [],
};

export const useDesigner = create<DesignerState>((set, get) => ({
  schema: initialSchema,
  selectedIndex: null,
  past: [],
  future: [],

  addField(type) {
    const { schema, past } = get();
    const field = createField(type);
    set({
      schema: { ...schema, fields: [...schema.fields, field] },
      past: [...past, schema],
      future: [],
      selectedIndex: schema.fields.length,
    });
  },

  removeField(index) {
    const { schema, past, selectedIndex } = get();
    const fields = schema.fields.filter((_, i) => i !== index);
    const nextSelected =
      selectedIndex === null
        ? null
        : selectedIndex === index
          ? null
          : selectedIndex > index
            ? selectedIndex - 1
            : selectedIndex;
    set({
      schema: { ...schema, fields },
      past: [...past, schema],
      future: [],
      selectedIndex: nextSelected,
    });
  },

  moveField(from, to) {
    const { schema, past } = get();
    const fields = [...schema.fields];
    const [moved] = fields.splice(from, 1);
    fields.splice(to, 0, moved);
    set({ schema: { ...schema, fields }, past: [...past, schema], future: [] });
  },

  updateField(index, patch) {
    const { schema, past } = get();
    const fields = schema.fields.map((f, i) => (i === index ? { ...f, ...patch } : f));
    set({ schema: { ...schema, fields }, past: [...past, schema], future: [] });
  },

  updateMeta(patch) {
    const { schema, past } = get();
    set({ schema: { ...schema, ...patch }, past: [...past, schema], future: [] });
  },

  select(index) {
    set({ selectedIndex: index });
  },

  undo() {
    const { past, future, schema } = get();
    if (past.length === 0) return;
    const prev = past[past.length - 1];
    set({ schema: prev, past: past.slice(0, -1), future: [schema, ...future] });
  },

  redo() {
    const { past, future, schema } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({ schema: next, past: [...past, schema], future: future.slice(1) });
  },
}));