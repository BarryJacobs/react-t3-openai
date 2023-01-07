import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/dracula"

interface CodeBlockProps {
  code: string
}

export const CodeBlock = ({ code }: CodeBlockProps) => (
  <Highlight {...defaultProps} theme={theme} code={code} language="tsx">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={`w-full p-2 text-xs overflow-scroll ${className}`} style={style}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
)

export default CodeBlock
