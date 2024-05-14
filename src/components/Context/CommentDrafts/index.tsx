import { createContext, ReactNode, useState } from 'react'

type Drafts = {
  [key: string]: any
}

export const CommentDraftsContext = createContext(
  {} as {
    drafts: Drafts
    getDraft: (key: string) => string
    updateDraft: (key: string, content: string) => void
    removeDraft: (key: string) => void
  }
)

export const CommentDraftsProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  // const intl = useIntl()
  const [drafts] = useState<Drafts>({})
  const updateDraft = (key: string, content: string) => {
    drafts[key] = content
  }

  const getDraft = (key: string) => {
    return drafts[key]
  }

  const removeDraft = (key: string) => {
    delete drafts[key]
  }

  return (
    <CommentDraftsContext.Provider
      value={{ drafts, getDraft, updateDraft, removeDraft }}
    >
      {children}
    </CommentDraftsContext.Provider>
  )
}
