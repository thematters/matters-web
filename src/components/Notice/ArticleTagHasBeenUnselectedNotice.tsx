import gql from 'graphql-tag'
import _some from 'lodash/some'
import { useContext } from 'react'

import { Translate, ViewerContext } from '~/components'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeHead from './NoticeHead'
import NoticeTag from './NoticeTag'
import styles from './styles.css'

import { ArticleTagHasBeenUnselectedNotice as NoticeType } from './__generated__/ArticleTagHasBeenUnselectedNotice'

const ArticleTagHasBeenUnselectedNotice = ({
  notice,
}: {
  notice: NoticeType
}) => {
  const viewer = useContext(ViewerContext)
  if (!notice || !notice.actor || !notice.target) {
    return null
  }

  const isOwner = notice.tag?.owner?.id === viewer.id
  const isEditor = _some(notice.tag?.editors || [], ['id', viewer.id])
  const isMaintainer = isOwner || isEditor
  const isAuthor = notice.target.author?.id === viewer.id

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={notice.actor} />
      </section>

      <section className="content-wrap overflow-hidden">
        <NoticeHead notice={notice}>
          {isAuthor && (
            <>
              <Translate zh_hant="啊喔" zh_hans="啊喔" />
              {'， '}
            </>
          )}
          <NoticeActorName user={notice.actor} />{' '}
          {isAuthor && (
            <Translate
              zh_hant="將你的作品從標籤精選中拿走了"
              zh_hans="将你的作品從标签精选中拿走了"
            />
          )}
          {!isAuthor && isMaintainer && (
            <Translate
              zh_hant="將作品從標籤精選中拿走了"
              zh_hans="将作品從标签精选中拿走了"
            />
          )}
        </NoticeHead>

        <NoticeArticle article={notice.target} isBlock />

        <NoticeTag tag={notice.tag} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleTagHasBeenUnselectedNotice.fragments = {
  notice: gql`
    fragment ArticleTagHasBeenUnselectedNotice on ArticleTagHasBeenUnselectedNotice {
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
        editors {
          id
        }
        owner {
          id
        }
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

export default ArticleTagHasBeenUnselectedNotice
