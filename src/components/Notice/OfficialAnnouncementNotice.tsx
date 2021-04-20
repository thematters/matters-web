import { gql } from '@apollo/client'

import NoticeDate from './NoticeDate'
import NoticeTypeIcon from './NoticeTypeIcon'
import styles from './styles.css'

import { OfficialAnnouncementNotice as NoticeType } from './__generated__/OfficialAnnouncementNotice'

const OfficialAnnouncementNotice = ({ notice }: { notice: NoticeType }) => {
  const Message = () => <p>{notice.message}</p>

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeTypeIcon type="volume" />
      </section>

      <section className="content-wrap">
        {notice.link ? (
          <a href={notice.link}>
            <Message />
          </a>
        ) : (
          <Message />
        )}

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

OfficialAnnouncementNotice.fragments = {
  notice: gql`
    fragment OfficialAnnouncementNotice on OfficialAnnouncementNotice {
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

export default OfficialAnnouncementNotice
