import { FormattedMessage } from 'react-intl'

import { numAbbr } from '~/common/utils'

import styles from './styles.module.css'

interface ArticlesCountProps {
  tag: { numArticles: number }
}

const ArticlesCount = ({ tag }: ArticlesCountProps) => {
  const totalCount = tag.numArticles

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

export default ArticlesCount
