import { useApolloClient } from '@apollo/react-hooks'
import differenceInDays from 'date-fns/differenceInDays'
import parseISO from 'date-fns/parseISO'
import { useContext, useEffect, useRef } from 'react'

import { useRoute, ViewerContext } from '~/components'

export const ClientUpdater = () => {
  const { router, isInPath, setQuery } = useRoute()
  const client = useApolloClient()
  const viewer = useContext(ViewerContext)

  /**
   * Update routeHistory
   */
  const routeHistoryRef = useRef<string[]>([])
  const routeChangeComplete = (
    url: string,
    { shallow }: { shallow: boolean }
  ) => {
    if (!client?.writeData || shallow) {
      // skip shallow route change
      return
    }

    const newRouteHistory = [...routeHistoryRef.current, url]
    routeHistoryRef.current = newRouteHistory

    client.writeData({
      id: 'ClientPreference:local',
      data: { routeHistory: newRouteHistory },
    })
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', routeChangeComplete)
    return () => router.events.off('routeChangeComplete', routeChangeComplete)
  }, [])

  /**
   * Change specific new user's home feed.
   */
  const changeNewUserHomeFeedSortBy = (createdAt: Date | string | number) => {
    if (typeof createdAt === 'string') {
      createdAt = parseISO(createdAt)
    }

    if (differenceInDays(new Date(), createdAt) > 7) {
      return
    }

    setQuery('type', 'icymi')
  }

  useEffect(() => {
    const viewerCreatedAt = viewer?.info.createdAt
    const isHome = isInPath('HOME')

    if (!viewerCreatedAt || !isHome) {
      return
    }

    changeNewUserHomeFeedSortBy(viewerCreatedAt)
  }, [viewer.id])

  return null
}
