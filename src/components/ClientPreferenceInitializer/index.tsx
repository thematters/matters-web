import * as firebase from 'firebase/app'
import { useEffect } from 'react'
import { useQuery } from 'react-apollo'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

const ClientPreferenceInitializer = () => {
  const { client } = useQuery<ClientPreference>(CLIENT_PREFERENCE)

  useEffect(() => {
    if (client) {
      client.writeData({
        id: 'ClientPreference:local',
        data: {
          push: {
            supported: firebase.messaging.isSupported(),
            enabled: false,
            __typename: 'Push'
          }
        }
      })
    }
  }, [])

  return null
}

export default ClientPreferenceInitializer
