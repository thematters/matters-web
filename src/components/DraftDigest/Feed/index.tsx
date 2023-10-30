import gql from 'graphql-tag'
import React from 'react'

import { toPath } from '~/common/utils'
import { DateTime, LinkWrapper, Translate } from '~/components'
import { DraftDigestFeedDraftFragment } from '~/gql/graphql'

import DeleteButton from './DeleteButton'
import Placeholder from './Placeholder'
import styles from './styles.module.css'

interface DraftDigestFeedProps {
  draft: DraftDigestFeedDraftFragment
}

const fragments = {
  draft: gql`
    fragment DraftDigestFeedDraft on Draft {
      id
      title
      slug
      updatedAt
      ...DeleteButtonDraft
    }
    ${DeleteButton.fragments.draft}
  `,
}

const DraftDigestFeed = ({ draft }: DraftDigestFeedProps) => {
  const { id, title, updatedAt } = draft
  const path = toPath({ page: 'draftDetail', id })

  return (
    <section className={styles.container}>
      <section className={styles.left}>
        <section>
          <DateTime date={updatedAt} color="grey" />
        </section>
        <section className={styles.content}>
          <LinkWrapper {...path} textActiveColor="green">
            <section className={styles.title}>
              {title || <Translate id="untitle" />}
            </section>
          </LinkWrapper>
        </section>
      </section>

      <section className={styles.right}>
        <DeleteButton draft={draft} />
      </section>
    </section>
  )
}

/**
 * Memoizing
 */
type MemoizedDraftDigestFeedType = React.MemoExoticComponent<
  React.FC<DraftDigestFeedProps>
> & {
  Placeholder: typeof Placeholder
  fragments: typeof fragments
}

const MemoizedDraftDigestFeed = React.memo(
  DraftDigestFeed,
  () => true
) as MemoizedDraftDigestFeedType

MemoizedDraftDigestFeed.Placeholder = Placeholder
MemoizedDraftDigestFeed.fragments = fragments

export default MemoizedDraftDigestFeed
