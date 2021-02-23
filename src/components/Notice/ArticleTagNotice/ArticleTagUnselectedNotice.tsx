import gql from 'graphql-tag'
import _some from 'lodash/some'
import { useContext } from 'react'

import { Translate, ViewerContext } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticle from '../NoticeArticle'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTag from '../NoticeTag'
import styles from '../styles.css'

import { ArticleTagUnselectedNotice as NoticeType } from './__generated__/ArticleTagUnselectedNotice'

const ArticleTagUnselectedNotice = ({ notice }: { notice: NoticeType }) => {
  const viewer = useContext(ViewerContext)

  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]

  const isOwner = notice.tag?.owner?.id === viewer.id
  const isEditor = _some(notice.tag?.editors || [], ['id', viewer.id])
  const isMaintainer = isOwner || isEditor
  const isAuthor = notice.target.author?.id === viewer.id

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap overflow-hidden">
        <NoticeHead>
          {isAuthor && (
            <Translate zh_hant="啊喔， " zh_hans="啊喔， " en="uh-oh, " />
          )}
          <NoticeActorName user={actor} />{' '}
          {isAuthor && (
            <Translate
              zh_hant="將你的作品從標籤精選中拿走了"
              zh_hans="将你的作品從标签精选中拿走了"
              en="removed your work from selected feed"
            />
          )}
          {!isAuthor && isMaintainer && (
            <Translate
              zh_hant="將作品從標籤精選中拿走了"
              zh_hans="将作品從标签精选中拿走了"
              en="removed work from selected feed"
            />
          )}
        </NoticeHead>

        <NoticeArticle article={notice.target} isBlock />

        <NoticeTag tag={notice.tag} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
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
    ${NoticeDate.fragments.notice}
    ${NoticeTag.fragments.tag}
  `,
}

export default ArticleTagUnselectedNotice
