import { useEffect, useState } from 'react'
import CodeEditor from './code-editor'
import Preview from './preview'
import bundle from '../bundler'
import Resizable from './resizable'

const CodeCell: React.FC = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input)
      setCode(output.code)
      setError(output.err)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const b = 2;"
            onChange={(value) => setInput(value)}></CodeEditor>
        </Resizable>
        <Preview code={code} err={error}></Preview>
      </div>
    </Resizable>
  )
}

export default CodeCell
