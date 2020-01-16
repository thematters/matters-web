import * as Sentry from '@sentry/browser'
import gql from 'graphql-tag'
import React from 'react'

import { ViewerUser } from './__generated__/ViewerUser'

export const ViewerFragments = {
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
        role
      }
      info {
        email
        agreeOn
        userNameEditable
      }
      settings {
        language
      }
    }
  `
}

export type Viewer = ViewerUser & {
  isAuthed: boolean
  isActive: boolean
  isArchived: boolean
  isBanned: boolean
  isFrozen: boolean
  isOnboarding: boolean
  isInactive: boolean
  isAdmin: boolean
  isCivicLiker: boolean
  shouldSetupLikerID: boolean
}

export const processViewer = (viewer: ViewerUser): Viewer => {
  const isAuthed = !!viewer.id
  const state = viewer?.status?.state
  const role = viewer?.status?.role
  const isActive = state === 'active'
  const isFrozen = state === 'frozen'
  const isBanned = state === 'banned'
  const isArchived = state === 'archived'
  const isOnboarding = state === 'onboarding'
  const isInactive = isAuthed && (isFrozen || isBanned || isArchived)
  const isAdmin = role === 'admin'
  const isCivicLiker = viewer.liker.civicLiker
  const shouldSetupLikerID = isAuthed && !viewer.liker.likerId

  // Add user info for Sentry
  Sentry.configureScope((scope: any) => {
    scope.setUser({
      id: viewer.id,
      role,
      language: viewer.settings.language
    })
    scope.setTag('source', 'web')
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
    isAdmin,
    isCivicLiker,
    shouldSetupLikerID
  }
}

export const ViewerContext = React.createContext({} as Viewer)

export const ViewerConsumer = ViewerContext.Consumer

export const ViewerProvider = ({
  children,
  viewer
}: {
  children: React.ReactNode
  viewer: ViewerUser
}) => {
  return (
    <ViewerContext.Provider value={processViewer(viewer)}>
      {children}
    </ViewerContext.Provider>
  )
}
