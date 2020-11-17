import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'

import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import {
  ClientPreference,
  ClientPreference_clientPreference_onboardingTasks,
} from '~/components/GQL/queries/__generated__/ClientPreference'
import { ViewerUserPrivate } from './__generated__/ViewerUserPrivate'
import { ViewerUserPublic } from './__generated__/ViewerUserPublic'

export type ViewerUser = ViewerUserPublic & ViewerUserPrivate

const ViewerFragments = {
  user: {
    public: gql`
      fragment ViewerUserPublic on User {
        id
        userName
        displayName
        avatar
        liker {
          likerId
          civicLiker
        }
        status {
          state
          hasPaymentPassword
        }
        info {
          createdAt
          email
          agreeOn
          userNameEditable
          group
        }
        settings {
          language
        }
        followees(input: { first: 0 }) {
          totalCount
        }
        followers(input: { first: 0 }) {
          totalCount
        }
      }
    `,
    private: gql`
      fragment ViewerUserPrivate on User {
        id
        articles(input: { first: 0 }) {
          totalCount
        }
        recommendation {
          followingTags(input: { first: 0 }) {
            totalCount
          }
        }
      }
    `,
  },
}

export type Viewer = ViewerUser & {
  isAuthed: boolean
  isActive: boolean
  isArchived: boolean
  isBanned: boolean
  isFrozen: boolean
  isOnboarding: boolean
  isInactive: boolean
  isCivicLiker: boolean
  shouldSetupLikerID: boolean
  privateFetched: boolean
  onboardingTasks: {
    enabled: boolean
    finished: boolean
    tasks: {
      likerId: boolean
      followingTag: boolean
      article: boolean
      followee: boolean
      commentPermission: boolean
    }
  }
}

export const processViewer = (
  viewer: ViewerUser,
  privateFetched: boolean,
  onboardingTasks?: ClientPreference_clientPreference_onboardingTasks
): Viewer => {
  // User state
  const isAuthed = !!viewer.id
  const state = viewer?.status?.state
  const isActive = state === 'active'
  const isBanned = state === 'banned'
  const isArchived = state === 'archived'
  const isFrozen = state === 'frozen'
  const isOnboarding = state === 'onboarding'
  const isInactive = isAuthed && (isBanned || isFrozen || isArchived)
  const isCivicLiker = viewer.liker.civicLiker
  const shouldSetupLikerID = isAuthed && !viewer.liker.likerId

  // Onbooarding Tasks
  const hasLikerId = !!viewer.liker.likerId
  const hasFollowingTag = viewer?.recommendation?.followingTags.totalCount >= 5
  const hasArticle = viewer?.articles?.totalCount >= 1
  const hasFollowee = viewer?.followees?.totalCount >= 5
  const hasCommentPermission = isAuthed && !isOnboarding
  const isOnboardingTasksEnabled = !!(isAuthed && onboardingTasks?.enabled)
  const isOnboardingTasksFinished =
    hasLikerId &&
    hasFollowingTag &&
    hasArticle &&
    hasFollowee &&
    hasCommentPermission

  // Add user info for Sentry
  import('@sentry/browser').then((Sentry) => {
    Sentry.configureScope((scope: any) => {
      scope.setUser({
        id: viewer.id,
        language: viewer.settings.language,
      })
      scope.setTag('source', 'web')
    })
  })

  return {
    ...viewer,
    isAuthed,
    isActive,
    isBanned,
    isArchived,
    isFrozen,
    isOnboarding,
    isInactive,
    isCivicLiker,
    shouldSetupLikerID,
    privateFetched,
    onboardingTasks: {
      enabled: isOnboardingTasksEnabled,
      finished: isOnboardingTasksFinished,
      tasks: {
        likerId: hasLikerId,
        followingTag: hasFollowingTag,
        article: hasArticle,
        followee: hasFollowee,
        commentPermission: hasCommentPermission,
      },
    },
  }
}

export const ViewerContext = React.createContext({} as Viewer)

export const ViewerConsumer = ViewerContext.Consumer

export const ViewerProvider = ({
  children,
  viewer,
  privateFetched,
}: {
  children: React.ReactNode
  viewer: ViewerUser
  privateFetched: boolean
}) => {
  const { data } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const onboardingTasks = data?.clientPreference.onboardingTasks

  return (
    <ViewerContext.Provider
      value={processViewer(viewer, privateFetched, onboardingTasks)}
    >
      {children}
    </ViewerContext.Provider>
  )
}

ViewerProvider.fragments = ViewerFragments
