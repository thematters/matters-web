import classNames from 'classnames'

import {
  ArticleDigestDropdown,
  Card,
  IconChecked24,
  IconCheck24,
} from '~/components'

import styles from '../styles.css'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'

interface SearchSelectArticleProps {
  article: ArticleDigestDropdownArticle
  selected?: boolean
  onClick: (article: ArticleDigestDropdownArticle) => void
  inStagingArea?: boolean
}

const SearchSelectArticle: React.FC<SearchSelectArticleProps> = ({
  article,
  selected,
  onClick,
  inStagingArea,
}) => {
  const nodeClass = classNames({
    node: true,
    selectable: inStagingArea,
  })

  return (
    <Card spacing={['tight', 'base']} onClick={() => onClick(article)}>
      <section className={nodeClass}>
        <ArticleDigestDropdown
          article={article}
          titleTextSize="md"
          spacing={[0, 0]}
          bgColor="none"
          disabled
        />

        <span className="icon-select">
          {inStagingArea && selected && (
            <IconChecked24 color="green" size="md" />
          )}
          {inStagingArea && !selected && (
            <IconCheck24 color="grey-light" size="md" />
          )}
        </span>

        <style jsx> {styles}</style>
      </section>
    </Card>
  )
}

export default SearchSelectArticle
