import { createUploadLink } from '@matters/apollo-upload-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import http from 'http'
import https from 'https'
import _get from 'lodash/get'
import withApollo from 'next-with-apollo'

import {
  AGENT_HASH_PREFIX,
  COOKIE_USER_GROUP,
  GQL_CONTEXT_PUBLIC_QUERY_KEY,
  STORAGE_KEY_AGENT_HASH,
  STORAGE_KEY_AUTH_TOKEN,
} from '~/common/enums'
import introspectionQueryResultData from '~/common/gql/fragmentTypes.json'
import { randomString } from '~/common/utils'

import { getCookie } from './cookie'
import resolvers from './resolvers'
import { storage } from './storage'
import typeDefs from './types'

// import { setupPersistCache } from './cache'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const isProd = process.env.NODE_ENV === 'production'
const isStaticBuild = process.env.NEXT_PUBLIC_BUILD_TYPE === 'static'

/**
 * Links
 */
const persistedQueryLink = createPersistedQueryLink({
  useGETForHashedQueries: true,
})

/**
 * Dynamic API endpoint based on hostname
 */
const httpLink = ({ host }: { host: string }) => {
  const isOAuthSite = process.env.NEXT_PUBLIC_OAUTH_SITE_DOMAIN === host

  const apiUrl = isOAuthSite
    ? process.env.NEXT_PUBLIC_OAUTH_API_URL
    : process.env.NEXT_PUBLIC_API_URL

  // toggle http for local dev
  const agent =
    (apiUrl || '').split(':')[0] === 'http'
      ? new http.Agent()
      : new https.Agent({
          rejectUnauthorized: isProd, // allow access to https:...matters.news in localhost
        })

  return createUploadLink({
    uri: apiUrl,
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

  if (process.env.NODE_ENV !== 'production') {
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

  // Get token from local storage if it's a static-build client
  if (typeof window !== 'undefined') {
    const token = storage.get(STORAGE_KEY_AUTH_TOKEN)
    if (token && isStaticBuild) {
      headers['x-access-token'] = token
    }
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
    const userGroup = getCookie(cookie, COOKIE_USER_GROUP)

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

  if (typeof window !== 'undefined') {
    const stored = storage.get(STORAGE_KEY_AGENT_HASH)
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

export default withApollo(({ ctx, headers, initialState }) => {
  const cache = new InMemoryCache({ fragmentMatcher })
  cache.restore(initialState || {})

  // setupPersistCache(cache)

  const host =
    ctx?.req?.headers.host ||
    (typeof window === 'undefined' ? '' : _get(window, 'location.host'))
  const cookie = headers?.cookie || (process.browser ? document.cookie : '')

  const client = new ApolloClient({
    link: ApolloLink.from([
      persistedQueryLink,
      errorLink,
      sentryLink,
      agentHashLink,
      authLink,
      userGroupLink({ cookie }),
      httpLink({ host }),
    ]),
    cache,
    resolvers,
    typeDefs,
  })

  return client
})
