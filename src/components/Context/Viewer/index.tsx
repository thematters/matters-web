import gql from 'graphql-tag'
import React from 'react'

import { ClientPreference_clientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
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
    shown: boolean
    finished: boolean
    hasLikerId: boolean
    hasFollowingTag: boolean
    hasArticle: boolean
    hasFollowee: boolean
    hasCommentPremission: boolean
  }
}

export const processViewer = (
  viewer: ViewerUser,
  privateFetched: boolean,
  clientPreference?: ClientPreference_clientPreference
): Viewer => {
  // States
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
  const hasFollowingTag =
    (viewer?.recommendation?.followingTags.totalCount || 0) >= 5
  const hasArticle = (viewer?.articles?.totalCount || 0) >= 1
  const hasFollowee = (viewer?.followees?.totalCount || 0) >= 5
  const hasCommentPremission = isAuthed && !isOnboarding
  const isOnboardingTasksFinished =
    hasLikerId &&
    hasFollowingTag &&
    hasArticle &&
    hasFollowee &&
    hasCommentPremission

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
      shown: !!(
        isAuthed &&
        clientPreference?.onboardingTasks &&
        !isOnboardingTasksFinished
      ),
      finished: isOnboardingTasksFinished,
      hasLikerId,
      hasFollowingTag,
      hasArticle,
      hasFollowee,
      hasCommentPremission,
    },
  }
}

export const ViewerContext = React.createContext({} as Viewer)

export const ViewerConsumer = ViewerContext.Consumer

export const ViewerProvider = ({
  children,
  viewer,
  privateFetched,
  clientPreference,
}: {
  children: React.ReactNode
  viewer: ViewerUser
  privateFetched: boolean
  clientPreference?: ClientPreference_clientPreference
}) => {
  return (
    <ViewerContext.Provider
      value={processViewer(viewer, privateFetched, clientPreference)}
    >
      {children}
    </ViewerContext.Provider>
  )
}

ViewerProvider.fragments = ViewerFragments
