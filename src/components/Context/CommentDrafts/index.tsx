import { createContext, ReactNode, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { useRoute } from '~/components/Hook'

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
  const intl = useIntl()
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

  const { router } = useRoute()

  const hint = intl.formatMessage({
    // FIXME: fix i18n
    defaultMessage:
      'Your have unsaved comments that will be lost if you leave the page.',
    id: 'LILxpV',
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

    const checkAllDraftsEmpty = () => {
      const keys = Object.keys(drafts)
      return keys.every((key) => isDraftEmpty(drafts[key]))
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (drafts.length === 0) {
        return
      }

      const allEmptyDraft = checkAllDraftsEmpty()
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

        const allEmptyDraft = checkAllDraftsEmpty()
        console.log({ allEmptyDraft, drafts })
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
    <CommentDraftsContext.Provider
      value={{ drafts, getDraft, updateDraft, removeDraft }}
    >
      {children}
    </CommentDraftsContext.Provider>
  )
}
