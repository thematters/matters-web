import { useApolloClient } from '@apollo/react-hooks'
import { createContext, ReactNode, useEffect, useState } from 'react'

import COMMENT_DRAFT from '~/components/GQL/queries/commentDraft'
import { useRoute } from '~/components/Hook'

type draft = string

export const CommentDraftsContext = createContext(
  {} as {
    drafts: draft[]
    addDraft: (draft: draft) => void
    removeDraft: (draft: draft) => void
  }
)

export const CommentDraftsProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [drafts] = useState<draft[]>([])
  const addDraft = (draft: draft) => {
    if (drafts.indexOf(draft) !== -1) {
      return
    }
    drafts.push(draft)
  }

  const removeDraft = (draft: draft) => {
    const index = drafts.indexOf(draft)
    if (index !== -1) {
      drafts.splice(index, 1)
    }
  }

  const { router } = useRoute()
  const client = useApolloClient()

  useEffect(() => {
    const confirm = (url: string) => {
      router.events.off('beforeHistoryChange', handleRouteChange)
      router.push(url)
    }

    const confirmLeave = (url: string) => {
      if (window.confirm('評論尚未發布，確定放棄內容離開此頁嗎？')) {
        confirm(url)
        return true
      }
      router.events.emit('routeChangeError')
    }

    const handleRouteChange = (url: string) => {
      const fn = async (index: number) => {
        if (index >= drafts.length) {
          confirm(url)
          return
        }

        const { data } = await client.query({
          query: COMMENT_DRAFT,
          variables: { id: drafts[index] },
        })

        console.log({ data })
        if (
          data?.commentDraft.content !== '' &&
          data?.commentDraft.content !== '<p></p>'
        ) {
          return confirmLeave(url)
        }
        fn(index + 1)
      }
      fn(0)
      throw 'Abort route change. Please ignore this error.'
    }

    router.events.on('beforeHistoryChange', handleRouteChange)

    return () => {
      router.events.off('beforeHistoryChange', handleRouteChange)
    }
  }, [])

  return (
    <CommentDraftsContext.Provider value={{ drafts, addDraft, removeDraft }}>
      {children}
    </CommentDraftsContext.Provider>
  )
}
