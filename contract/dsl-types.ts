export type FieldType = "text" | "textarea" | "number" | "date" | "select";

export interface FormField {
  type: FieldType;
  key: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number | boolean | null;
  options?: string[];
  min?: number;
  max?: number;
}

export interface FormSchema {
  type: "form";
  key: string;
  name?: string;
  fields: FormField[];
}

export type NodeType = "start" | "end" | "user_task" | "exclusive_gateway";

export interface Branch {
  if?: string;
  else?: boolean;
  to: string;
}

export interface FlowNode {
  id: string;
  type: NodeType;
  name?: string;
  next?: string;
  assignee?: string;
  branches?: Branch[];
}

export interface FlowSchema {
  type: "flow";
  key: string;
  name?: string;
  nodes: FlowNode[];
}

export type DslSchema = FormSchema | FlowSchema;
