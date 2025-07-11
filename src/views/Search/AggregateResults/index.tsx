import { useApolloClient } from '@apollo/client'
import { useEffect, useState } from 'react'

import { getSearchType } from '~/common/utils'
import { Layout, useRoute } from '~/components'

import Articles from './Articles'
import {
  SEARCH_AGGREGATE_ARTICLES_PUBLIC,
  SEARCH_AGGREGATE_TAGS_PUBLIC,
  SEARCH_AGGREGATE_USERS_PUBLIC,
} from './gql'
import { TABS, Tabs } from './Tabs'
import Tags from './Tags'
import Users from './Users'

enum Type {
  ARTICLE = 'article',
  USER = 'user',
  TAG = 'tag',
}

const AggregateResults = () => {
  const { getQuery, replaceQuery } = useRoute()
  const client = useApolloClient()
  const [type, setType] = useState(
    getSearchType(getQuery('type')) || Type.ARTICLE
  )
  const q = getQuery('q')

  const isArticle = type === Type.ARTICLE
  const isUser = type === Type.USER
  const isTag = type === Type.TAG

  const updateType = (t: Type) => {
    setType(t)
    replaceQuery('type', t)
  }

  // Prefetch first search results
  useEffect(() => {
    client.query({
      query: SEARCH_AGGREGATE_ARTICLES_PUBLIC,
      variables: { key: q },
      fetchPolicy: 'network-only',
    })
    client.query({
      query: SEARCH_AGGREGATE_USERS_PUBLIC,
      variables: { key: q },
      fetchPolicy: 'network-only',
    })
    client.query({
      query: SEARCH_AGGREGATE_TAGS_PUBLIC,
      variables: { key: q },
      fetchPolicy: 'network-only',
    })
  }, [q])

  return (
    <>
      <Tabs tab={type as TABS} setTab={updateType as (tab: TABS) => void} />

      <Layout.Main.Spacing hasVertical={false}>
        {isArticle && <Articles />}
        {isTag && <Tags />}
        {isUser && <Users />}
      </Layout.Main.Spacing>
    </>
  )
}

export default AggregateResults
