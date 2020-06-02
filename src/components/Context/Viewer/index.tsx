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

export const AnonymousViewer = {
  id: '',
  userName: null,
  displayName: null,
  avatar: null,
  liker: {
    likerId: null,
    civicLiker: false,
    __typename: 'Liker',
  },
  status: null,
  info: {
    email: null,
    agreeOn: null,
    userNameEditable: false,
    group: 'a',
    __typename: 'UserInfo',
  },
  settings: {
    language: 'zh_hant',
    __typename: 'UserSettings',
  },
  followees: {
    totalCount: 0,
    __typename: 'UserConnection',
  },
  followers: {
    totalCount: 0,
    __typename: 'UserConnection',
  },
  __typename: 'User',
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
}

export const processViewer = (viewer: ViewerUser): Viewer => {
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
  }
}

export const ViewerContext = React.createContext({} as Viewer)

export const ViewerConsumer = ViewerContext.Consumer

export const ViewerProvider = ({
  children,
  viewer,
}: {
  children: React.ReactNode
  viewer: ViewerUser | null | undefined
}) => {
  return (
    <ViewerContext.Provider value={processViewer(viewer || AnonymousViewer)}>
      {children}
    </ViewerContext.Provider>
  )
}

ViewerProvider.fragments = ViewerFragments
