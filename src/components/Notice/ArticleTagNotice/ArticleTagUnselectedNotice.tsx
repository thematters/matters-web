import gql from 'graphql-tag'
import _some from 'lodash/some'
import { useContext } from 'react'

import { Translate, ViewerContext } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticle from '../NoticeArticle'
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
        <NoticeHead notice={notice}>
          {isAuthor && (
            <>
              <Translate zh_hant="啊喔" zh_hans="啊喔" />
              {'， '}
            </>
          )}
          <NoticeActorName user={actor} />{' '}
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

ArticleTagUnselectedNotice.fragments = {
  notice: gql`
    fragment ArticleTagUnselectedNotice on ArticleTagNotice {
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

export default ArticleTagUnselectedNotice
