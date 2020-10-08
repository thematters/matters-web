import { useQuery } from '@apollo/react-hooks'
import differenceInDays from 'date-fns/differenceInDays'
import parseISO from 'date-fns/parseISO'
import { Router } from 'next/router'
import { useEffect, useRef } from 'react'

import { useEventListener, useWindowResize } from '~/components'
import CLIENT_INFO from '~/components/GQL/queries/clientInfo'

import {
  CHANGE_NEW_USER_HOME_FEED_SORT_BY,
  STORE_KEY_VIEW_MODE,
} from '~/common/enums'

import { ClientInfo } from '~/components/GQL/queries/__generated__/ClientInfo'

export const ClientUpdater = () => {
  /**
   * Update viewportSize
   */
  const { client } = useQuery<ClientInfo>(CLIENT_INFO, {
    variables: { id: 'local' },
  })
  const [width, height] = useWindowResize()

  useEffect(() => {
    if (!client?.writeData || !width || !height) {
      return
    }

    client.writeData({
      id: `ClientInfo:local`,
      data: {
        viewportSize: {
          width,
          height,
          __typename: 'ViewportSize',
        },
      },
    })
  })

  /**
   * Update routeHistory
   */
  const routeHistoryRef = useRef<string[]>([])
  const routeChangeComplete = (url: string) => {
    if (!client?.writeData) {
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
    Router.events.on('routeChangeComplete', routeChangeComplete)
    return () => Router.events.off('routeChangeComplete', routeChangeComplete)
  }, [])

  /**
   * Restore View Mode from localStorage
   */
  useEffect(() => {
    const storedViewMode = localStorage.getItem(STORE_KEY_VIEW_MODE)

    if (!client?.writeData || !storedViewMode) {
      return
    }

    client.writeData({
      id: 'ClientPreference:local',
      data: { viewMode: storedViewMode },
    })
  }, [])

  /**
   * Change specific new user's home feed.
   */
  const changeNewUserHomeFeedSortBy = ({
    createdAt,
  }: {
    createdAt: Date | string | number | null
  }) => {
    if (!createdAt) {
      return
    }

    if (typeof createdAt === 'string') {
      createdAt = parseISO(createdAt)
    }

    if (differenceInDays(new Date(), createdAt) > 7) {
      return
    }

    client.writeData({
      id: 'ClientPreference:local',
      data: { feedSortType: 'icymi' },
    })
  }

  useEventListener(
    CHANGE_NEW_USER_HOME_FEED_SORT_BY,
    changeNewUserHomeFeedSortBy
  )

  return null
}
