import type { RouterOutputs } from "utils/trpc"

export type Tool = RouterOutputs["tool"]["get"]
export type Tools = RouterOutputs["tool"]["getAll"]
export type Outputs = RouterOutputs["openai"]["completion"]
export type FieldType = "text" | "code" | "textarea"
export type OutputType = "text" | "prompt" | "code"
