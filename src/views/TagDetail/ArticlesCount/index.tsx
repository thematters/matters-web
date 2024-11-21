import { FormattedMessage } from 'react-intl'

import { numAbbr } from '~/common/utils'
import tagFragments from '~/components/GQL/fragments/tag'
import { ArticleCountTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

interface ArticlesCountProps {
  tag: ArticleCountTagFragment
}

const ArticlesCount = ({ tag }: ArticlesCountProps) => {
  const { totalCount } = tag.articles || { totalCount: 0 }

  return (
    <section className={styles.container}>
      <span>{numAbbr(totalCount)}</span>
      <span>
        &nbsp;
        <FormattedMessage
          defaultMessage={`{totalCount, plural, =1 {article} other {articles}}`}
          id="cd/II9"
          values={{
            totalCount: numAbbr(totalCount),
          }}
        />
      </span>
    </section>
  )
}

ArticlesCount.fragments = {
  tag: tagFragments.articleCount,
}

export default ArticlesCount
