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

import { ArticleTagHasBeenAddedNotice as NoticeType } from './__generated__/ArticleTagHasBeenAddedNotice'

const ArticleTagHasBeenAddedNotice = ({ notice }: { notice: NoticeType }) => {
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
          <NoticeActorName user={notice.actor} />{' '}
          {isAuthor && (
            <Translate
              zh_hant="發現你的作品，並把它加入標籤"
              zh_hans="发现你的作品，并把它加入标签"
            />
          )}
          {!isAuthor && isMaintainer && notice.target.author && (
            <>
              <Translate zh_hant="將" zh_hans="將" />{' '}
              <NoticeActorName user={notice?.target?.author} />{' '}
              <Translate zh_hant="的作品加入標籤" zh_hans="的作品加入标签" />
            </>
          )}
        </NoticeHead>

        <NoticeArticle article={notice.target} isBlock />

        <NoticeTag tag={notice.tag} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleTagHasBeenAddedNotice.fragments = {
  notice: gql`
    fragment ArticleTagHasBeenAddedNotice on ArticleTagHasBeenAddedNotice {
      id
      unread
      __typename
      ...NoticeHead
      actor {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        author {
          displayName
        }
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

export default ArticleTagHasBeenAddedNotice
