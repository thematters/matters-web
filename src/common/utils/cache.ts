import { CachePersistor } from 'apollo-cache-persist'

const isProd = process.env.NODE_ENV === 'production'

const APP_VERSION = process.env.APP_VERSION || '__UNVERSIONING__'
const APP_VERSION_KEY = 'app-version'

let persistor: any = null

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

export const setupPersistCache = async (inMemoryCache: any) => {
  if (!process.browser) {
    return
  }

  persistor = new CachePersistor({
    cache: inMemoryCache,
    storage: window.localStorage as any,
    debug: !isProd,
  })

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
