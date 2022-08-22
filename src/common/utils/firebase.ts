const FIREBASE_CONFIG = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  ? JSON.parse(
      Buffer.from(process.env.NEXT_PUBLIC_FIREBASE_CONFIG, 'base64').toString()
    )
  : {}

export const initializeFirebase = async () => {
  const firebase = await import('firebase/app')

  // FIXME: https://github.com/zeit/next.js/issues/1999
  if (firebase.apps.length || !process.browser) {
    return
  }

  firebase.initializeApp(FIREBASE_CONFIG)

  return firebase
}
