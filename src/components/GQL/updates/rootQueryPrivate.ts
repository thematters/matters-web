import { DataProxy } from 'apollo-cache'

import { RootQueryPrivateQuery } from '~/gql/graphql'

export const updateRootUser = ({
  cache,
  emailVerified,
  hasEmailLoginPassword,
}: {
  cache: DataProxy
  emailVerified?: boolean
  hasEmailLoginPassword?: boolean
}) => {
  // FIXME: circular dependencies
  const { ROOT_QUERY_PRIVATE } = require('~/components/Root/gql')

  const cacheData = cache.readQuery<RootQueryPrivateQuery>({
    query: ROOT_QUERY_PRIVATE,
  })

  if (!cacheData || !cacheData.viewer) {
    return
  }

  if (emailVerified !== undefined) {
    cacheData.viewer.info.emailVerified = emailVerified
  }

  if (hasEmailLoginPassword !== undefined && !!cacheData.viewer.status) {
    cacheData.viewer.status.hasEmailLoginPassword = hasEmailLoginPassword
  }

  cache.writeQuery({
    query: ROOT_QUERY_PRIVATE,
    data: cacheData,
  })
}
