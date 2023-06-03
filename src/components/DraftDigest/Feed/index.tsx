import gql from 'graphql-tag'
import React from 'react'

import { toPath } from '~/common/utils'
import { Card, LinkWrapper, ResponsiveWrapper, Translate } from '~/components'
import { DraftDigestFeedDraftFragment } from '~/gql/graphql'

import DeleteButton from './DeleteButton'
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
  const { id, title, slug } = draft
  const path = toPath({
    page: 'draftDetail',
    slug,
    id,
  })

  return (
    <ResponsiveWrapper>
      <Card {...path} spacing={['base', 0]} bgActiveColor="none">
        <section className="container">
          <section className="left">
            <LinkWrapper {...path} textActiveColor="green">
              <section className="title">
                {title || <Translate id="untitle" />}
              </section>
            </LinkWrapper>
          </section>

          <section className="right">
            <DeleteButton draft={draft} />
          </section>
        </section>
      </Card>
    </ResponsiveWrapper>
  )
}

/**
 * Memoizing
 */
type MemoizedDraftDigestFeedType = React.MemoExoticComponent<
  React.FC<DraftDigestFeedProps>
> & {
  fragments: typeof fragments
}

const MemoizedDraftDigestFeed = React.memo(
  DraftDigestFeed,
  () => true
) as MemoizedDraftDigestFeedType

MemoizedDraftDigestFeed.fragments = fragments

export default MemoizedDraftDigestFeed
