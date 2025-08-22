import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconImage from '@/public/static/icons/24px/image.svg'
import absolute from '~/common/utils/datetime/absolute'
import { Icon, LanguageContext, ResponsiveImage } from '~/components'
import { FeedDigestDraftFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragment = gql`
  fragment FeedDigestDraft on Draft {
    id
    title
    summary
    content
    cover
    publishAt
  }
`

type FeedDigestProps = {
  draft: FeedDigestDraftFragment
  publishAt?: Date
}

export const FeedDigest = ({ draft, publishAt }: FeedDigestProps) => {
  const { lang } = useContext(LanguageContext)
  if (!draft) {
    return null
  }

  return (
    <section className={styles.container}>
      <section className={styles.left}>
        {(publishAt || draft.publishAt) && (
          <span className={styles.publishAt}>
            <FormattedMessage
              defaultMessage="Scheduled for {date} {time}"
              id="lr5qH7"
              values={{
                date: absolute({
                  date: publishAt || draft.publishAt,
                  lang,
                }),
                time: absolute.timeISO(publishAt || draft.publishAt),
              }}
            />
          </span>
        )}
        <h4 className={styles.title}>{draft.title}</h4>
        <span className={styles.content}>{draft.summary || draft.content}</span>
      </section>
      <section className={styles.right}>
        {draft.cover && (
          <ResponsiveImage
            url={draft.cover}
            width={106}
            height={106}
            smUpWidth={106}
            smUpHeight={106}
          />
        )}
        {!draft.cover && (
          <div className={styles.coverPlaceholder}>
            <Icon icon={IconImage} size={32} color="greyDarker" />
          </div>
        )}
      </section>
    </section>
  )
}

FeedDigest.fragment = fragment
