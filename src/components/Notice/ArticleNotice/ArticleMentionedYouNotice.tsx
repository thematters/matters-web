import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { ArticleMentionedYouNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeArticleCard from '../NoticeArticleCard'
import NoticeArticleTitle from '../NoticeArticleTitle'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'

const ArticleMentionedYouNotice = ({
  notice,
}: {
  notice: ArticleMentionedYouNoticeFragment
}) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="mentioned you in {article}"
          id="8w3GEA"
          description="src/components/Notice/ArticleNotice/ArticleMentionedYouNotice.tsx"
          values={{
            article: <NoticeArticleTitle article={notice.article} />,
          }}
        />
      }
      testId={TEST_ID.NOTICE_ARTICLE_MENTIONED_YOU}
    />
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
