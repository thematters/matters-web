import ApolloClient from 'apollo-client'
import * as firebase from 'firebase/app'
import 'firebase/messaging'
import getConfig from 'next/config'

import { Translate } from '~/components'
import { SubscribePush } from '~/components/GQL/mutations/__generated__/SubscribePush'
import { UnsubscribePush } from '~/components/GQL/mutations/__generated__/UnsubscribePush'
import SUBSCRIBE_PUSH from '~/components/GQL/mutations/subscribePush'
import UNSUBSCRIBE_PUSH from '~/components/GQL/mutations/unsubscribePush'

import { ADD_TOAST, STORE_KEY_PUSH } from '~/common/enums'

const {
  publicRuntimeConfig: { ENV, FIREBASE_CONFIG, FCM_VAPID_KEY }
} = getConfig()

const URL_SW =
  ENV === 'production'
    ? '/firebase-messaging-sw-production.js'
    : '/firebase-messaging-sw-develop.js'

export const initializeFirebase = async () => {
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
  const registration = await window.navigator.serviceWorker.register(URL_SW)
  messaging.useServiceWorker(registration)

  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.setBackgroundMessageHandler` handler.
  // messaging.onMessage((payload) => {
  //   console.log('Message received. ', payload);
  //   // ...
  // });

  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(async () => {
    await unsubscribePush()
  })
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
    throw new Error('Need to grant permission')
  }
}

export const subscribePush = async ({
  client
}: {
  client: ApolloClient<any>
}) => {
  // Request token
  await requestPermission()
  const token = await getToken()

  try {
    // Send to server
    await client.mutate<SubscribePush>({
      mutation: SUBSCRIBE_PUSH,
      variables: { id: token }
    })

    // Update local state
    client.writeData({
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
    throw new Error('Failed to subscribe push')
  }
}

export const unsubscribePush = async ({
  client
}: {
  client?: ApolloClient<any>
} = {}) => {
  const messaging = firebase.messaging()

  const token = await getToken()

  // Delete token in local
  try {
    if (token) {
      await messaging.deleteToken(token)
    }
    localStorage.removeItem(STORE_KEY_PUSH)
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
    throw new Error('Failed to unsubscribe push')
  }

  // Update local state
  if (client) {
    client.writeData({
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
  if (client) {
    await client.mutate<UnsubscribePush>({
      mutation: UNSUBSCRIBE_PUSH,
      variables: { id: token }
    })
  }
}
