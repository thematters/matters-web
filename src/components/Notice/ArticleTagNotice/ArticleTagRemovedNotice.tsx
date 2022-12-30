import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { Translate } from '~/components'
import { ArticleTagRemovedNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTag from '../NoticeTag'
import styles from '../styles.css'

const ArticleTagRemovedNotice = ({
  notice,
}: {
  notice: ArticleTagRemovedNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]

  return (
    <section className="container" data-test-id={TEST_ID.ARTICLE_TAG_REMOVED}>
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap overflow-hidden">
        <NoticeHead>
          <NoticeActorName user={actor} />
          <Translate
            zh_hant=" 將你的作品 "
            zh_hans=" 将你的作品 "
            en=" removed your article "
          />

          <NoticeArticleTitle article={notice.target} />

          <Translate
            zh_hant=" 從標籤中拿走了"
            zh_hans=" 从标签中拿走了"
            en=" from tag"
          />
        </NoticeHead>

        <NoticeTag tag={notice.tag} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleTagRemovedNotice.fragments = {
  notice: gql`
    fragment ArticleTagRemovedNotice on ArticleTagNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        ...NoticeArticleTitle
      }
      tag {
        ...NoticeTag
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeDate.fragments.notice}
    ${NoticeTag.fragments.tag}
  `,
}

export default ArticleTagRemovedNotice
