import { ApolloClient, ApolloLink } from '@apollo/client'
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/cache'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import { RetryLink } from '@apollo/client/link/retry'
import { SentryLink } from 'apollo-link-sentry'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { sha256 } from 'crypto-hash'
import type { IncomingHttpHeaders } from 'http'
import _get from 'lodash/get'

import packageJson from '@/package.json'
import {
  AGENT_HASH_PREFIX,
  COOKIE_USER_GROUP,
  GQL_CONTEXT_PUBLIC_QUERY_KEY,
  STORAGE_KEY_AGENT_HASH,
} from '~/common/enums'
import introspectionQueryResultData from '~/common/gql/fragmentTypes.json'
import { mergeables } from '~/gql/mergeables'

import { getIsomorphicCookie } from './cookie'
import { resolvers } from './resolvers'
import { storage } from './storage'
import typeDefs from './types'

const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'

const isServer = typeof window === 'undefined'
const isClient = !isServer

/**
 * Links
 */
const persistedQueryLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true,
})

const site_domain_tld =
    process.env.NEXT_PUBLIC_SITE_DOMAIN_TLD || 'matters.town',
  site_domain_tld_old =
    process.env.NEXT_PUBLIC_SITE_DOMAIN_TLD_OLD || 'matters.news'

/**
 * Dynamic API endpoint based on hostname
 */
const uploadLink = ({
  host,
  headers,
  isPublicOperation,
}: {
  host: string
  headers?: IncomingHttpHeaders
  isPublicOperation: boolean
}) => {
  let apiUrl = process.env.NEXT_PUBLIC_API_URL as string

  let hostname = new URL(apiUrl).hostname
  if (
    // hostname.endsWith(site_domain_tld) &&
    host.endsWith(site_domain_tld_old) // configured new tld but running on old tld
  ) {
    apiUrl = apiUrl.replace(site_domain_tld, site_domain_tld_old)
    hostname = hostname.replace(site_domain_tld, site_domain_tld_old)
  }

  return createUploadLink({
    uri: apiUrl,
    headers: {
      ...(headers as Record<string, string>),
      ...(isPublicOperation ? {} : { cookie: headers?.cookie || '' }),
      host: hostname,
      'Apollo-Require-Preflight': 'true',
    },
  })
}

const directionalLink = ({
  host,
  headers,
}: {
  host: string
  headers?: IncomingHttpHeaders
}) =>
  new RetryLink().split(
    (operation) => operation.getContext()[GQL_CONTEXT_PUBLIC_QUERY_KEY],
    uploadLink({ host, headers, isPublicOperation: true }),
    uploadLink({ host, headers, isPublicOperation: false })
  )

/**
 * Logging error message
 */
const errorLink = onError(({ graphQLErrors, networkError, protocolErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, extensions, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${JSON.stringify(path)}, Code: ${
          extensions && extensions.code
        }`
      )
    )
  }

  if (protocolErrors) {
    protocolErrors.forEach(({ message, extensions }) => {
      console.log(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(extensions)}`
      )
    })
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    console.log(networkError.message)
    console.log(networkError.name)
    console.log(networkError.stack)
  }
})

/**
 * Determine whether the token should be included and where to retrieve from.
 */
const authLink = setContext((operation, { headers, ...restCtx }) => {
  // Determine whether it's a public or private query,
  // cookies won't be include if it's a public query.
  const operationName = operation.operationName || ''
  const operationVariables = operation.variables || {}
  const isPublicOperation = restCtx[GQL_CONTEXT_PUBLIC_QUERY_KEY]

  if (isLocal) {
    console.log(
      `%c[GraphQL operation]%c ${operationName} ` +
        `${isPublicOperation ? '' : '(w/ credentials)'}` +
        `%c Variables`,
      'background: #0d6763; color: #fff',
      '',
      'color: #fff68f',
      operationVariables
    )
  }

  return {
    fetchOptions: {
      credentials: isPublicOperation ? 'omit' : 'include',
    },
    credentials: isPublicOperation ? 'omit' : 'include',
    headers: {
      ...headers,
    },
  }
})

/**
 * Get user group from cookie,
 * HTTP cookie from SSR or `document.cookie` from CSR
 */
const userGroupLink = ({ cookie }: { cookie: string }) =>
  setContext((_, { headers }) => {
    const userGroup = getIsomorphicCookie(cookie, COOKIE_USER_GROUP)

    return {
      headers: {
        ...headers,
        ...(userGroup ? { 'x-user-group': userGroup } : {}),
      },
    }
  })

/**
 * Fingerprint only works on CSR
 */
const agentHashLink = setContext((_, { headers }) => {
  let hash: string | null = null

  if (isClient) {
    const stored = storage.get<string>(STORAGE_KEY_AGENT_HASH)
    if (stored && stored.startsWith(AGENT_HASH_PREFIX)) {
      hash = stored
    }
  }

  return {
    headers: {
      ...headers,
      ...(hash ? { 'x-user-agent-hash': hash } : {}),
    },
  }
})

/**
 * When the application runs on the client side, we need to make sure that
 * the Apollo client is a singleton to prevent it from reinitializing
 * between pages.
 */
let globalApolloClient: ApolloClient<NormalizedCacheObject>

export const getApollo = (
  initialState?: object,
  headers?: IncomingHttpHeaders
) => {
  // Ensure you create a new client for each server-side request to prevent
  // data sharing between connections.
  if (isServer) {
    return createApolloClient(initialState, headers)
  }

  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, headers)
  }
  return globalApolloClient
}

export const createApolloClient = (
  initialState?: object,
  headers?: IncomingHttpHeaders
) => {
  const cache = new InMemoryCache({
    possibleTypes: {
      ...introspectionQueryResultData,
      Mergeable: mergeables,
    },
    typePolicies: {
      Mergeable: { merge: true },
      // Define a fixed custom key for `Recommendation` and use cache redirects
      // to make sure when `viewer` refer to `User:VISITOR_ID` or `User:LOGGED_IN_ID`
      // it will always read `viewer.recommendation` from this cache key.
      // @see https://www.apollographql.com/docs/react/caching/cache-configuration#customizing-cache-ids
      // @see https://www.apollographql.com/docs/react/caching/advanced-topics#cache-redirects
      Recommendation: {
        keyFields: () => {
          return `Recommendation:visitor`
        },
      },
      User: {
        fields: {
          recommendation: {
            read(_, { toReference }) {
              return toReference({
                __typename: 'Recommendation',
                id: 'visitor',
              })
            },
          },
        },
      },
    },
  }).restore((initialState || {}) as NormalizedCacheObject)

  const host = headers?.host || (isClient ? _get(window, 'location.host') : '')
  const cookie = headers?.cookie || (isClient ? document.cookie : '')

  const client = new ApolloClient({
    name: packageJson.name,
    version: packageJson.version,
    ssrMode: isServer,
    link: ApolloLink.from([
      persistedQueryLink,
      errorLink,
      new SentryLink({
        uri: process.env.NEXT_PUBLIC_API_URL,
        shouldHandleOperation: (operation) => {
          const hasSensitiveOrLargeData = Object.keys(
            operation.variables.input || operation.variables || {}
          ).some((key) => /email|password|content|file/i.test(key))

          if (hasSensitiveOrLargeData) {
            return false
          }

          const isSensitiveOrLargeOperation =
            /(password|email|login|code|upload)/i.test(operation.operationName)

          if (isSensitiveOrLargeOperation) {
            return false
          }

          return true
        },
        attachBreadcrumbs: {
          includeQuery: true,
          includeVariables: false,
        },
      }),
      agentHashLink,
      authLink,
      userGroupLink({ cookie }),
      directionalLink({ host, headers }),
    ]),
    cache,
    resolvers,
    typeDefs,
  })

  return client
}
