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
  inSearchingArea?: boolean
}

const SearchSelectArticle: React.FC<SearchSelectArticleProps> = ({
  article,
  selected,
  onClick,
  inStagingArea,
  inSearchingArea,
}) => {
  const nodeClass = classNames({
    [styles.node]: true,
    [styles.selectable]: inStagingArea,
    'u-area-disable': !!selected,
  })

  if (inSearchingArea && selected) {
    return (
      <Card spacing={['tight', 'base']} testId={TEST_ID.SEARCH_RESULTS_ITEM}>
        <section className={nodeClass}>
          <ArticleDigestDropdown
            article={article}
            titleTextSize="md"
            spacing={[0, 0]}
            bgColor="none"
            disabled
          />
        </section>
      </Card>
    )
  }

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

        <span className={styles.iconSelect}>
          {inStagingArea && selected && (
            <IconChecked color="green" size="mdS" />
          )}
          {inStagingArea && !selected && (
            <IconUnChecked color="greyLight" size="mdS" />
          )}
        </span>
      </section>
    </Card>
  )
}

export default SearchSelectArticle
