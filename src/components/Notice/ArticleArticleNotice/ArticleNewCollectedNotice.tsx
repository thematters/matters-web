import gql from 'graphql-tag'

import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticle from '../NoticeArticle'
import NoticeCollectionArticle from '../NoticeCollectionArticle'
import NoticeHead from '../NoticeHead'
import styles from '../styles.css'

import { ArticleNewCollectedNotice as NoticeType } from './__generated__/ArticleNewCollectedNotice'

const ArticleNewCollectedNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]

  return (
    <section className="container">
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead notice={notice}>
          <NoticeActorName user={actor} />{' '}
          <Translate
            zh_hant="關聯了你的作品"
            zh_hans="关联了你的作品"
            en="replied to your work"
          />
        </NoticeHead>

        <NoticeArticle article={notice.article} isBlock />

        <NoticeCollectionArticle article={notice.collection} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleNewCollectedNotice.fragments = {
  notice: gql`
    fragment ArticleNewCollectedNotice on ArticleArticleNotice {
      id
      unread
      __typename
      ...NoticeHead
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      article: target {
        ...NoticeArticle
      }
      collection: article {
        ...NoticeCollectionArticle
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
