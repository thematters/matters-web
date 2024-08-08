import gql from 'graphql-tag'
import Link from 'next/link'
import { useContext } from 'react'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { truncateNoticeTitle } from '~/common/utils/text/notice'
import { CollectionNoticeFragment } from '~/gql/graphql'

import { LanguageContext } from '../Context'
import styles from './styles.module.css'

const NoticeCollectionTitle = ({
  notice,
}: {
  notice: CollectionNoticeFragment | null
}) => {
  const userName = notice?.collection?.author.userName
  const { lang } = useContext(LanguageContext)

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
        {truncateNoticeTitle(notice.collection.title, { locale: lang })}
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
