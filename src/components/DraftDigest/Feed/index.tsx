import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { datetimeFormat, toPath } from '~/common/utils'
import { LanguageContext } from '~/components'
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
      publishAt
      ...DeleteButtonDraft
    }
    ${DeleteButton.fragments.draft}
  `,
}

const DraftDigestFeed = ({ draft }: DraftDigestFeedProps) => {
  const { lang } = useContext(LanguageContext)
  const { id, title, updatedAt, publishAt } = draft
  const path = toPath({ page: 'draftDetail', id })

  return (
    <section
      className={styles.container}
      data-test-id={TEST_ID.DIGEST_DRAFT_FEED}
    >
      <section className={styles.left}>
        <time
          dateTime={new Date(publishAt || updatedAt).toISOString()}
          className={classNames(styles.date, {
            [styles.scheduled]: !!publishAt,
          })}
        >
          {publishAt ? (
            <FormattedMessage
              defaultMessage="Scheduled for {time} {date}"
              id="vsps+A"
              values={{
                time: new Date(publishAt).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                }),
                date: datetimeFormat.absolute({ date: publishAt, lang }),
              }}
            />
          ) : (
            datetimeFormat.relative(updatedAt, lang)
          )}
        </time>
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
