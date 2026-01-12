import gql from 'graphql-tag'

import { OfficialAnnouncementFragment } from '~/gql/graphql'

import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'

const OfficialAnnouncement = ({
  notice,
}: {
  notice: OfficialAnnouncementFragment
}) => {
  const Message = () => <p>{notice.message}</p>

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
