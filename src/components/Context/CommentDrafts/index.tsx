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
    const confirmLeave = () => {
      if (window.confirm('Confirm to leave?')) {
        return true
      }
      router.events.emit('routeChangeError')
      throw 'cancel route change'
    }

    const handleRouteChange = () => {
      const fn = async (index: number) => {
        if (index >= drafts.length) {
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
          confirmLeave()
        }
        fn(index + 1)
      }
      return fn(0)
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
