import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeHead from './NoticeHead'
import NoticeTag from './NoticeTag'
import styles from './styles.css'

import { ArticleTagHasBeenRemovedNotice as NoticeType } from './__generated__/ArticleTagHasBeenRemovedNotice'

const ArticleTagHasBeenRemovedNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice || !notice.actor) {
    return null
  }

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={notice.actor} />
      </section>

      <section className="content-wrap overflow-hidden">
        <NoticeHead notice={notice}>
          <NoticeActorName user={notice.actor} />{' '}
          <Translate
            zh_hant="將標籤從你的作品移除"
            zh_hans="将标签從你的作品移除"
          />
        </NoticeHead>

        <NoticeArticle article={notice.target} isBlock />

        <NoticeTag tag={notice.tag} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleTagHasBeenRemovedNotice.fragments = {
  notice: gql`
    fragment ArticleTagHasBeenRemovedNotice on ArticleTagHasBeenRemovedNotice {
      id
      unread
      __typename
      ...NoticeHead
      actor {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        ...NoticeArticle
      }
      tag {
        ...NoticeTag
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
    ${NoticeHead.fragments.date}
    ${NoticeTag.fragments.tag}
  `,
}

export default ArticleTagHasBeenRemovedNotice
