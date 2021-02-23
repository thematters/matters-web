import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTag from '../NoticeTag'
import styles from '../styles.css'

import { TagLeaveEditorNotice as NoticeType } from './__generated__/TagLeaveEditorNotice'

const TagLeaveEditorNotice = ({ notice }: { notice: NoticeType }) => {
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
          <Translate
            zh_hant="哎呀，標籤協作者"
            zh_hans="哎呀，标签协作者"
            en="uh-oh, collaborator"
          />{' '}
          <NoticeActorName user={actor} />{' '}
          <Translate
            zh_hant="辭去了權限。你可以邀請新的協作者加入了"
            zh_hans="辞去了权限。你可以邀请新的协作者加入了"
            en="resigned from tag. You can invite new collaborators to join"
          />
        </NoticeHead>

        <NoticeTag tag={notice.tag} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

TagLeaveEditorNotice.fragments = {
  notice: gql`
    fragment TagLeaveEditorNotice on TagNotice {
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

export default TagLeaveEditorNotice
