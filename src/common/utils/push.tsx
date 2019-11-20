import ApolloClient from 'apollo-client'
import * as firebase from 'firebase/app'
import 'firebase/messaging'
import gql from 'graphql-tag'
import getConfig from 'next/config'

import { Translate } from '~/components'
import { Viewer } from '~/components/Viewer'

import { ADD_TOAST } from '~/common/enums'

import { ToggleSubscribePush } from './__generated__/ToggleSubscribePush'

const STORE_KEY_PUSH = '__PUSH'

const {
  publicRuntimeConfig: { FIREBASE_CONFIG, FCM_VAPID_KEY }
} = getConfig()

const TOGGLE_SUBSCRIBE_PUSH = gql`
  mutation ToggleSubscribePush($id: ID!, $enabled: Boolean!) {
    toggleSubscribePush(input: { id: $id, enabled: $enabled }) {
      id
    }
  }
`

let cachedClient: ApolloClient<any> | null = null

export const initializePush = async ({
  client,
  viewer
}: {
  client: ApolloClient<any>
  viewer: Viewer
}) => {
  cachedClient = client

  /**
   * Init Firebase
   */
  // FIXME: https://github.com/zeit/next.js/issues/1999
  if (firebase.apps.length || !process.browser) {
    return
  }

  if (!firebase.messaging.isSupported()) {
    return
  }

  // Init Firebase App
  firebase.initializeApp(FIREBASE_CONFIG)

  // Init FCM
  const messaging = firebase.messaging()
  messaging.usePublicVapidKey(FCM_VAPID_KEY)

  // Register our custom path service worker
  const registration = await window.navigator.serviceWorker.register(
    '/service-worker.js'
  )
  console.log('[Push] SW registered: ', registration)
  messaging.useServiceWorker(registration)

  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.setBackgroundMessageHandler` handler.
  messaging.onMessage(payload => {
    console.log('[Push] Message received. ', payload)
    // ...
  })

  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(async () => {
    await unsubscribePush()
    await subscribePush()
  })

  /**
   * Init push setting in local
   */
  const push = JSON.parse(localStorage.getItem(STORE_KEY_PUSH) || '{}')
  const isViewerPush = viewer.id === push.userId
  const token = await getToken()

  if (!isViewerPush) {
    await unsubscribePushLocally(token)
  }

  client.writeData({
    id: 'ClientPreference:local',
    data: {
      push: {
        supported: firebase.messaging.isSupported(),
        enabled: (isViewerPush && push.enabled) || false,
        __typename: 'Push'
      }
    }
  })
}

export const subscribePush = async () => {
  // Request token
  await requestPermission()

  let token
  try {
    token = await getToken()
  } catch (e) {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: (
            <Translate
              zh_hant="操作失敗，請檢查網路連線"
              zh_hans="操作失败，请检查网路连线"
            />
          )
        }
      })
    )
  }

  try {
    if (!cachedClient) {
      throw new Error('[Push] `cachedClient` is required')
    }

    // Send to server
    const { data } = await cachedClient.mutate<ToggleSubscribePush>({
      mutation: TOGGLE_SUBSCRIBE_PUSH,
      variables: { id: token, enabled: true }
    })

    // Update local state
    cachedClient.writeData({
      id: 'ClientPreference:local',
      data: {
        push: {
          enabled: true,
          __typename: 'Push'
        }
      }
    })
    localStorage.setItem(
      STORE_KEY_PUSH,
      JSON.stringify({
        userId: data && data.toggleSubscribePush && data.toggleSubscribePush.id,
        enabled: true,
        token
      })
    )
  } catch (e) {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: (
            <Translate
              zh_hant="開啓失敗，請稍候重試"
              zh_hans="开启失败，请稍候重试"
            />
          )
        }
      })
    )
    throw new Error('[Push] Failed to subscribe push')
  }

  console.log('[Push] Subscribed')
}

export const unsubscribePush = async () => {
  const token = await getToken()

  // Delete token in local
  try {
    await unsubscribePushLocally(token)
  } catch (e) {
    console.error('[Push] Failed to deleteToken in local')
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: (
            <Translate
              zh_hant="關閉失敗，請稍候重試"
              zh_hans="关闭失败，请稍候重试"
            />
          )
        }
      })
    )
    throw new Error('[Push] Failed to unsubscribe push')
  }

  // Update local state
  if (cachedClient) {
    cachedClient.writeData({
      id: 'ClientPreference:local',
      data: {
        push: {
          enabled: false,
          __typename: 'Push'
        }
      }
    })
  }

  // Delete token from server
  if (cachedClient) {
    await cachedClient.mutate<ToggleSubscribePush>({
      mutation: TOGGLE_SUBSCRIBE_PUSH,
      variables: { id: token, enabled: false }
    })
  }

  console.log('[Push] Unsubscribed')
}

const unsubscribePushLocally = async (token?: string) => {
  const messaging = firebase.messaging()

  if (token) {
    await messaging.deleteToken(token)
  }

  localStorage.removeItem(STORE_KEY_PUSH)

  return token
}

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const getToken = async () => {
  const messaging = firebase.messaging()

  try {
    const token = await messaging.getToken()
    if (token) {
      console.log('[Push] Token: ', token)
      return token
    } else {
      console.log(
        '[Push] No Instance ID token available. Request permission to generate one.'
      )
    }
  } catch (e) {
    console.error('[Push] An error occurred while retrieving token. ', e)
    throw e
  }
}

const requestPermission = async () => {
  const permission = await Notification.requestPermission()

  if (permission === 'granted') {
    console.log('[Push] Notification permission granted.')
  } else {
    console.log('[Push] Unable to get permission to notify.')
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: (
            <Translate
              zh_hant="開啓失敗，請檢查你的瀏覽器通知設定"
              zh_hans="开启失败，请检查你的浏览器通知设定"
            />
          )
        }
      })
    )
    throw new Error('[Push] Need to grant permission')
  }
}
