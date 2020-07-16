import { useQuery } from '@apollo/client'
import { Router } from 'next/router'
import { useEffect, useRef } from 'react'

import { useWindowResize } from '~/components'
import CLIENT_INFO from '~/components/GQL/queries/clientInfo'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

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
    if (!client?.writeQuery || !width || !height) {
      return
    }

    client.writeQuery({
      query: CLIENT_PREFERENCE,
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
    if (!client?.writeQuery) {
      return
    }

    const newRouteHistory = [...routeHistoryRef.current, url]
    routeHistoryRef.current = newRouteHistory

    client.writeQuery({
      query: CLIENT_PREFERENCE,
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

    if (!client?.writeQuery || !storedViewMode) {
      return
    }

    client.writeQuery({
      query: CLIENT_PREFERENCE,
      data: { viewMode: storedViewMode },
    })
  }, [])

  return null
}
