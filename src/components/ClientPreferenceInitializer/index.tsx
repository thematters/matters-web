import * as firebase from 'firebase/app'
import { useEffect } from 'react'
import { useQuery } from 'react-apollo'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import { STORE_KEY_PUSH } from '~/common/enums'

const ClientPreferenceInitializer = () => {
  const { client } = useQuery<ClientPreference>(CLIENT_PREFERENCE)

  useEffect(() => {
    if (client) {
      const push = JSON.parse(localStorage.getItem(STORE_KEY_PUSH) || '{}')

      client.writeData({
        id: 'ClientPreference:local',
        data: {
          push: {
            supported: firebase.messaging.isSupported(),
            enabled: push.enabled || false,
            __typename: 'Push'
          }
        }
      })
    }
  }, [])

  return null
}

export default ClientPreferenceInitializer
