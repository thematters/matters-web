import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticleMentionedYouNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import styles from '../styles.css'

const ArticleMentionedYouNotice = ({
  notice,
}: {
  notice: ArticleMentionedYouNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]

  return (
    <section
      className="container"
      data-test-id={TEST_ID.NOTICE_ARTICLE_MENTIONED_YOU}
    >
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeActorName user={actor} />
          <FormattedMessage
            defaultMessage="mentioned you in an article"
            description="src/components/Notice/ArticleNotice/ArticleMentionedYouNotice.tsx"
          />
        </NoticeHead>

        <NoticeArticleCard article={notice.article} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticleMentionedYouNotice.fragments = {
  notice: gql`
    fragment ArticleMentionedYouNotice on ArticleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      article: target {
        ...NoticeArticleCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticleCard.fragments.article}
    ${NoticeDate.fragments.notice}
  `,
}

export default ArticleMentionedYouNotice
