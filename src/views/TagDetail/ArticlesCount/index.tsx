import { FormattedMessage } from 'react-intl'

import IconDot from '@/public/static/icons/dot.svg'
import { numAbbr } from '~/common/utils'
import { Icon } from '~/components'

import styles from './styles.module.css'

interface ArticlesCountProps {
  tag: { numArticles: number; numMoments: number }
}

const ArticlesCount = ({ tag }: ArticlesCountProps) => {
  const totalCount = tag.numArticles
  const momentCount = tag.numMoments

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
      <span className={styles.dot}>
        <Icon icon={IconDot} color="grey" size={14} />
      </span>
      <span>{numAbbr(momentCount)}</span>
      <span>
        &nbsp;
        <FormattedMessage
          defaultMessage={`{momentCount, plural, =1 {moment} other {moments}}`}
          id="QuQXDD"
          values={{
            momentCount: numAbbr(momentCount),
          }}
        />
      </span>
    </section>
  )
}

export default ArticlesCount
