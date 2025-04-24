import { useApolloClient } from '@apollo/client'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { getSearchType } from '~/common/utils'
import { Layout, useRoute } from '~/components'

import Articles from './Articles'
import {
  SEARCH_AGGREGATE_ARTICLES_PUBLIC,
  SEARCH_AGGREGATE_TAGS_PUBLIC,
  SEARCH_AGGREGATE_USERS_PUBLIC,
} from './gql'
import styles from './styles.module.css'
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
      <section className={styles.title}>
        <span className={styles.titleLeft}>
          <FormattedMessage
            defaultMessage="All results for"
            id="8GXAUX"
            description="src/views/Search/AggregateResults/index.tsx"
          />
        </span>
        <span>
          <span className={styles.titleMiddle}>&nbsp;{q}</span>
        </span>
        <span className={styles.titleRight}>
          &nbsp;
          <FormattedMessage
            defaultMessage="of search results"
            id="cd8EmU"
            description="src/views/Search/AggregateResults/index.tsx"
          />
        </span>
      </section>

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
