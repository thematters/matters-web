import gql from 'graphql-tag'
import Link from 'next/link'

import { MAX_NOTICE_SUMMARY_LENGTH, TEST_ID } from '~/common/enums'
import { makeSummary, toPath } from '~/common/utils'
import { CollectionNoticeFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const NoticeCollectionTitle = ({
  notice,
}: {
  notice: CollectionNoticeFragment | null
}) => {
  const userName = notice?.collection?.author.userName

  if (!notice || !userName) {
    return null
  }

  const path = toPath({
    page: 'collectionDetail',
    collection: notice.collection,
    userName,
  })

  return (
    <Link {...path}>
      <a
        className={styles.noticeArticleTitle}
        data-test-id={TEST_ID.NOTICE_COLLECTION_TITLE}
      >
        {makeSummary(notice.collection.title, MAX_NOTICE_SUMMARY_LENGTH, '\n')}
      </a>
    </Link>
  )
}

NoticeCollectionTitle.fragments = {
  collection: gql`
    fragment NoticeCollectionTitle on Collection {
      id
      title
      author {
        id
        userName
      }
    }
  `,
}

export default NoticeCollectionTitle
