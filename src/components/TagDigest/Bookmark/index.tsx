import gql from 'graphql-tag'
import Link from 'next/link'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { TagBookmarkButton } from '~/components/Buttons/TagBookmark'
import { TagDigestBookmarkTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export type TagDigestBookmarkProps = {
  tag: TagDigestBookmarkTagFragment
  onClick?: () => void
}

const fragments = {
  tag: gql`
    fragment TagDigestBookmarkTag on Tag {
      id
      content
      ...TagBookmarkButtonTagPrivate
    }
    ${TagBookmarkButton.fragments.tag.private}
  `,
}

const Bookmark = ({ tag, onClick }: TagDigestBookmarkProps) => {
  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  return (
    <section
      className={styles.container}
      data-test-id={TEST_ID.DIGEST_TAG_BOOKMARK}
    >
      <Link {...path} legacyBehavior onClick={onClick}>
        <a className={styles.tag}>
          <span className={styles.name}>{tag.content}</span>
        </a>
      </Link>
      <section className={styles.button}>
        <TagBookmarkButton tag={tag} />
      </section>
    </section>
  )
}

Bookmark.fragments = fragments

export default Bookmark
