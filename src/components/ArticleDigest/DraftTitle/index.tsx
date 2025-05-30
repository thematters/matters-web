import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import { ReactComponent as IconDraft } from '@/public/static/icons/24px/draft.svg'
import { ReactComponent as IconTimes } from '@/public/static/icons/24px/times.svg'
import { Icon } from '~/components'
import { ArticleDigestDraftTitleArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  article: gql`
    fragment ArticleDigestDraftTitleArticle on Article {
      id
      title
      state
      articleState: state
    }
  `,
}

type ArticleDigestDraftTitleProps = {
  article: ArticleDigestDraftTitleArticleFragment
  onRemove: () => void
  saving?: boolean
}

export const ArticleDigestDraftTitle = ({
  article,
  onRemove,
  saving,
}: ArticleDigestDraftTitleProps) => {
  const intl = useIntl()

  return (
    <section className={styles.container}>
      <section className={styles.left}>
        <Icon icon={IconDraft} color="greyDark" />
        <span className={styles.title}>{article.title}</span>
      </section>
      <section className={styles.right}>
        <button
          type="button"
          onClick={onRemove}
          aria-label={intl.formatMessage({
            defaultMessage: 'Remove',
            id: 'G/yZLu',
          })}
          disabled={saving}
        >
          <Icon icon={IconTimes} color="black" size={12} />
        </button>
      </section>
    </section>
  )
}

ArticleDigestDraftTitle.fragments = fragments
