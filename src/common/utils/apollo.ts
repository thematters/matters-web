import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/cache'
import { ApolloClient, ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import http from 'http'
import https from 'https'
import _get from 'lodash/get'
import type { IncomingHttpHeaders } from 'http'

import {
  AGENT_HASH_PREFIX,
  COOKIE_USER_GROUP,
  GQL_CONTEXT_PUBLIC_QUERY_KEY,
  STORAGE_KEY_AGENT_HASH,
} from '~/common/enums'
import introspectionQueryResultData from '~/common/gql/fragmentTypes.json'
import { randomString } from '~/common/utils'

import { getIsomorphicCookie } from './cookie'
import { resolvers } from './resolvers'
import { storage } from './storage'
import typeDefs from './types'
import { sha256 } from 'crypto-hash'

const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'
const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

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
const httpLink = ({ host, headers }: { host: string; headers: any }) => {
  let apiUrl = process.env.NEXT_PUBLIC_API_URL as string

  let hostname = new URL(apiUrl).hostname
  if (
    // hostname.endsWith(site_domain_tld) &&
    host.endsWith(site_domain_tld_old) // configured new tld but running on old tld
  ) {
    console.log('serving on different hostname:', {
      apiUrl,
      hostname,
      host,
      site_domain_tld,
      site_domain_tld_old,
    })
    apiUrl = apiUrl.replace(site_domain_tld, site_domain_tld_old)
    hostname = hostname.replace(site_domain_tld, site_domain_tld_old)
    console.log('updated hostname:', { apiUrl, hostname })
  }

  // toggle http for local dev
  const agent =
    (apiUrl || '').split(':')[0] === 'http'
      ? new http.Agent()
      : new https.Agent({
          rejectUnauthorized: isProd, // allow access to https:...matters... in localhost
        })

  return createUploadLink({
    uri: apiUrl,
    headers: {
      ...headers,
      host: hostname,
      'Apollo-Require-Preflight': 'true',
    },
    fetchOptions: {
      agent,
    },
  })
}

/**
 * Logging error message
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
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

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
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
 * Inject Sentry action id to a custom header
 */
const sentryLink = setContext((_, { headers }) => {
  const actionId = randomString()

  import('@sentry/browser').then((Sentry) => {
    Sentry.configureScope((scope: any) => {
      scope.setTag('action-id', actionId)
    })
  })

  return {
    headers: {
      ...headers,
      'x-sentry-action-id': actionId,
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

export const getApollo = (initialState?: {}, headers?: {}) => {
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

export const createApolloClient = (initialState?: {}, headers?: IncomingHttpHeaders) => {
  const possibleTypes = {}
  introspectionQueryResultData.__schema.types.forEach(supertype => {
    if (supertype.possibleTypes) {
      possibleTypes[supertype.name] = supertype.possibleTypes.map(subtype => subtype.name)
    }
  })

  const cache = new InMemoryCache({ possibleTypes })
    .restore(initialState || {})

  const host = headers?.host || (isClient ? _get(window, 'location.host') : '')
  const cookie = headers?.cookie || (isClient ? document.cookie : '')

  const client = new ApolloClient({
    ssrMode: isServer,
    link: ApolloLink.from([
      persistedQueryLink,
      errorLink,
      sentryLink,
      agentHashLink,
      authLink,
      userGroupLink({ cookie }),
      httpLink({ host, headers }),
    ]),
    cache,
    resolvers,
    typeDefs,
  })

  return client
}
