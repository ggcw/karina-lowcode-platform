// 与 contract/dsl-types.ts 保持一致的字段/表单类型定义（契约 v0.1）

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

export const FIELD_TYPES: { type: FieldType; label: string }[] = [
  { type: "text", label: "单行文本" },
  { type: "textarea", label: "多行文本" },
  { type: "number", label: "数字" },
  { type: "date", label: "日期" },
  { type: "select", label: "下拉选择" },
];

export function createField(type: FieldType): FormField {
  const key = `field_${crypto.randomUUID().slice(0, 8)}`;
  const field: FormField = { type, key, label: "" };
  if (type === "select") field.options = ["选项1", "选项2"];
  return field;
}