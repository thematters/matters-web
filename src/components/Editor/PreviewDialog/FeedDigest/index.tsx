import gql from 'graphql-tag'

import IconImage from '@/public/static/icons/24px/image.svg'
import { Icon, ResponsiveImage } from '~/components'
import { FeedDigestDraftFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragment = gql`
  fragment FeedDigestDraft on Draft {
    id
    title
    summary
    content
    cover
  }
`

type FeedDigestProps = {
  draft: FeedDigestDraftFragment
}

export const FeedDigest = ({ draft }: FeedDigestProps) => {
  if (!draft) {
    return null
  }

  return (
    <section className={styles.container}>
      <section className={styles.left}>
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
