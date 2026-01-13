import gql from 'graphql-tag'

import { OfficialAnnouncementFragment } from '~/gql/graphql'

import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'
import styles from './styles.module.css'

const OfficialAnnouncement = ({
  notice,
}: {
  notice: OfficialAnnouncementFragment
}) => {
  const Message = () => <p className={styles.text}>{notice.message}</p>

  return (
    <NoticeCard
      notice={notice}
      type="system"
      content={
        notice.link ? (
          <a href={notice.link}>
            <Message />
          </a>
        ) : (
          <Message />
        )
      }
    />
  )
}

OfficialAnnouncement.fragments = {
  notice: gql`
    fragment OfficialAnnouncement on OfficialAnnouncementNotice {
      id
      unread
      __typename
      ...NoticeDate
      link
      message
    }
    ${NoticeDate.fragments.notice}
  `,
}

export default OfficialAnnouncement
