import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { OfficialAnnouncementNoticeFragment } from '~/gql/graphql'

import NoticeDate from './NoticeDate'
import styles from './styles.module.css'

const OfficialAnnouncementNotice = ({
  notice,
}: {
  notice: OfficialAnnouncementNoticeFragment
}) => {
  const Message = () => <p>{notice.message}</p>

  return (
    <section
      className={styles.container}
      data-test-id={TEST_ID.NOTICE_OFFICIAL_ANNOUNCEMENT}
    >
      <section className={styles.contentWrap}>
        {notice.link ? (
          <a href={notice.link}>
            <Message />
          </a>
        ) : (
          <Message />
        )}
      </section>
      <section className={styles.footer}>
        <NoticeDate notice={notice} />
      </section>
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
