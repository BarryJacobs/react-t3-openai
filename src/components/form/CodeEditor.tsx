import dynamic from "next/dynamic"

const AceEditor = dynamic(
  async () => {
    const ace = await import("react-ace")
    require("ace-builds/src-noconflict/mode-tsx")
    require("ace-builds/src-noconflict/theme-dracula")
    return ace
  },
  {
    ssr: false
  }
)

interface CodeEditorProps {
  value?: string | undefined
  onChange: (newValue: string) => void
}

export const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
  return (
    <AceEditor
      mode="tsx"
      theme="dracula"
      onChange={onChange}
      value={value}
      setOptions={{
        showLineNumbers: false,
        showGutter: false,
        highlightActiveLine: false
      }}
      editorProps={{
        $blockScrolling: true
      }}
    />
  )
}
