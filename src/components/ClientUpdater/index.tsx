import { useQuery } from '@apollo/react-hooks'
import { Router } from 'next/router'
import { useEffect, useRef } from 'react'

import { useWindowResize } from '~/components'
import CLIENT_INFO from '~/components/GQL/queries/clientInfo'

import { STORE_KEY_VIEW_MODE } from '~/common/enums'

import { ClientInfo } from '~/components/GQL/queries/__generated__/ClientInfo'

export const ClientUpdater = () => {
  /**
   * Update viewportSize
   */
  const { client } = useQuery<ClientInfo>(CLIENT_INFO, {
    variables: { id: 'local' },
  })
  const [width, height] = useWindowResize()

  useEffect(() => {
    if (!client?.writeData || !width || !height) {
      return
    }

    client.writeData({
      id: `ClientInfo:local`,
      data: {
        viewportSize: {
          width,
          height,
          __typename: 'ViewportSize',
        },
      },
    })
  })

  /**
   * Update routeHistory
   */
  const routeHistoryRef = useRef<string[]>([])
  const routeChangeComplete = (url: string) => {
    if (!client?.writeData) {
      return
    }

    const newRouteHistory = [...routeHistoryRef.current, url]
    routeHistoryRef.current = newRouteHistory

    client.writeData({
      id: 'ClientPreference:local',
      data: { routeHistory: newRouteHistory },
    })
  }

  useEffect(() => {
    Router.events.on('routeChangeComplete', routeChangeComplete)
    return () => Router.events.off('routeChangeComplete', routeChangeComplete)
  }, [])

  /**
   * Restore View Mode from localStorage
   */
  useEffect(() => {
    const storedViewMode = localStorage.getItem(STORE_KEY_VIEW_MODE)

    if (!client?.writeData || !storedViewMode) {
      return
    }

    client.writeData({
      id: 'ClientPreference:local',
      data: { viewMode: storedViewMode },
    })
  }, [])

  return null
}
