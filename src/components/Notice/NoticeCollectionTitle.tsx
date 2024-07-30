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
  const userId = notice?.target?.author.userName
  const { lang } = useContext(LanguageContext)

  if (!notice || !userId) {
    return null
  }

  const path = toPath({
    page: 'collectionDetail',
    collection: notice.target,
    userName: userId,
  })

  return (
    <Link {...path}>
      <a
        className={styles.noticeArticleTitle}
        data-test-id={TEST_ID.NOTICE_COLLECTION_TITLE}
      >
        {truncateNoticeTitle(notice.target.title, { locale: lang })}
      </a>
    </Link>
  )
}

NoticeCollectionTitle.fragments = {
  collection: gql`
    fragment NoticeCollectionTitle on Collection {
      author {
        userName
      }
    }
  `,
}

export default NoticeCollectionTitle
