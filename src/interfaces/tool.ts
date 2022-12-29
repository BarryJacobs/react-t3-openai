export interface Tool {
  category: string
  title: string
  description: string
  fields: Field[]
  output: Output
}

export type FieldType = "text" | "code" | "textarea"
export interface Field {
  type: FieldType
  name: string
  label: string
  placeholder?: string
  hint?: string
}

export interface Output {
  title: string
  description: string
}
