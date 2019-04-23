import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { CachePersistor } from 'apollo-cache-persist'
import getConfig from 'next/config'

import introspectionQueryResultData from '~/common/gql/fragmentTypes.json'

const {
  publicRuntimeConfig: { ENV }
} = getConfig()
const isProd = ENV === 'production'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const APP_VERSION = process.env.app_version || '__UNVERSIONING__'
const APP_VERSION_KEY = 'app-version'

export const inMemoryCache = new InMemoryCache({ fragmentMatcher })

export const persistor = process.browser
  ? new CachePersistor({
      cache: inMemoryCache,
      storage: window.localStorage as any,
      debug: !isProd
    })
  : null

export const clearPersistCache = async () => {
  if (!persistor || !process.browser) {
    return
  }

  try {
    persistor.pause()
    await persistor.purge()
    console.log(`[apollo-cache-persist] purge`)

    // ref: https://github.com/apollographql/apollo-cache-persist/issues/34#issuecomment-371177206
    // need to reload page to clear in memory cache
    // persistor.resume()
  } catch (error) {
    console.error('Failed to clearPersistCache', error)
  }
}

export const setupPersistCache = async () => {
  if (!persistor || !process.browser) {
    return
  }

  try {
    /**
     * Restore or purge cache from localStorage based on version from `package.json`
     *
     * @see {@url https://github.com/apollographql/apollo-cache-persist#ive-had-a-breaking-schema-change-how-do-i-migrate-or-purge-my-cache}
     */

    // Read the current app version from LocalStorage.
    const currentVersion = await window.localStorage.getItem(APP_VERSION_KEY)

    if (currentVersion === APP_VERSION) {
      console.log(
        `[apollo-cache-persist] current app version is ${currentVersion}, restore`
      )
      await persistor.restore()
    } else {
      console.log(
        `[apollo-cache-persist] ${currentVersion} is outdated (latest ${APP_VERSION}), purge`
      )
      await persistor.purge()
      await window.localStorage.setItem(APP_VERSION_KEY, APP_VERSION)
    }
  } catch (error) {
    console.error('Failed to setupPersistCache', error)
  }
}
