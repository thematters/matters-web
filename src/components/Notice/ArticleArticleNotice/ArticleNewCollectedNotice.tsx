import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticleNewCollectedNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeContentActors from '../NoticeContentActors'
import NoticeDate from '../NoticeDate'
import NoticeMultiActors from '../NoticeMultiActors'
import noticeStyles from '../styles.css'
import styles from './styles.css'

const ArticleNewCollectedNotice = ({
  notice,
}: {
  notice: ArticleNewCollectedNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actors = notice.actors

  return (
    <section
      className="container"
      data-test-id={TEST_ID.NOTICE_ARTICLE_NEW_COLLECTED}
    >
      <section className="header">
        <NoticeMultiActors actors={actors} size="lg" />
        <section className="single-actor-info">
          <NoticeContentActors
            actors={actors}
            action={
              <FormattedMessage
                defaultMessage="connected"
                description="src/components/Notice/ArticleArticleNotice/ArticleNewCollectedNotice.tsx"
              />
            }
            content={<NoticeArticleTitle article={notice.article} />}
          />
        </section>
      </section>

      <section className="content">
        <NoticeArticleCard article={notice.collection} />
      </section>
      <section className="footer">
        <NoticeDate notice={notice} />
      </section>

      <style jsx>{noticeStyles}</style>
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
