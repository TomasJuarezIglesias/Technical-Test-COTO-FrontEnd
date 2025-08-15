import { FieldType } from "../types/field.type";
import { OptionConfig } from "./option-config.interface";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: OptionConfig[];
}
