import gql from 'graphql-tag'
import _some from 'lodash/some'
import { useContext } from 'react'

import { TEST_ID } from '~/common/enums'
import { Translate, ViewerContext } from '~/components'
import { ArticleTagUnselectedNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTag from '../NoticeTag'
import styles from '../styles.module.css'

const ArticleTagUnselectedNotice = ({
  notice,
}: {
  notice: ArticleTagUnselectedNoticeFragment
}) => {
  const viewer = useContext(ViewerContext)

  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]

  const isAuthor = notice.target.author?.id === viewer.id

  return (
    <section
      className="container"
      data-test-id={TEST_ID.NOTICE_ARTICLE_TAG_UNSELECTED}
    >
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap overflow-hidden">
        <NoticeHead>
          {isAuthor && (
            <Translate zh_hant="啊喔， " zh_hans="啊喔， " en="uh-oh, " />
          )}

          <NoticeActorName user={actor} />

          {isAuthor ? (
            <Translate
              zh_hant=" 將你的作品 "
              zh_hans=" 将你的作品 "
              en=" removed "
            />
          ) : (
            <Translate
              zh_hant=" 將作品 "
              zh_hans=" 将作品 "
              en=" removed your article "
            />
          )}

          <NoticeArticleTitle article={notice.target} />

          <Translate
            zh_hant=" 從標籤精選中拿走了"
            zh_hans=" 從标签精选中拿走了"
            en=" from selected feed"
          />
        </NoticeHead>

        <NoticeTag tag={notice.tag} />

        <NoticeDate notice={notice} />
      </section>
    </section>
  )
}

ArticleTagUnselectedNotice.fragments = {
  notice: gql`
    fragment ArticleTagUnselectedNotice on ArticleTagNotice {
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

export default ArticleTagUnselectedNotice
