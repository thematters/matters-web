import classNames from 'classnames'

import IconCircleCheckFill from '@/public/static/icons/24px/circle-check-fill.svg'
import IconCircleEmpty from '@/public/static/icons/24px/circle-empty.svg'
import { TEST_ID } from '~/common/enums'
import { ArticleDigestDropdown, Card, Icon } from '~/components'
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
      <Card spacing={[12, 16]} testId={TEST_ID.SEARCH_RESULTS_ITEM}>
        <section className={nodeClass}>
          <ArticleDigestDropdown
            article={article}
            titleTextSize={16}
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
      spacing={[12, 16]}
      onClick={() => onClick(article)}
      testId={TEST_ID.SEARCH_RESULTS_ITEM}
    >
      <section className={nodeClass}>
        <ArticleDigestDropdown
          article={article}
          titleTextSize={16}
          spacing={[0, 0]}
          bgColor="none"
          disabled
        />

        <span className={styles.iconSelect}>
          {inStagingArea && selected && (
            <Icon icon={IconCircleCheckFill} color="green" size={20} />
          )}
          {inStagingArea && !selected && (
            <Icon icon={IconCircleEmpty} color="greyLight" size={20} />
          )}
        </span>
      </section>
    </Card>
  )
}

export default SearchSelectArticle
