import * as firebase from 'firebase/app'
import 'firebase/messaging'
import getConfig from 'next/config'

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

  // @ts-ignore
  window.messaging = messaging

  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(async () => {
    // unsubscribe with invalidated token
    await unsubscribePush()

    // then subscribe with new token
    await subscribePush()
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
    throw e
  }
}

const requestPermission = async () => {
  const permission = await Notification.requestPermission()

  if (permission === 'granted') {
    console.log('[Push] Notification permission granted.')
    // Retrieve an Instance ID token for use with FCM.
    //
  } else {
    console.log('[Push] Unable to get permission to notify.')
  }
}

export const subscribePush = async () => {
  try {
    // Request token
    await requestPermission()
    const token = await getToken()
    console.log(token)
    // Send to server
  } catch (e) {
    throw e
  }
}

export const unsubscribePush = async () => {
  try {
    // Get token
    // Delete token from FCM
    // Delete token from server
    // Delete token in local
    // Update loading state
  } catch (e) {
    throw e
  }
}
