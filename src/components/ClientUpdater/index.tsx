import { useApolloClient } from '@apollo/react-hooks'
import differenceInDays from 'date-fns/differenceInDays'
import parseISO from 'date-fns/parseISO'
import { useContext, useEffect, useRef } from 'react'

import {
  ONBOARDING_TASKS_HIDE,
  STORAGE_KEY_ONBOARDING_TASKS,
} from '~/common/enums'
import { storage } from '~/common/utils'
import { useEventListener, useRoute, ViewerContext } from '~/components'

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
