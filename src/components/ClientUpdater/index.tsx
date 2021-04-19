import { useApolloClient } from '@apollo/client'
import differenceInDays from 'date-fns/differenceInDays'
import parseISO from 'date-fns/parseISO'
import { Router } from 'next/router'
import { useContext, useEffect, useRef } from 'react'

import { useEventListener, useWindowResize, ViewerContext } from '~/components'
import CLIENT_INFO from '~/components/GQL/queries/clientInfo'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import {
  ONBOARDING_TASKS_HIDE,
  STORAGE_KEY_ONBOARDING_TASKS,
} from '~/common/enums'
import { storage } from '~/common/utils'

export const ClientUpdater = () => {
  const client = useApolloClient()
  const viewer = useContext(ViewerContext)

  /**
   * Update viewportSize
   */
  const [width, height] = useWindowResize()

  useEffect(() => {
    if (!width || !height) {
      return
    }

    client.writeQuery({
      query: CLIENT_INFO,
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
    if (!client?.writeQuery) {
      return
    }

    const newRouteHistory = [...routeHistoryRef.current, url]
    routeHistoryRef.current = newRouteHistory

    client.writeQuery({
      query: CLIENT_PREFERENCE,
      id: 'ClientPreference:local',
      data: { routeHistory: newRouteHistory },
    })
  }

  useEffect(() => {
    Router.events.on('routeChangeComplete', routeChangeComplete)
    return () => Router.events.off('routeChangeComplete', routeChangeComplete)
  }, [])

  /**
   * Onboarding Tasks
   */
  useEffect(() => {
    if (!viewer.id) {
      return
    }

    let storedOnboardingTasks = storage.get(STORAGE_KEY_ONBOARDING_TASKS)
    const isSameViewer = storedOnboardingTasks?.viewerId === viewer.id

    // Store init tasks state into local storage
    if (!storedOnboardingTasks || !isSameViewer) {
      storedOnboardingTasks = {
        // mark `enabled` as `false` if viewer has finished all tasks.
        enabled: !viewer.onboardingTasks.finished,
      }
      storage.set(STORAGE_KEY_ONBOARDING_TASKS, {
        ...storedOnboardingTasks,
        viewerId: viewer.id,
      })
    }

    client.writeQuery({
      query: CLIENT_PREFERENCE,
      id: 'ClientPreference:local',
      data: {
        onboardingTasks: {
          __typename: 'OnboardingTasks',
          ...storedOnboardingTasks,
        },
      },
    })
  }, [viewer.id])

  // hide tasks
  useEventListener(ONBOARDING_TASKS_HIDE, () => {
    const storedOnboardingTasks = storage.get(STORAGE_KEY_ONBOARDING_TASKS)

    storage.set(STORAGE_KEY_ONBOARDING_TASKS, {
      ...storedOnboardingTasks,
      enabled: false,
    })

    client.writeQuery({
      query: CLIENT_PREFERENCE,
      id: 'ClientPreference:local',
      data: {
        onboardingTasks: { __typename: 'OnboardingTasks', enabled: false },
      },
    })
  })

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

    client.writeQuery({
      query: CLIENT_PREFERENCE,
      id: 'ClientPreference:local',
      data: { feedSortType: 'icymi' },
    })
  }

  useEffect(() => {
    const viewerCreatedAt = viewer?.info.createdAt

    if (!viewerCreatedAt) {
      return
    }

    changeNewUserHomeFeedSortBy(viewerCreatedAt)
  }, [viewer.id])

  return null
}
