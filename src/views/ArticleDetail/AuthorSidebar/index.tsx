import { useState } from 'react'

import { useRoute } from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import Author from './Author'
import { Collection } from './Collection'
import { FromAuthor } from './FromAuthor'
import { fragments } from './gql'
import { Placeholder } from './Placeholder'
import { RelatedArticles } from './RelatedArticles'
import styles from './styles.module.css'
import { TABS, Tabs } from './Tabs'

type AuthorSidebarProps = {
  article: NonNullable<ArticleDetailPublicQuery['article']>
}

export const AuthorSidebar = ({ article }: AuthorSidebarProps) => {
  const { getQuery } = useRoute()
  const cid = getQuery('collection')
  const latestWorks = article.author?.latestWorks.filter((work) => {
    return work.id !== article.id
  })
  const hasFromAuthor = latestWorks && latestWorks.length > 0
  const hasRecommendation = article.relatedArticles?.totalCount > 0
  const [tab, setTab] = useState<TABS>(
    !!cid
      ? 'Collection'
      : hasFromAuthor
      ? 'Author'
      : hasRecommendation
      ? 'Recommendation'
      : undefined
  )

  return (
    <>
      <Author article={article} />
      {!!tab && (
        <>
          <Tabs article={article} tab={tab} setTab={setTab} />
          <section className={styles.list}>
            {!!cid && tab === 'Collection' && (
              <Collection article={article} collectionId={cid} />
            )}
            {tab === 'Author' && <FromAuthor article={article} />}
            {tab === 'Recommendation' && <RelatedArticles article={article} />}
          </section>
        </>
      )}
    </>
  )
}

AuthorSidebar.Placeholder = Placeholder
AuthorSidebar.fragments = fragments
