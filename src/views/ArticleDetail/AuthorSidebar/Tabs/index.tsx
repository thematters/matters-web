import { FormattedMessage } from 'react-intl'

import { SquareTabs, useRoute } from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

export type TABS = 'Collection' | 'Author' | 'Recommendation' | undefined

type TabsProps = {
  article: NonNullable<ArticleDetailPublicQuery['article']>
  tab: TABS
  setTab: React.Dispatch<React.SetStateAction<TABS>>
}

export const Tabs = ({ article, tab, setTab }: TabsProps) => {
  const { getQuery } = useRoute()
  const cid = getQuery('collection')
  const latestWorks = article.author?.latestWorks.filter((work) => {
    return work.id !== article.id
  })
  const hasFromAuthor = latestWorks && latestWorks.length > 0
  const hasRecommendation = article.relatedArticles?.totalCount > 0

  return (
    <SquareTabs>
      {!!cid && (
        <SquareTabs.Tab
          selected={tab === 'Collection'}
          onClick={() => setTab('Collection')}
        >
          <FormattedMessage
            defaultMessage="Collection"
            id="Hpmiif"
            description="src/views/ArticleDetail/AuthorSidebar/Tabs/index.tsx"
          />
        </SquareTabs.Tab>
      )}
      {hasFromAuthor && (
        <SquareTabs.Tab
          selected={tab === 'Author'}
          onClick={() => setTab('Author')}
        >
          <FormattedMessage
            defaultMessage="Author"
            id="RM17b4"
            description="src/views/ArticleDetail/AuthorSidebar/Tabs/index.tsx"
          />
        </SquareTabs.Tab>
      )}
      {hasRecommendation && (
        <SquareTabs.Tab
          selected={tab === 'Recommendation'}
          onClick={() => setTab('Recommendation')}
        >
          <FormattedMessage
            defaultMessage="More"
            id="VqdOGQ"
            description="src/views/ArticleDetail/AuthorSidebar/Tabs/index.tsx"
          />
        </SquareTabs.Tab>
      )}
    </SquareTabs>
  )
}
