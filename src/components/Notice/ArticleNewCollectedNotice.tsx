import { gql } from '@apollo/client'

import { Translate } from '~/components'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeCollectionArticle from './NoticeCollectionArticle'
import NoticeHead from './NoticeHead'
import styles from './styles.css'

import { ArticleNewCollectedNotice as NoticeType } from './__generated__/ArticleNewCollectedNotice'

const ArticleNewCollectedNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice || !notice.actor) {
    return null
  }

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={notice.actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead notice={notice}>
          <NoticeActorName user={notice.actor} />{' '}
          <Translate zh_hant="關聯了你的作品" zh_hans="关联了你的作品" />
        </NoticeHead>

        <NoticeArticle article={notice.target} isBlock />

        <NoticeCollectionArticle article={notice.collection} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleNewCollectedNotice.fragments = {
  notice: gql`
    fragment ArticleNewCollectedNotice on ArticleNewCollectedNotice {
      id
      unread
      __typename
      ...NoticeHead
      actor {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      collection {
        ...NoticeCollectionArticle
      }
      target {
        ...NoticeArticle
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
    ${NoticeCollectionArticle.fragments.article}
    ${NoticeHead.fragments.date}
  `,
}

export default ArticleNewCollectedNotice
