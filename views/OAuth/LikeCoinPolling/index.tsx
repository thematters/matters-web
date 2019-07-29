import gql from 'graphql-tag'
import getConfig from 'next/config'
import { useState } from 'react'
import { Query, QueryResult } from 'react-apollo'

import { Button } from '~/components'

const {
  publicRuntimeConfig: { OAUTH_URL }
} = getConfig()

const VIEWER_LIKER_ID = gql`
  query ViewerLikerId {
    viewer {
      id
      likerId
    }
  }
`

const OAuthLikeCoinPolling = () => {
  const [polling, setPolling] = useState(false)

  return (
    <Query
      query={VIEWER_LIKER_ID}
      pollInterval={polling ? 1000 : undefined}
      errorPolicy="none"
      fetchPolicy="network-only"
      skip={!process.browser}
    >
      {({ data, loading }: QueryResult) => {
        const viewer = data && data.viewer
        const likerId = viewer && viewer.likerId

        return (
          <Button
            htmlType="button"
            bgColor="green"
            disabled={polling || likerId}
            onClick={() => {
              const url = `${OAUTH_URL}/likecoin`
              window.open(url, '_blank')
              setPolling(true)
            }}
          >
            {!polling && !likerId && <span>綁定 Liker ID</span>}
            {polling && !likerId && <span>請稍候</span>}
            {likerId && <span>你已綁定 LikeCoin 帳號：{likerId}</span>}
          </Button>
        )
      }}
    </Query>
  )
}

export default OAuthLikeCoinPolling
