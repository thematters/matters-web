import { useApolloClient } from '@apollo/react-hooks'
import { useEffect, useState } from 'react'

import { getSearchType } from '~/common/utils'
import { Layout, SegmentedTabs, Translate, useRoute } from '~/components'

import Articles from './Articles'
import {
  SEARCH_AGGREGATE_ARTICLES_PUBLIC,
  SEARCH_AGGREGATE_TAGS_PUBLIC,
  SEARCH_AGGREGATE_USERS_PUBLIC,
} from './gql'
import styles from './styles.module.css'
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
  const version = getQuery('version')

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
      variables: { key: q, version: version === '' ? undefined : version },
      fetchPolicy: 'network-only',
    })
    client.query({
      query: SEARCH_AGGREGATE_USERS_PUBLIC,
      variables: { key: q, version: version === '' ? undefined : version },
      fetchPolicy: 'network-only',
    })
    client.query({
      query: SEARCH_AGGREGATE_TAGS_PUBLIC,
      variables: { key: q, version: version === '' ? undefined : version },
      fetchPolicy: 'network-only',
    })
  }, [q])

  return (
    <>
      <section className={styles.title}>
        <span className={styles.titleLeft}>
          <Translate zh_hans="有关" zh_hant="有關" en="All results for" />
        </span>
        <span>
          <span className={styles.titleMiddle}>&nbsp;{q}</span>
        </span>
        <span className={styles.titleRight}>
          &nbsp;
          <Translate zh_hans="的搜索結果" zh_hant="的檢索結果" en="" />
        </span>
      </section>

      <SegmentedTabs>
        <SegmentedTabs.Tab
          selected={isArticle}
          onClick={() => updateType(Type.ARTICLE)}
        >
          <Translate zh_hans="作品" zh_hant="作品" en="Articles" />
        </SegmentedTabs.Tab>
        <SegmentedTabs.Tab
          selected={isUser}
          onClick={() => updateType(Type.USER)}
        >
          <Translate zh_hans="用户" zh_hant="用戶" en="Users" />
        </SegmentedTabs.Tab>
        <SegmentedTabs.Tab
          selected={isTag}
          onClick={() => updateType(Type.TAG)}
        >
          <Translate zh_hans="标签" zh_hant="標籤" en="Tags" />
        </SegmentedTabs.Tab>
      </SegmentedTabs>

      <Layout.Main.Spacing hasVertical={false}>
        {isArticle && <Articles />}
        {isTag && <Tags />}
        {isUser && <Users />}
      </Layout.Main.Spacing>
    </>
  )
}

export default AggregateResults
