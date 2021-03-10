import gql from 'graphql-tag'
import _some from 'lodash/some'
import { useContext } from 'react'

import { Translate, ViewerContext } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTag from '../NoticeTag'
import styles from '../styles.css'

import { ArticleTagAddedNotice as NoticeType } from './__generated__/ArticleTagAddedNotice'

const ArticleTagAddedNotice = ({ notice }: { notice: NoticeType }) => {
  const viewer = useContext(ViewerContext)

  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]
  const isAuthor = notice.target.author?.id === viewer.id

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap overflow-hidden">
        <NoticeHead>
          <NoticeActorName user={actor} />
          {isAuthor ? (
            <Translate
              zh_hant=" 發現了你的作品 "
              zh_hans=" 发现了你的作品 "
              en=" discovered "
            />
          ) : (
            <Translate
              zh_hant=" 發現了作品 "
              zh_hans=" 发现了作品 "
              en=" discovered "
            />
          )}

          <NoticeArticleTitle article={notice.target} />

          <Translate
            zh_hant=" ，並把它加入標籤"
            zh_hans=" ，并把它加入标签"
            en=" and added it to tag"
          />
        </NoticeHead>

        <NoticeTag tag={notice.tag} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleTagAddedNotice.fragments = {
  notice: gql`
    fragment ArticleTagAddedNotice on ArticleTagNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        author {
          displayName
        }
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

export default ArticleTagAddedNotice
