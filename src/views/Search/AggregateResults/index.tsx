import { useState } from 'react'

import { Tabs, Translate, usePullToRefresh, useRoute } from '~/components'

import Articles from './Articles'
import styles from './styles.css'
import Tags from './Tags'
import Users from './Users'

enum Type {
  ARTICLE = 'article',
  USER = 'user',
  TAG = 'tag',
}

const AggregateResults = () => {
  usePullToRefresh.Register()
  const { getQuery, setQuery } = useRoute()
  const [type, setType] = useState(getQuery('type') || Type.ARTICLE)
  const q = getQuery('q')

  const isArticle = type === Type.ARTICLE
  const isUser = type === Type.USER
  const isTag = type === Type.TAG

  const updateType = (t: Type) => {
    setType(t)
    setQuery('type', t)
  }

  return (
    <>
      <section className="title">
        <span className="titleLeft">
          <Translate zh_hans="有关" zh_hant="有關" en="All results for" />
        </span>
        <span>
          <span className="titleMiddle">&nbsp;{q}</span>
        </span>
        <span className="titleRight">
          &nbsp;
          <Translate zh_hans="的搜索結果" zh_hant="的檢索結果" en="" />
        </span>
      </section>
      <Tabs>
        <Tabs.Tab selected={isArticle} onClick={() => updateType(Type.ARTICLE)}>
          <Translate zh_hans="作品" zh_hant="作品" en="Articles" />
        </Tabs.Tab>
        <Tabs.Tab selected={isUser} onClick={() => updateType(Type.USER)}>
          <Translate zh_hans="用户" zh_hant="用戶" en="Users" />
        </Tabs.Tab>
        <Tabs.Tab selected={isTag} onClick={() => updateType(Type.TAG)}>
          <Translate zh_hans="标签" zh_hant="標籤" en="Tags" />
        </Tabs.Tab>
      </Tabs>
      {isArticle && <Articles />}
      {isTag && <Tags />}
      {isUser && <Users />}
      <style jsx>{styles}</style>
    </>
  )
}

export default AggregateResults
