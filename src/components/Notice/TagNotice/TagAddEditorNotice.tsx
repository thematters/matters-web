import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeHead from '../NoticeHead'
import NoticeTag from '../NoticeTag'
import styles from '../styles.css'

import { TagAddEditorNotice as NoticeType } from './__generated__/TagAddEditorNotice'

const TagAddEditorNotice = ({ notice }: { notice: NoticeType }) => {
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
        <NoticeHead notice={notice}>
          <NoticeActorName user={actor} />{' '}
          <Translate
            zh_hant="邀請你成為標籤的協作者"
            zh_hans="邀请你成为標籤的协作者"
            en="invite you to become a collaborator"
          />
        </NoticeHead>

        <NoticeTag tag={notice.tag} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

TagAddEditorNotice.fragments = {
  notice: gql`
    fragment TagAddEditorNotice on TagNotice {
      id
      ...NoticeHead
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

export default TagAddEditorNotice
