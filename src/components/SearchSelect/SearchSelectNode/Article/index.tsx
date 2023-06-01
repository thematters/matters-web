import classNames from 'classnames'

import { TEST_ID } from '~/common/enums'
import {
  ArticleDigestDropdown,
  Card,
  IconChecked,
  IconUnChecked,
} from '~/components'
import { ArticleDigestDropdownArticleFragment } from '~/gql/graphql'

import styles from '../styles.css'

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
    node: true,
    selectable: inStagingArea,
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
            selected
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
