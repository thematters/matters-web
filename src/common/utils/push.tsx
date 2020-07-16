import { ApolloClient, gql } from '@apollo/client'

import { Translate, Viewer } from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { ADD_TOAST, STORE_KEY_PUSH } from '~/common/enums'

import { ToggleSubscribePush } from './__generated__/ToggleSubscribePush'

const FIREBASE_CONFIG = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  ? JSON.parse(
      Buffer.from(process.env.NEXT_PUBLIC_FIREBASE_CONFIG, 'base64').toString()
    )
  : {}
const isProd = process.env.NODE_ENV === 'production'

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
  viewer,
}: {
  client: ApolloClient<any>
  viewer: Viewer
}) => {
  if (!isProd) {
    return
  }

  const firebase = await import('firebase/app')
  await import('firebase/messaging')

  cachedClient = client

  /**
   * Init Firebase
   */
  // FIXME: https://github.com/zeit/next.js/issues/1999
  if (firebase.apps.length || !process.browser) {
    return
  }

  if (firebase.messaging.isSupported()) {
    client.writeQuery({
      query: CLIENT_PREFERENCE,
      data: {
        push: {
          supported: true,
          __typename: 'Push',
        },
      },
    })
  } else {
    return
  }

  // Init Firebase App
  firebase.initializeApp(FIREBASE_CONFIG)

  // Init FCM
  const messaging = firebase.messaging()
  messaging.usePublicVapidKey(process.env.NEXT_PUBLIC_FCM_VAPID_KEY || '')

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
  messaging.onMessage((payload) => {
    console.log('[Push] Message received. ', payload)
    // ...
  })

  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(async () => {
    await unsubscribePush()
    await subscribePush({ silent: true })
  })

  /**
   * Init push setting in local
   */
  const push = JSON.parse(localStorage.getItem(STORE_KEY_PUSH) || '{}')
  const isViewerPush = viewer.id === push.userId
  const isNotificationGranted =
    window.Notification && Notification.permission === 'granted'

  if (!viewer.id || !isNotificationGranted) {
    return
  }

  if (!isViewerPush) {
    await unsubscribePush()
  }

  client.writeQuery({
    query: CLIENT_PREFERENCE,
    data: {
      push: {
        enabled: (isViewerPush && push.enabled) || false,
        __typename: 'Push',
      },
    },
  })
}

export const subscribePush = async (options?: { silent?: boolean }) => {
  const { silent } = options || { silent: false }

  // Request token
  if (!silent) {
    await requestPermission()
  }

  let token
  try {
    token = await getToken()
  } catch (e) {
    if (!silent) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant="開啓失敗，你的瀏覽器可能不支持推送通知"
                zh_hans="开启失败，你的瀏覽器可能不支持推送通知"
              />
            ),
          },
        })
      )
    }
  }

  if (!token) {
    return
  }

  if (!cachedClient) {
    throw new Error('[Push] `cachedClient` is required')
  }

  try {
    // Send to server
    const { data } = await cachedClient.mutate<ToggleSubscribePush>({
      mutation: TOGGLE_SUBSCRIBE_PUSH,
      variables: { id: token, enabled: true },
    })

    // Update local state
    cachedClient.writeQuery({
      query: CLIENT_PREFERENCE,
      data: {
        push: {
          enabled: true,
          __typename: 'Push',
        },
      },
    })
    localStorage.setItem(
      STORE_KEY_PUSH,
      JSON.stringify({
        userId: data?.toggleSubscribePush?.id,
        enabled: true,
        token,
      })
    )

    if (!silent) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: <Translate zh_hant="推送已開啓" zh_hans="推送已开启" />,
          },
        })
      )
    }
  } catch (e) {
    if (!silent) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant="開啓失敗，請檢查網路連線"
                zh_hans="开启失败，请检查网路连线"
              />
            ),
          },
        })
      )
      console.error('[Push] Failed to subscribe push', e)
    }
  }

  console.log('[Push] Subscribed')
}

export const unsubscribePush = async () => {
  const firebase = await import('firebase/app')
  const messaging = firebase.messaging()

  let token
  try {
    token = await getToken()
  } catch (e) {
    console.error('[Push] Failed to getToken', e)
  }

  // Unsubscribe from Firebase
  if (token) {
    try {
      await messaging.deleteToken(token)
    } catch (e) {
      console.error('[Push] Failed to deleteToken in local', e)
    }
  }

  // Update local state
  localStorage.removeItem(STORE_KEY_PUSH)

  if (!cachedClient) {
    return
  }

  cachedClient.writeQuery({
    query: CLIENT_PREFERENCE,
    data: {
      push: {
        enabled: false,
        __typename: 'Push',
      },
    },
  })

  // Unsubscribe from our server
  if (token) {
    try {
      await cachedClient.mutate<ToggleSubscribePush>({
        mutation: TOGGLE_SUBSCRIBE_PUSH,
        variables: { id: token, enabled: false },
      })
    } catch (e) {
      console.error('[Push] Failed to unsubscribe from server', e)
    }
  }

  console.log('[Push] Unsubscribed')
}

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const getToken = async () => {
  const firebase = await import('firebase/app')
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
          ),
        },
      })
    )
    throw new Error('[Push] Need to grant permission')
  }
}
