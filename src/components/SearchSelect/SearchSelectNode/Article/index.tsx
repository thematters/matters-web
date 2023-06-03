import classNames from 'classnames'

import { TEST_ID } from '~/common/enums'
import {
  ArticleDigestDropdown,
  Card,
  IconChecked,
  IconUnChecked,
} from '~/components'
import { ArticleDigestDropdownArticleFragment } from '~/gql/graphql'

import styles from '../styles.module.css'

interface SearchSelectArticleProps {
  article: ArticleDigestDropdownArticleFragment
  selected?: boolean
  onClick: (article: ArticleDigestDropdownArticleFragment) => void
  inStagingArea?: boolean
}

const SearchSelectArticle: React.FC<SearchSelectArticleProps> = ({
  article,
  selected,
  onClick,
  inStagingArea,
}) => {
  const nodeClass = classNames({
    [styles.node]: true,
    [styles.selectable]: inStagingArea,
  })

  return (
    <Card
      spacing={['tight', 'base']}
      onClick={() => onClick(article)}
      testId={TEST_ID.SEARCH_RESULTS_ITEM}
    >
      <section className={nodeClass}>
        <ArticleDigestDropdown
          article={article}
          titleTextSize="md"
          spacing={[0, 0]}
          bgColor="none"
          disabled
        />

        <span className={styles['icon-select']}>
          {inStagingArea && selected && (
            <IconChecked color="green" size="md-s" />
          )}
          {inStagingArea && !selected && (
            <IconUnChecked color="grey-light" size="md-s" />
          )}
        </span>
      </section>
    </Card>
  )
}

export default SearchSelectArticle
