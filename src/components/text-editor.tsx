import './text-editor.css'
import { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Cell } from '../state'
import { useActions } from '../hooks/use-actions'

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('# Header')
  const { updateCell } = useActions()

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
          value={cell.content}
          onChange={(v) => {
            updateCell(cell.id, v || '')
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
        <MDEditor.Markdown
          source={cell.content || 'Click to edit'}></MDEditor.Markdown>
      </div>
    </div>
  )
}

export default TextEditor
