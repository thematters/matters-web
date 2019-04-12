import { ArticleDigest } from '~/components/ArticleDigest'
import { DropdownDigestArticle } from '~/components/ArticleDigest/DropdownDigest/__generated__/DropdownDigestArticle'
import { Menu } from '~/components/Menu'
import { Spinner } from '~/components/Spinner'

import styles from './styles.css'

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
      <Menu width="100%">
        <Menu.Item>
          <Spinner />
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <>
      <Menu width="100%">
        {articles.map(article => (
          <Menu.Item
            spacing={['xtight', 'tight']}
            hoverBgColor="green"
            key={article.id}
          >
            <button
              className="search-article-item"
              type="button"
              onClick={() => {
                onClick(article)
              }}
            >
              <ArticleDigest.Dropdown article={article} hasArrow />
            </button>
          </Menu.Item>
        ))}
      </Menu>
      <style jsx>{styles}</style>
    </>
  )
}

export default DropdownArticleList
