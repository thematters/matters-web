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
        MAT {
          total
        }
      }
      info {
        email
        agreeOn
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
}

export const processViewer = (viewer: ViewerUser): Viewer => {
  const isAuthed = !!viewer.id
  const state = _get(viewer, 'status.state')
  const isActive = state === 'active'
  const isFrozen = state === 'frozen'
  const isBanned = state === 'banned'
  const isArchived = state === 'archived'
  const isOnboarding = state === 'onboarding'
  const isInactive = isAuthed && (isFrozen || isBanned || isArchived)

  return {
    ...viewer,
    isAuthed,
    isActive,
    isBanned,
    isArchived,
    isFrozen,
    isOnboarding,
    isInactive
  }
}

export const ViewerContext = React.createContext({} as Viewer)
