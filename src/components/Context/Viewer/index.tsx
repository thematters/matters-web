import { useQuery } from '@apollo/client'
import * as Sentry from '@sentry/nextjs'
import gql from 'graphql-tag'
import React from 'react'

import {
  UserFeatureFlagType,
  ViewerUserPrivateFragment,
  ViewerUserPublicFragment,
} from '~/gql/graphql'

export type ViewerUser = ViewerUserPublicFragment & ViewerUserPrivateFragment

type ViewerFeatureFlags = {
  __typename?: string
  featureFlags: Array<{
    __typename?: string
    type: UserFeatureFlagType
  }>
}

type ViewerUserWithOptionalOss = ViewerUser & {
  oss?: ViewerFeatureFlags
}

type ViewerFeatureFlagsQuery = {
  viewer?: {
    id: string
    oss?: ViewerFeatureFlags
  } | null
}

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
        }
        followers(input: { first: 0 }) {
          totalCount
        }
      }
    `,
    private: gql`
      fragment ViewerUserPrivate on User {
        id
        info {
          socialAccounts {
            type
            userName
            email
          }
          emailVerified
        }
        status {
          role
          hasEmailLoginPassword
          changeEmailTimesLeft
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

export const VIEWER_FEATURE_FLAGS = gql`
  query ViewerFeatureFlags {
    viewer {
      id
      oss {
        featureFlags {
          type
        }
      }
    }
  }
`

export type Viewer = ViewerUserWithOptionalOss & {
  isAuthed: boolean
  isActive: boolean
  isArchived: boolean
  isBanned: boolean
  isFrozen: boolean
  isInactive: boolean
  isCivicLiker: boolean
  isCommunityWatch: boolean
  isAdmin: boolean
  shouldSetupLikerID: boolean
}

export const processViewer = (viewer: ViewerUserWithOptionalOss): Viewer => {
  // User state
  const isAuthed = !!viewer.id
  const state = viewer?.status?.state
  const isActive = state === 'active'
  const isBanned = state === 'banned'
  const isArchived = state === 'archived'
  const isFrozen = state === 'frozen'
  const isInactive = isAuthed && (isBanned || isFrozen || isArchived)
  const isCivicLiker = viewer.liker.civicLiker
  const isCommunityWatch = !!viewer.oss?.featureFlags.some(
    ({ type }) => type === UserFeatureFlagType.CommunityWatch
  )
  const isAdmin = viewer.status?.role === 'admin'
  const shouldSetupLikerID = isAuthed && !viewer.liker.likerId

  // Add user info for Sentry
  Sentry.getCurrentScope()
    .setUser({
      id: viewer.id,
      username: viewer.userName || undefined,
    })
    .setTags({
      source: 'web',
      language: viewer.settings.language,
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
    isCommunityWatch,
    isAdmin,
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
  viewer: ViewerUserWithOptionalOss
}) => {
  const shouldFetchFeatureFlags = !!viewer.id && !viewer.oss
  const { data } = useQuery<ViewerFeatureFlagsQuery>(VIEWER_FEATURE_FLAGS, {
    skip: !shouldFetchFeatureFlags,
    errorPolicy: 'ignore',
  })
  const viewerWithFeatureFlags = data?.viewer?.oss
    ? { ...viewer, oss: data.viewer.oss }
    : viewer

  return (
    <ViewerContext.Provider value={processViewer(viewerWithFeatureFlags)}>
      {children}
    </ViewerContext.Provider>
  )
}

ViewerProvider.fragments = ViewerFragments
