import ApolloClient from 'apollo-client'
import { useContext, useEffect } from 'react'

import { ViewerContext } from '~/components'

import { initializePush } from '~/common/utils'

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
