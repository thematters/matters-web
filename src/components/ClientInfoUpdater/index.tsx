import { useQuery } from '@apollo/react-hooks'
import { useEffect } from 'react'

import { useWindowResize } from '~/components'
import CLIENT_INFO from '~/components/GQL/queries/clientInfo'

import { ClientInfo } from '~/components/GQL/queries/__generated__/ClientInfo'

export const ClientInfoUpdater = () => {
  const { client } = useQuery<ClientInfo>(CLIENT_INFO, {
    variables: { id: 'local' }
  })
  const [width, height] = useWindowResize()

  useEffect(() => {
    if (client?.writeData && width && height) {
      client.writeData({
        id: `ClientInfo:local`,
        data: {
          viewportSize: {
            width,
            height,
            __typename: 'ViewportSize'
          }
        }
      })
    }
  })

  return null
}
