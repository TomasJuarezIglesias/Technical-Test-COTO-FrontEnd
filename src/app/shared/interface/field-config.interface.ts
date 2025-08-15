export type FieldType = 'text' | 'number' | 'select' | 'date' | 'time';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: any }[];
}
