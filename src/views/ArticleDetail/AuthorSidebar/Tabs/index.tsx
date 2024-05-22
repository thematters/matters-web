import classNames from 'classnames'
import { useIntl } from 'react-intl'

import { useRoute } from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import styles from './styles.module.css'

export type TABS = 'Collection' | 'Author' | 'Recommendation'

type TabsProps = {
  article: NonNullable<ArticleDetailPublicQuery['article']>
  tab: TABS
  setTab: React.Dispatch<React.SetStateAction<TABS>>
}

const TabItem = ({
  active,
  onClick,
  title,
}: {
  title: string
  active: boolean
  onClick: () => void
}) => {
  const liClasses = classNames({
    [styles.tabItem]: true,
    [styles.active]: active,
  })
  return (
    <li
      className={liClasses}
      role="button"
      onClick={onClick}
      data-title={title}
    >
      {title}
    </li>
  )
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
    <ul className={styles.tabList}>
      {!!cid && (
        <TabItem
          active={tab === 'Collection'}
          onClick={() => setTab('Collection')}
          title={intl.formatMessage({
            defaultMessage: 'Collection',
            id: 'Hpmiif',
            description: 'src/views/ArticleDetail/AuthorSidebar/Tabs/index.tsx',
          })}
        />
      )}
      {hasFromAuthor && (
        <TabItem
          active={tab === 'Author'}
          onClick={() => setTab('Author')}
          title={intl.formatMessage({
            defaultMessage: 'Author',
            id: 'RM17b4',
            description: 'src/views/ArticleDetail/AuthorSidebar/Tabs/index.tsx',
          })}
        />
      )}
      {hasRecommendation && (
        <TabItem
          active={tab === 'Recommendation'}
          onClick={() => setTab('Recommendation')}
          title={intl.formatMessage({
            defaultMessage: 'More',
            id: 'VqdOGQ',
            description: 'src/views/ArticleDetail/AuthorSidebar/Tabs/index.tsx',
          })}
        />
      )}
    </ul>
  )
}
