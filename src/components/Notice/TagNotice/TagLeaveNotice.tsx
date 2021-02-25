import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTag from '../NoticeTag'
import styles from '../styles.css'

import { TagLeaveNotice as NoticeType } from './__generated__/TagLeaveNotice'

const TagLeaveNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeActorName user={actor} />
          <Translate
            zh_hant=" 辭去了標籤主理人權限，你要不要試試看成為新的主理人？"
            zh_hans=" 辞去了标签主理人权限，你要不要试试看成为新的主理人？"
            en=" resigned from tag maintainer, do you want to give it a try?"
          />
        </NoticeHead>

        <NoticeTag tag={notice.tag} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

TagLeaveNotice.fragments = {
  notice: gql`
    fragment TagLeaveNotice on TagNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      tag: target {
        ...NoticeTag
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeTag.fragments.tag}
  `,
}

export default TagLeaveNotice
