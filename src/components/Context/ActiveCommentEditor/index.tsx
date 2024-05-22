import { Editor } from '@matters/matters-editor'
import { createContext, useState } from 'react'

export const ActiveCommentEditorContext = createContext(
  {} as {
    editor: Editor | null
    setEditor: (editor: Editor | null) => void
  }
)

export const ActiveCommentEditorProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [editor, setEditor] = useState<Editor | null>(null)

  return (
    <ActiveCommentEditorContext.Provider value={{ editor, setEditor }}>
      {children}
    </ActiveCommentEditorContext.Provider>
  )
}
