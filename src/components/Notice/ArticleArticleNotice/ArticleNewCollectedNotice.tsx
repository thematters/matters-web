import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticleNewCollectedNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'

const ArticleNewCollectedNotice = ({
  notice,
}: {
  notice: ArticleNewCollectedNoticeFragment
}) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="connected"
          id="YlPCRU"
          description="src/components/Notice/ArticleArticleNotice/ArticleNewCollectedNotice.tsx"
        />
      }
      title={<NoticeArticleTitle article={notice.article} />}
      content={<NoticeArticleCard article={notice.collection} />}
      testId={TEST_ID.NOTICE_ARTICLE_NEW_COLLECTED}
    />
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
