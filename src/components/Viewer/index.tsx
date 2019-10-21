import * as Sentry from '@sentry/browser'
import gql from 'graphql-tag'
import React from 'react'

import { ViewerUser } from './__generated__/ViewerUser'

export const ViewerUserFragment = {
  user: gql`
    fragment ViewerUser on User {
      id
      userName
      displayName
      avatar
      likerId
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
      status {
        state
      }
    }
  `
}

type Viewer = ViewerUser & {
  isAuthed: boolean
  isActive: boolean
  isArchived: boolean
  isBanned: boolean
  isFrozen: boolean
  isOnboarding: boolean
  isInactive: boolean
  isAdmin: boolean
}

export const processViewer = (viewer: ViewerUser): Viewer => {
  const isAuthed = !!viewer.id
  const state = viewer && viewer.status && viewer.status.state
  const role = viewer && viewer.status && viewer.status.role
  const isActive = state === 'active'
  const isFrozen = state === 'frozen'
  const isBanned = state === 'banned'
  const isArchived = state === 'archived'
  const isOnboarding = state === 'onboarding'
  const isInactive = isAuthed && (isFrozen || isBanned || isArchived)
  const isAdmin = role === 'admin'

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
    isAdmin
  }
}

export const ViewerContext = React.createContext({} as Viewer)
