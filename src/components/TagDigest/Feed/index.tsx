import gql from 'graphql-tag'
import Link from 'next/link'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { abbr } from '~/common/utils/number/abbr'
import { TagDigestFeedTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type TagDigestFeedProps = {
  tag: TagDigestFeedTagFragment
  onClick?: () => void
}

const fragments = {
  tag: gql`
    fragment TagDigestFeedTag on Tag {
      id
      content
      numArticles
    }
  `,
}

const Feed = ({ tag, onClick }: TagDigestFeedProps) => {
  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  const numArticles = abbr(tag.numArticles, 1)

  return (
    <Link
      {...path}
      className={styles.tag}
      data-test-id={TEST_ID.DIGEST_TAG_FEED}
      onClick={onClick}
    >
      <span className={styles.name}>{tag.content}</span>&nbsp;
      <span
        className={styles.nums}
        data-test-id={TEST_ID.DIGEST_TAG_FEED_NUM_ARTICLES}
      >
        ({numArticles})
      </span>
    </Link>
  )
}

Feed.fragments = fragments

export default Feed
