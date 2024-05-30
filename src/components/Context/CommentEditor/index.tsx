import { Editor } from '@matters/matters-editor'
import { createContext, ReactNode, useContext, useState } from 'react'

interface CommentEditorContextProps {
  activeEditor: Editor | null
  fallbackEditor: Editor | null
  setActiveEditor: (editor: Editor | null) => void
  setFallbackEditor: (editor: Editor | null) => void
  getCurrentEditor: () => Editor | null
}

const CommentEditorContext = createContext<CommentEditorContextProps>(
  {} as CommentEditorContextProps
)

export const useCommentEditorContext = (): CommentEditorContextProps => {
  const context = useContext(CommentEditorContext)
  return context
}

export const CommentEditorProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [activeEditor, setActiveEditor] = useState<Editor | null>(null)
  const [fallbackEditor, setFallbackEditor] = useState<Editor | null>(null)

  const getCurrentEditor = () => activeEditor || fallbackEditor

  return (
    <CommentEditorContext.Provider
      value={{
        activeEditor,
        setActiveEditor,
        fallbackEditor,
        setFallbackEditor,
        getCurrentEditor,
      }}
    >
      {children}
    </CommentEditorContext.Provider>
  )
}
