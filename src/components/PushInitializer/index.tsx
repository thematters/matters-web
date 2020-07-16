import { ApolloClient } from '@apollo/client'
import { useContext, useEffect } from 'react'

import { initializePush } from '~/common/utils'

import { ViewerContext } from '../Context'

const PushInitializer = ({ client }: { client: ApolloClient<any> }) => {
  const viewer = useContext(ViewerContext)

  useEffect(() => {
    initializePush({ client, viewer })
  }, [])

  return null
}

export default PushInitializer
