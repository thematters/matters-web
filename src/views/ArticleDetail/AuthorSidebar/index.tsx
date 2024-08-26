import dynamic from 'next/dynamic'
import { useState } from 'react'

import { SpinnerBlock, useRoute } from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import Author from './Author'
import { FromAuthor } from './FromAuthor'
import { fragments } from './gql'
import { Placeholder } from './Placeholder'
import { RelatedArticles } from './RelatedArticles'
import styles from './styles.module.css'
import { TABS, Tabs } from './Tabs'

type AuthorSidebarProps = {
  article: NonNullable<ArticleDetailPublicQuery['article']>
}

const DynamicCollection = dynamic(() => import('./Collection'), {
  ssr: false,
  loading: () => <SpinnerBlock />,
})

export const AuthorSidebar = ({ article }: AuthorSidebarProps) => {
  const { getQuery } = useRoute()
  const collectionId = getQuery('collection')
  const latestWorks = article.author?.latestWorks.filter((work) => {
    return work.id !== article.id
  })
  const hasFromAuthor = latestWorks && latestWorks.length > 0
  const hasRecommendation = article.relatedArticles?.totalCount > 0
  const [tab, setTab] = useState<TABS>(
    !!collectionId
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
          <section className={styles.tabs}>
            <Tabs article={article} tab={tab} setTab={setTab} />
          </section>

          <section className={styles.list}>
            {!!collectionId && tab === 'Collection' && (
              <DynamicCollection
                article={article}
                collectionId={collectionId}
              />
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
