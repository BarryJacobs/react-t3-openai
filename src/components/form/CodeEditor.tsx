import dynamic from "next/dynamic"
import type { MutableRefObject, ReactElement } from "react"
import { useEffect, useRef, useCallback } from "react"

const Editor = dynamic(() => import("@monaco-editor/react").then(mod => mod.default), {
  ssr: false
})

type MonacoOnInitializePane = (
  monacoEditorRef: MutableRefObject<any>,
  editorRef: MutableRefObject<any>,
  model: any
) => void

interface CodeEditorProps {
  language: string
  onChange: (...event: any[]) => void
}

export const CodeEditor = ({ language, onChange: onCodeChange }: CodeEditorProps): ReactElement => {
  const monacoEditorRef = useRef<any | null>(null)
  const editorRef = useRef<any | null>(null)

  const onInitializePane: MonacoOnInitializePane = useCallback(
    (monacoEditorRef, editorRef, model) => {
      editorRef.current.setScrollTop(1)
      editorRef.current.setPosition({
        lineNumber: 1,
        column: 0
      })
      editorRef.current.focus()
      monacoEditorRef.current.setModelMarkers(model[0], "owner", null)
    },
    []
  )

  useEffect(() => {
    if (monacoEditorRef?.current) {
      const model = monacoEditorRef.current.getModels()
      if (model?.length > 0) {
        onInitializePane(monacoEditorRef, editorRef, model)
      }
    }
  }, [onInitializePane])

  return (
    <>
      <Editor
        height="20em"
        language={language}
        onMount={(editor, monaco) => {
          monacoEditorRef.current = monaco.editor
          editorRef.current = editor
        }}
        options={{
          stopRenderingLineAfter: 1000,
          renderLineHighlight: "none",
          minimap: { enabled: false },
          lineNumbers: "off",
          lineDecorationsWidth: 0,
          guides: { indentation: false },
          padding: { top: 16 }
        }}
        theme="vs-dark"
        onChange={value => onCodeChange(value)}
      />
    </>
  )
}
