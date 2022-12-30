import gql from 'graphql-tag'

import { TEST_ID } from '~/common/enums'
import { Translate } from '~/components'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import styles from '../styles.css'
import { ArticleNewCollectedNotice as NoticeType } from './__generated__/ArticleNewCollectedNotice'

const ArticleNewCollectedNotice = ({ notice }: { notice: NoticeType }) => {
  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]

  return (
    <section
      className="container"
      data-test-id={TEST_ID.NOTICE_ARTICLE_NEW_COLLECTED}
    >
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeActorName user={actor} />
          <Translate
            zh_hant=" 關聯了你的作品 "
            zh_hans=" 关联了你的作品 "
            en=" replied to "
          />
          <NoticeArticleTitle article={notice.article} />
        </NoticeHead>

        <NoticeArticleCard article={notice.collection} />

        <NoticeDate notice={notice} />
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
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      article: target {
        ...NoticeArticleTitle
      }
      collection: article {
        ...NoticeArticleCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticleTitle.fragments.article}
    ${NoticeArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default ArticleNewCollectedNotice
