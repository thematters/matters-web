import gql from 'graphql-tag'
import React from 'react'

import { Card, DateTime, LinkWrapper, Title, Translate } from '~/components'

import { toPath } from '~/common/utils'

import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import styles from './styles.css'

import { DraftDigestFeedDraft } from './__generated__/DraftDigestFeedDraft'

interface DraftDigestFeedProps {
  draft: DraftDigestFeedDraft
}

const fragments = {
  draft: gql`
    fragment DraftDigestFeedDraft on Draft {
      id
      title
      slug
      updatedAt
      ...EditButtonDraft
      ...DeleteButtonDraft
    }
    ${EditButton.fragments.draft}
    ${DeleteButton.fragments.draft}
  `,
}

const DraftDigestFeed = ({ draft }: DraftDigestFeedProps) => {
  const { id, title, updatedAt, slug } = draft
  const path = toPath({
    page: 'draftDetail',
    slug,
    id,
  })

  return (
    <Card {...path} spacing={['base', 'base']}>
      <LinkWrapper {...path} textActiveColor="green">
        <Title type="feed" is="h2">
          {title || <Translate id="untitle" />}
        </Title>
      </LinkWrapper>

      <footer>
        <section className="left">
          <EditButton draft={draft} />
          <DeleteButton draft={draft} />
        </section>

        <section className="right">
          <DateTime date={updatedAt} type="relative" />
        </section>
      </footer>

      <style jsx>{styles}</style>
    </Card>
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
