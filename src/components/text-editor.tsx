import './text-editor.css'
import { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('# Header')

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        return
      }
      setEditing(false)
    }
    document.addEventListener('click', listener, { capture: true })

    return () => {
      document.removeEventListener('click', listener, { capture: true })
    }
  }, [])

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={value}
          onChange={(v) => {
            setValue(v || '')
          }}></MDEditor>
      </div>
    )
  }

  return (
    <div
      className="text-editor card"
      onClick={() => {
        setEditing(true)
      }}>
      <div className="card-content">
        <MDEditor.Markdown source={value}></MDEditor.Markdown>
      </div>
    </div>
  )
}

export default TextEditor
