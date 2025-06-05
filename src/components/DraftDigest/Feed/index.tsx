import gql from 'graphql-tag'
import Link from 'next/link'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { DateTime } from '~/components'
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
    <section
      className={styles.container}
      data-test-id={TEST_ID.DIGEST_DRAFT_FEED}
    >
      <section className={styles.left}>
        <section>
          <DateTime date={updatedAt} color="grey" />
        </section>
        <section className={styles.content}>
          <Link {...path} className="u-link-active-green">
            <section className={styles.title}>
              {title || (
                <FormattedMessage defaultMessage="Untitled" id="3kbIhS" />
              )}
            </section>
          </Link>
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
