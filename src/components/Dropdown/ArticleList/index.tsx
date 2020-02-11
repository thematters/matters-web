import { ArticleDigest } from '~/components/ArticleDigest'
import { Menu } from '~/components/Menu'
import { Spinner } from '~/components/Spinner'

import { DropdownDigestArticle } from '~/components/ArticleDigest/DropdownDigest/__generated__/DropdownDigestArticle'

const DropdownArticleList = ({
  articles,
  onClick,
  loading
}: {
  articles: DropdownDigestArticle[]
  onClick: (article: DropdownDigestArticle) => void
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
          <ArticleDigest.Dropdown
            article={article}
            titleTextSize="sm"
            disabled
            extraButton={
              <ArticleDigest.Dropdown.OpenExternalLink article={article} />
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
