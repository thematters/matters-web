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
      numAuthors
    }
  `,
}

const Feed = ({ tag, onClick }: TagDigestFeedProps) => {
  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  const numArticles = abbr(tag.numArticles, 2)

  return (
    <Link {...path} legacyBehavior onClick={onClick}>
      <a className={styles.tag} data-test-id={TEST_ID.DIGEST_TAG_FEED}>
        <span className={styles.name}>{tag.content}</span>&nbsp;
        <span
          className={styles.nums}
          data-test-id={TEST_ID.DIGEST_TAG_FEED_NUM_ARTICLES}
        >
          ({numArticles})
        </span>
      </a>
    </Link>
  )
}

Feed.fragments = fragments

export default Feed
