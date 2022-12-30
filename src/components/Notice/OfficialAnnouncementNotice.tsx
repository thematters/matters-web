import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { OfficialAnnouncementNoticeFragment } from '~/gql/graphql'

import NoticeDate from './NoticeDate'
import NoticeTypeIcon from './NoticeTypeIcon'
import styles from './styles.css'

const OfficialAnnouncementNotice = ({
  notice,
}: {
  notice: OfficialAnnouncementNoticeFragment
}) => {
  const Message = () => <p>{notice.message}</p>

  return (
    <section className="container" data-test-id={TEST_ID.OFFICIAL_ANNOUNCEMENT}>
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
