import { ArticleDigestDropdown, Menu, Spinner } from '~/components'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'

export const DropdownArticleList = ({
  articles,
  onClick,
  loading
}: {
  articles: ArticleDigestDropdownArticle[]
  onClick: (article: ArticleDigestDropdownArticle) => void
  loading?: boolean
}) => {
  if (loading) {
    return (
      <Menu width="md">
        <Menu.Item>
          <Spinner />
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Menu width="md">
      {articles.map(article => (
        <Menu.Item spacing={[0, 0]} key={article.id}>
          <ArticleDigestDropdown
            article={article}
            titleTextSize="sm"
            disabled
            extraButton={
              <ArticleDigestDropdown.OpenExternalLink article={article} />
            }
            bgActiveColor="grey-lighter"
            spacing={['tight', 'base']}
            onClick={() => onClick(article)}
          />
        </Menu.Item>
      ))}
    </Menu>
  )
}
