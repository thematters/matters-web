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
  const cid = getQuery('cid')
  const [tab, setTab] = useState<TABS>(!!cid ? 'Collection' : 'Author')

  return (
    <>
      <Author article={article} />
      <Tabs article={article} tab={tab} setTab={setTab} />
      <section className={styles.list}>
        {!!cid && tab === 'Collection' && (
          <Collection article={article} collectionId={cid} />
        )}
        {tab === 'Author' && <FromAuthor article={article} />}
        {tab === 'Recommendation' && <RelatedArticles article={article} />}
      </section>
    </>
  )
}

AuthorSidebar.Placeholder = Placeholder
AuthorSidebar.fragments = fragments
