import gql from 'graphql-tag'
import React from 'react'

import { ViewerUser } from './__generated__/ViewerUser'

const ViewerFragments = {
  user: gql`
    fragment ViewerUser on User {
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
}

export type Viewer = ViewerUser & {
  isAuthed: boolean
  isActive: boolean
  isArchived: boolean
  isBanned: boolean
  isOnboarding: boolean
  isInactive: boolean
  isCivicLiker: boolean
  shouldSetupLikerID: boolean
  privateFetched: boolean
}

export const processViewer = (
  viewer: ViewerUser,
  privateFetched: boolean
): Viewer => {
  const isAuthed = !!viewer.id
  const state = viewer?.status?.state
  const isActive = state === 'active'
  const isBanned = state === 'banned'
  const isArchived = state === 'archived'
  const isOnboarding = state === 'onboarding'
  const isInactive = isAuthed && (isBanned || isArchived)
  const isCivicLiker = viewer.liker.civicLiker
  const shouldSetupLikerID = isAuthed && !viewer.liker.likerId

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
    isOnboarding,
    isInactive,
    isCivicLiker,
    shouldSetupLikerID,
    privateFetched,
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
  return (
    <ViewerContext.Provider value={processViewer(viewer, privateFetched)}>
      {children}
    </ViewerContext.Provider>
  )
}

ViewerProvider.fragments = ViewerFragments
