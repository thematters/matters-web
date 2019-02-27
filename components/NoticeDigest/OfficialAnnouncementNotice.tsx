import gql from 'graphql-tag'

import { Avatar } from '~/components/Avatar'

import ICON_AVATAR_MAT from '~/static/icons/avatar-mat.svg?url'

import { OfficialAnnouncementNotice as NoticeType } from './__generated__/OfficialAnnouncementNotice'
import NoticeDate from './NoticeDate'
import styles from './styles.css'

const OfficialAnnouncementNotice = ({ notice }: { notice: NoticeType }) => {
  const Message = () => <p>{notice.message}</p>

  return (
    <section className="container">
      <section className="avatar-wrap">
        <Avatar src={ICON_AVATAR_MAT} />
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
  `
}

export default OfficialAnnouncementNotice
