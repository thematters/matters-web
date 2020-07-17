import ApolloClient from 'apollo-client'
import { useContext, useEffect } from 'react'

import { initializePush } from '~/common/utils'

import { ViewerContext } from '../Context'

const PushInitializer = ({ client }: { client: ApolloClient<any> }) => {
  const viewer = useContext(ViewerContext)

  useEffect(() => {
    if (viewer.privateFetched) {
      initializePush({ client, viewer })
    }
  }, [viewer.privateFetched])

  return null
}

export default PushInitializer
