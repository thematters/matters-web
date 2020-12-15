import { useApolloClient } from '@apollo/react-hooks'
import differenceInDays from 'date-fns/differenceInDays'
import parseISO from 'date-fns/parseISO'
import { Router } from 'next/router'
import { useContext, useEffect, useRef } from 'react'

import { useEventListener, useWindowResize, ViewerContext } from '~/components'

import {
  ONBOARDING_TASKS_HIDE,
  STORAGE_KEY_ONBOARDING_TASKS,
  STORAGE_KEY_VIEW_MODE,
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
   * View Mode
   */
  useEffect(() => {
    const storedViewMode = storage.get(STORAGE_KEY_VIEW_MODE)

    if (!storedViewMode) {
      return
    }

    client.writeData({
      id: 'ClientPreference:local',
      data: {
        viewMode: storedViewMode,
      },
    })
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

    client.writeData({
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

    client.writeData({
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

    client.writeData({
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
