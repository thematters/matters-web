import * as Sentry from '@sentry/browser'
import { ApolloQueryResult } from 'apollo-client'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import React from 'react'

import { ViewerUser } from './__generated__/ViewerUser'

export const ViewerUserFragment = {
  user: gql`
    fragment ViewerUser on User {
      id
      userName
      displayName
      avatar
      status {
        state
        role
        MAT {
          total
        }
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
  refetch: () => Promise<ApolloQueryResult<any>>
}

export const processViewer = (
  viewer: ViewerUser & { refetch: () => Promise<ApolloQueryResult<any>> }
): Viewer => {
  const isAuthed = !!viewer.id
  const state = _get(viewer, 'status.state')
  const role = _get(viewer, 'status.role')
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
      language: _get(viewer, 'settings.language')
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
