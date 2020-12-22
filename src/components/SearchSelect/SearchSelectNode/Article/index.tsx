import classNames from 'classnames'

import {
  ArticleDigestDropdown,
  Card,
  IconChecked,
  IconUnChecked,
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
            <IconChecked color="green" size="md-s" />
          )}
          {inStagingArea && !selected && (
            <IconUnChecked color="grey-light" size="md-s" />
          )}
        </span>

        <style jsx> {styles}</style>
      </section>
    </Card>
  )
}

export default SearchSelectArticle
