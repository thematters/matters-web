import { useQuery } from '@apollo/react-hooks'
import differenceInDays from 'date-fns/differenceInDays'
import parseISO from 'date-fns/parseISO'
import { Router } from 'next/router'
import { useEffect, useRef } from 'react'

import { useEventListener, useWindowResize } from '~/components'
import CLIENT_INFO from '~/components/GQL/queries/clientInfo'

import {
  CHANGE_NEW_USER_HOME_FEED_SORT_BY,
  STORAGE_KEY_ONBOARDING_TASKS,
  STORAGE_KEY_VIEW_MODE,
} from '~/common/enums'
import { storage } from '~/common/utils'

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
   * Restore client preference from localStorage
   */
  useEffect(() => {
    const storedViewMode = storage.get(STORAGE_KEY_VIEW_MODE)
    const storedOnboardingTasks = storage.get(STORAGE_KEY_ONBOARDING_TASKS)

    if (!client?.writeData) {
      return
    }

    if (storedViewMode) {
      client.writeData({
        id: 'ClientPreference:local',
        data: { viewMode: storedViewMode },
      })
    }

    if (typeof storedOnboardingTasks === 'boolean') {
      client.writeData({
        id: 'ClientPreference:local',
        data: { onboardingTasks: storedOnboardingTasks },
      })
    }
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
