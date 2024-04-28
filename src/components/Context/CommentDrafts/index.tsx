import { useApolloClient } from '@apollo/react-hooks'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

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
  const intl = useIntl()
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

  const hint = intl.formatMessage({
    // FIXME: fix i18n
    defaultMessage: '評論尚未發布，確定放棄內容離開此頁嗎？',
    id: '3rqn2V',
  })

  useEffect(() => {
    const addEventListeners = () => {
      window.addEventListener('beforeunload', handleBeforeUnload)
      router.events.on('routeChangeStart', handleRouteChange)
    }

    const removeEventListeners = () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      router.events.off('routeChangeStart', handleRouteChange)
    }

    const navigateTo = (url: string) => {
      removeEventListeners()
      router.push(url)
    }

    const confirmNavigation = async (url: string) => {
      if (window.confirm(hint)) {
        navigateTo(url)
      } else {
        router.events.emit('routeChangeError')
      }
    }

    const isDraftEmpty = (content: string) => {
      return content === '' || content === '<p></p>'
    }

    const queryAllDrafts = async () => {
      return await Promise.all(
        drafts.map((draft) => {
          return client.query({
            query: COMMENT_DRAFT,
            variables: { id: draft },
          })
        })
      )
    }

    const checkAllDraftsEmpty = async () => {
      const datas = await queryAllDrafts()
      return datas.every(({ data }) => isDraftEmpty(data?.commentDraft.content))
    }

    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      if (drafts.length === 0) {
        return
      }

      const allEmptyDraft = await checkAllDraftsEmpty()
      if (!allEmptyDraft) {
        event.returnValue = hint
        return hint
      }
    }

    const handleRouteChange = (url: string) => {
      const processRouteChange = async () => {
        if (drafts.length === 0) {
          navigateTo(url)
          return
        }

        const allEmptyDraft = await checkAllDraftsEmpty()
        if (allEmptyDraft) {
          navigateTo(url)
        } else {
          confirmNavigation(url)
        }
      }

      processRouteChange()
      // Immediately throw an error to abort the route change process in synchronous function
      throw 'Abort route change. Please ignore this error.'
    }

    addEventListeners()

    return removeEventListeners
  }, [drafts])

  return (
    <CommentDraftsContext.Provider value={{ drafts, addDraft, removeDraft }}>
      {children}
    </CommentDraftsContext.Provider>
  )
}
