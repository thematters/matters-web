import { useState } from 'react'

import { useRoute } from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import Author from './Author'
import { fragments } from './gql'
import { Placeholder } from './Placeholder'
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
    </>
  )
}

AuthorSidebar.Placeholder = Placeholder
AuthorSidebar.fragments = fragments
