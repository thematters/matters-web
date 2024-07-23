import { useIntl } from 'react-intl'

import { FilledTabs, useRoute } from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

export type TABS = 'Collection' | 'Author' | 'Recommendation' | undefined

type TabsProps = {
  article: NonNullable<ArticleDetailPublicQuery['article']>
  tab: TABS
  setTab: React.Dispatch<React.SetStateAction<TABS>>
}

export const Tabs = ({ article, tab, setTab }: TabsProps) => {
  const intl = useIntl()
  const { getQuery } = useRoute()
  const cid = getQuery('collection')
  const latestWorks = article.author?.latestWorks.filter((work) => {
    return work.id !== article.id
  })
  const hasFromAuthor = latestWorks && latestWorks.length > 0
  const hasRecommendation = article.relatedArticles?.totalCount > 0

  return (
    <FilledTabs>
      {!!cid && (
        <FilledTabs.Tab
          selected={tab === 'Collection'}
          onClick={() => setTab('Collection')}
          title={intl.formatMessage({
            defaultMessage: 'Collection',
            id: 'Hpmiif',
            description: 'src/views/ArticleDetail/AuthorSidebar/Tabs/index.tsx',
          })}
        />
      )}
      {hasFromAuthor && (
        <FilledTabs.Tab
          selected={tab === 'Author'}
          onClick={() => setTab('Author')}
          title={intl.formatMessage({
            defaultMessage: 'Author',
            id: 'RM17b4',
            description: 'src/views/ArticleDetail/AuthorSidebar/Tabs/index.tsx',
          })}
        />
      )}
      {hasRecommendation && (
        <FilledTabs.Tab
          selected={tab === 'Recommendation'}
          onClick={() => setTab('Recommendation')}
          title={intl.formatMessage({
            defaultMessage: 'More',
            id: 'VqdOGQ',
            description: 'src/views/ArticleDetail/AuthorSidebar/Tabs/index.tsx',
          })}
        />
      )}
    </FilledTabs>
  )
}
