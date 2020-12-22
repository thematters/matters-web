import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticle from '../NoticeArticle'
import NoticeHead from '../NoticeHead'
import NoticeTag from '../NoticeTag'
import styles from '../styles.css'

import { ArticleTagRemovedNotice as NoticeType } from './__generated__/ArticleTagRemovedNotice'

const ArticleTagRemovedNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice || !notice.actors) {
    return null
  }

  const actor = notice.actors[0]

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap overflow-hidden">
        <NoticeHead notice={notice}>
          <NoticeActorName user={actor} />{' '}
          <Translate
            zh_hant="將你的作品從標籤中拿走了"
            zh_hans="将你的作品从标签中拿走了"
          />
        </NoticeHead>

        <NoticeArticle article={notice.target} isBlock />

        <NoticeTag tag={notice.tag} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleTagRemovedNotice.fragments = {
  notice: gql`
    fragment ArticleTagRemovedNotice on ArticleTagNotice {
      id
      ...NoticeHead
      actors {
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

export default ArticleTagRemovedNotice
