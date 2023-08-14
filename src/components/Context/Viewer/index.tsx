import gql from 'graphql-tag'
import React from 'react'

import {
  ViewerUserPrivateFragment,
  ViewerUserPublicFragment,
} from '~/gql/graphql'

export type ViewerUser = ViewerUserPublicFragment & ViewerUserPrivateFragment

const ViewerFragments = {
  user: {
    public: gql`
      fragment ViewerUserPublic on User {
        id
        userName
        displayName
        avatar
        paymentPointer
        liker {
          likerId
          civicLiker
        }
        status {
          state
          unreadNoticeCount
          hasPaymentPassword
        }
        ownCircles {
          id
          name
        }
        info {
          createdAt
          description
          email
          agreeOn
          userNameEditable
          group
          badges {
            type
          }
          ethAddress
          cryptoWallet {
            id
            address
            hasNFTs
            # nfts { id }
          }
          isWalletAuth
        }
        settings {
          language
        }
        following {
          users(input: { first: 0 }) {
            totalCount
          }
          tags(input: { first: 0 }) {
            totalCount
          }
        }
        followers(input: { first: 0 }) {
          totalCount
        }
      }
    `,
    private: gql`
      fragment ViewerUserPrivate on User {
        id
        status {
          role
        }
        articles(input: { first: 0 }) {
          totalCount
        }
        settings {
          currency
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
  isInactive: boolean
  isCivicLiker: boolean
  shouldSetupLikerID: boolean
}

export const processViewer = (viewer: ViewerUser): Viewer => {
  // User state
  const isAuthed = !!viewer.id
  const state = viewer?.status?.state
  const isActive = state === 'active'
  const isBanned = state === 'banned'
  const isArchived = state === 'archived'
  const isFrozen = state === 'frozen'
  const isInactive = isAuthed && (isBanned || isFrozen || isArchived)
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
    isFrozen,
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
  viewer: ViewerUser
}) => {
  return (
    <ViewerContext.Provider value={processViewer(viewer)}>
      {children}
    </ViewerContext.Provider>
  )
}

ViewerProvider.fragments = ViewerFragments
