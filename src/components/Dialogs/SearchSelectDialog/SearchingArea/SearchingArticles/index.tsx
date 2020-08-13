import { ArticleDigestDropdown, Menu } from '~/components'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'

interface SearchingArticlesProps {
  articles: ArticleDigestDropdownArticle[]
  onClick: (article: ArticleDigestDropdownArticle) => void
}

const SearchingArticles: React.FC<SearchingArticlesProps> = ({
  articles,
  onClick,
}) => {
  return (
    <Menu spacingY={0}>
      {articles.map((article) => (
        <Menu.Item spacing={[0, 0]} key={article.id}>
          <ArticleDigestDropdown
            article={article}
            titleTextSize="sm"
            disabled
            extraButton={
              <ArticleDigestDropdown.OpenExternalLink article={article} />
            }
            spacing={['tight', 'base']}
            onClick={() => onClick(article)}
          />
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default SearchingArticles
