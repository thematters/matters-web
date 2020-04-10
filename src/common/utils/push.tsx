import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import getConfig from 'next/config';

import { Translate, Viewer } from '~/components';

import { ADD_TOAST, STORE_KEY_PUSH } from '~/common/enums';

import { ToggleSubscribePush } from './__generated__/ToggleSubscribePush';

const {
  publicRuntimeConfig: { FIREBASE_CONFIG, FCM_VAPID_KEY },
} = getConfig();

const TOGGLE_SUBSCRIBE_PUSH = gql`
  mutation ToggleSubscribePush($id: ID!, $enabled: Boolean!) {
    toggleSubscribePush(input: { id: $id, enabled: $enabled }) {
      id
    }
  }
`;

let cachedClient: ApolloClient<any> | null = null;

export const initializePush = async ({
  client,
  viewer,
}: {
  client: ApolloClient<any>;
  viewer: Viewer;
}) => {
  const firebase = await import('firebase/app');
  await import('firebase/messaging');

  cachedClient = client;

  /**
   * Init Firebase
   */
  // FIXME: https://github.com/zeit/next.js/issues/1999
  if (firebase.apps.length || !process.browser) {
    return;
  }

  if (firebase.messaging.isSupported()) {
    client.writeData({
      id: 'ClientPreference:local',
      data: {
        push: {
          supported: true,
          __typename: 'Push',
        },
      },
    });
  } else {
    return;
  }

  // Init Firebase App
  firebase.initializeApp(FIREBASE_CONFIG);

  // Init FCM
  const messaging = firebase.messaging();
  messaging.usePublicVapidKey(FCM_VAPID_KEY);

  // Register our custom path service worker
  const registration = await window.navigator.serviceWorker.register(
    '/service-worker.js'
  );
  console.log('[Push] SW registered: ', registration);
  messaging.useServiceWorker(registration);

  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.setBackgroundMessageHandler` handler.
  messaging.onMessage((payload) => {
    console.log('[Push] Message received. ', payload);
    // ...
  });

  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(async () => {
    await unsubscribePush();
    await subscribePush({ silent: true });
  });

  /**
   * Init push setting in local
   */
  const push = JSON.parse(localStorage.getItem(STORE_KEY_PUSH) || '{}');
  const isViewerPush = viewer.id === push.userId;
  const isNotificationGranted = Notification.permission === 'granted';

  if (!viewer.id || !isNotificationGranted) {
    return;
  }

  if (!isViewerPush) {
    const token = await getToken();
    await unsubscribePushLocally(token);
  }

  client.writeData({
    id: 'ClientPreference:local',
    data: {
      push: {
        enabled: (isViewerPush && push.enabled) || false,
        __typename: 'Push',
      },
    },
  });
};

export const subscribePush = async (options?: { silent?: boolean }) => {
  const { silent } = options || { silent: false };

  // Request token
  if (!silent) {
    await requestPermission();
  }

  let token;
  try {
    token = await getToken();
  } catch (e) {
    if (!silent) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant="操作失敗，請檢查網路連線"
                zh_hans="操作失败，请检查网路连线"
              />
            ),
          },
        })
      );
    }
  }

  try {
    if (!cachedClient) {
      throw new Error('[Push] `cachedClient` is required');
    }

    // Send to server
    const { data } = await cachedClient.mutate<ToggleSubscribePush>({
      mutation: TOGGLE_SUBSCRIBE_PUSH,
      variables: { id: token, enabled: true },
    });

    // Update local state
    cachedClient.writeData({
      id: 'ClientPreference:local',
      data: {
        push: {
          enabled: true,
          __typename: 'Push',
        },
      },
    });
    localStorage.setItem(
      STORE_KEY_PUSH,
      JSON.stringify({
        userId: data?.toggleSubscribePush?.id,
        enabled: true,
        token,
      })
    );

    if (!silent) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: <Translate zh_hant="推送已開啓" zh_hans="推送已开启" />,
          },
        })
      );
    }
  } catch (e) {
    if (!silent) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant="開啓失敗，請稍候重試"
                zh_hans="开启失败，请稍候重试"
              />
            ),
          },
        })
      );
      console.error('[Push] Failed to subscribe push');
    }
  }

  console.log('[Push] Subscribed');
};

export const unsubscribePush = async (options?: { silent?: boolean }) => {
  const { silent } = options || { silent: false };
  const token = await getToken();

  // Delete token in local
  try {
    await unsubscribePushLocally(token);
  } catch (e) {
    console.error('[Push] Failed to deleteToken in local');

    if (!silent) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: (
              <Translate
                zh_hant="關閉失敗，請稍候重試"
                zh_hans="关闭失败，请稍候重试"
              />
            ),
          },
        })
      );
    }

    throw new Error('[Push] Failed to unsubscribe push');
  }

  // Update local state
  if (cachedClient) {
    cachedClient.writeData({
      id: 'ClientPreference:local',
      data: {
        push: {
          enabled: false,
          __typename: 'Push',
        },
      },
    });
  }

  // Delete token from server
  if (cachedClient) {
    await cachedClient.mutate<ToggleSubscribePush>({
      mutation: TOGGLE_SUBSCRIBE_PUSH,
      variables: { id: token, enabled: false },
    });
  }

  console.log('[Push] Unsubscribed');
};

const unsubscribePushLocally = async (token?: string) => {
  const firebase = await import('firebase/app');
  const messaging = firebase.messaging();

  if (token) {
    await messaging.deleteToken(token);
  }

  localStorage.removeItem(STORE_KEY_PUSH);

  return token;
};

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const getToken = async () => {
  const firebase = await import('firebase/app');
  const messaging = firebase.messaging();

  try {
    const token = await messaging.getToken();
    if (token) {
      console.log('[Push] Token: ', token);
      return token;
    } else {
      console.log(
        '[Push] No Instance ID token available. Request permission to generate one.'
      );
    }
  } catch (e) {
    console.error('[Push] An error occurred while retrieving token. ', e);
    throw e;
  }
};

const requestPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    console.log('[Push] Notification permission granted.');
  } else {
    console.log('[Push] Unable to get permission to notify.');
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
    );
    throw new Error('[Push] Need to grant permission');
  }
};
