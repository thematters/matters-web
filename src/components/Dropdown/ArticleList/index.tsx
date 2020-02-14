import { ArticleDigestDropdown } from '~/components'
import { Menu } from '~/components/Menu'
import { Spinner } from '~/components/Spinner'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'

const DropdownArticleList = ({
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
            bgHoverColor="grey-lighter"
            spacing={['tight', 'base']}
            onClick={() => onClick(article)}
          />
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default DropdownArticleList
